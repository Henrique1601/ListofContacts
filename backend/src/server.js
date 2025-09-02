const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session'); // Novo middleware

// const User = require('../routes/User');
const Auth = require('../routes/Auth');
const Contacts = require('../routes/Contacts');
// const ContactsList = require('../routes/CreateSchemaContacts');
// const User_contacts = require('../routes/User');
dotenv.config();
const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Configuração do express-session
app.use(session({
  secret: process.env.JWT_SECRET || ' my-secure-secret-key-2025', // Use uma chave secreta segura
  resave: false, // Não salva a sessão se não foi modificada
  saveUninitialized: false, // Não cria sessão até que algo seja armazenado
  cookie: { secure: false } // Defina como true em produção com HTTPS
}));
console.log('Sessão configurada');
app.use(passport.initialize());
console.log('Passport inicializado');
app.use(passport.session()); // Necessário para suportar sessões com Passport
console.log('Passport sessão configurada');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api/auth', (req, res, next) => {
  console.log('Requisição recebida em /api/auth:', req.path);
  next();
}, Auth);
app.use('/api/contacts', Contacts);

app.get('/', (req, res) => {
  res.send('Teste de rota');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});