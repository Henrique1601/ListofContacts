const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('./User'); // Seu modelo de usuário
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();


// --- Passport.js Imports ---
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy; 
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


// Inicializar Passport
router.use(passport.initialize());

// --- Configuração das Estratégias Passport ---

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/auth/facebook/callback", // A URL de callback do seu backend
    profileFields: ['id', 'displayName', 'emails']
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            // Se o usuário não existe com o facebookId, tenta encontrar pelo email
            if (profile.emails && profile.emails[0]) {
                user = await User.findOne({ email: profile.emails[0].value });
            }
            if (!user) { // Se ainda não encontrou, cria um novo usuário
                user = new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    password: '' // Não é necessário senha para social logins
                });
                await user.save();
            } else if (!user.facebookId) { // Se encontrou por email mas sem facebookId, vincular
                user.facebookId = profile.id;
                if (!user.username) user.username = profile.displayName;
                await user.save();
            }
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Apple Strategy (mais complexa, requer caminho para a chave privada)
passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Importante para as quebras de linha
    callbackURL: "http://localhost:3000/api/auth/auth/apple/callback", // A URL de callback do seu backend
    passReqToCallback: true, // Necessário para pegar o user data do corpo da requisição
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        // A Apple pode enviar o nome e email na primeira vez, no corpo da requisição (req.body.user)
        const userData = req.body.user ? JSON.parse(req.body.user) : null;
        let email = profile.email || (userData && userData.email ? userData.email : null);
        let name = profile.name || (userData && userData.name ? `${userData.name.firstName} ${userData.name.lastName}` : null);

        let user = await User.findOne({ appleId: profile.id });
        if (!user) {
            if (email) {
                user = await User.findOne({ email });
            }
            if (!user) {
                user = new User({
                    appleId: profile.id,
                    username: name || email,
                    email: email,
                    password: ''
                });
                await user.save();
            } else if (!user.appleId) {
                user.appleId = profile.id;
                if (!user.username && name) user.username = name;
                if (!user.email && email) user.email = email;
                await user.save();
            }
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// X (Twitter) Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.X_CONSUMER_ID,
    consumerSecret: process.env.X_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/api/auth/auth/twitter/callback", // A URL de callback do seu backend
    includeEmail: true // Tentar obter o email (requer permissão no X Developer Portal)
},
async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ twitterId: profile.id });
        if (!user) {
            if (profile.emails && profile.emails[0]) {
                user = await User.findOne({ email: profile.emails[0].value });
            }
            if (!user) {
                user = new User({
                    twitterId: profile.id,
                    username: profile.displayName || profile.username,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    password: ''
                });
                await user.save();
            } else if (!user.twitterId) {
                user.twitterId = profile.id;
                if (!user.username) user.username = profile.displayName || profile.username;
                if (!user.email && profile.emails && profile.emails[0]) user.email = profile.emails[0].value;
                await user.save();
            }
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/auth/github/callback", //
    scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
    console.log('Estratégia GitHub chamada', { profile });
    try {
        let user = await User.findOne({ githubId: profile.id });
        console.log('Usuário encontrado ou não:', user);
        if (!user) {
            if (profile.emails && profile.emails[0]) {
                user = await User.findOne({ email: profile.emails[0].value });
            }
            if (!user) {
                user = new User({
                    githubId: profile.id,
                    username: profile.displayName || profile.username,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    password: ''
                });
                await user.save();
                console.log('Novo usuário criado:', user);
            } else if (!user.githubId) {
                user.githubId = profile.id;
                if (!user.username) user.username = profile.displayName || profile.username;
                if (!user.email && profile.emails && profile.emails[0]) user.email = profile.emails[0].value;
                await user.save();
                console.log('Usuário atualizado:', user);
            }
        }
        done(null, user);
    } catch (err) {
        console.error('Erro na estratégia GitHub:', err);
        done(err, false);
    }
}));

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/auth/linkedin/callback",
    scope: [ 'r_liteprofile']
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ linkedinId: profile.id });
        if (!user) {
            if (profile.emails && profile.emails[0]) {
                user = await User.findOne({ email: profile.emails[0].value });
            }
            if (!user) {
                user = new User({
                    linkedinId: profile.id,
                    username: profile.displayName || profile.username,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    password: ''
                });
                await user.save();
            } else if (!user.linkedinId) {
                user.linkedinId = profile.id;
                if (!user.username) user.username = profile.displayName || profile.username;
                if (!user.email && profile.emails && profile.emails[0]) user.email = profile.emails[0].value;
                await user.save();
            }
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Serializar e desserializar usuário
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


// --- Rotas de Autenticação (Passport.js) ---

// Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:5173/login?error=facebook_failed' }),
    (req, res) => {
        const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Redireciona para o frontend com o token JWT
        res.redirect(`http://localhost:5173/?token=${jwtToken}`);
    }
);

// Apple
router.get('/auth/apple', passport.authenticate('apple'));
router.post('/auth/apple/callback', // Apple usa POST para o callback
    passport.authenticate('apple', { failureRedirect: 'http://localhost:5173/login?error=apple_failed' }),
    (req, res) => {
        const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/?token=${jwtToken}`);
    }
);

// X (Twitter)
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: 'http://localhost:5173/login?error=twitter_failed' }),
    (req, res) => {
        const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/?token=${jwtToken}`);
    }
);

// GitHub
router.get('/auth/github', (req, res, next) => {
    console.log('Requisição recebida em /auth/github');
    next();
}, passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    (req, res, next) => {
        console.log('Requisição recebida em /auth/github/callback');
        next();
    },
    passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login?error=github_failed' }),
    (req, res) => {
        console.log('Callback GitHub processada para usuário:', req.user);
        const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/?token=${jwtToken}`);
    }
);

// LinkedIn
router.get('/auth/linkedin',(req,res,next) => {
    console.log('Requisição recebida em /auth/linkedin');
    next();
}, passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
router.get('/auth/linkedin/callback',
    (req, res, next) => {
        console.log('Requisição recebida em /auth/linkedin/callback');
        next();
    },
    passport.authenticate('linkedin', { failureRedirect: 'http://localhost:5173/login?error=linkedin_failed' }),
    (req, res) => {
        console.log('Callback LinkedIn processada para usuário:', req.user);
        const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/?token=${jwtToken}`);
    }
);


// --- Suas rotas existentes (Registro, Login, Google, Facebook POST) ---
// Criar usuario
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    user = new User({ username, email, password })
    const hashedPassword = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, hashedPassword)
    await user.save()

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ message: 'User registered successfully', token })
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Error registering user' })
  }
})

// Logar usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    console.log('Encontrado usuário:', user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ message: 'User logged in successfully', token })
  } catch {
    res.status(500).json({ message: 'Error logging in user' })
  }
})

// Logar com o Google (mantido como POST, pois o Google Auth Library é um pouco diferente)
router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleId, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username: name, email, googleId, password: '' });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Google login successful', token: jwtToken });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({ message: 'Invalid Google token' });
  }
});

// Logar com o Facebook (mantido como POST, se preferir enviar o access token diretamente)
// Se você quiser usar o Passport para Facebook, pode remover esta rota POST e usar as rotas Passport GET acima.
/* router.post('/facebook-login', async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );
    const { email, id: facebookId, name } = response.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username: name, email, facebookId, password: '' });
      await user.save();
    } else if (!user.facebookId) {
      user.facebookId = facebookId;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Facebook login successful', token: jwtToken });
  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(400).json({ message: 'Invalid Facebook token' });
  }
}); */

module.exports = router;