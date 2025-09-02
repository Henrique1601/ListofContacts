import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { BubbleBackgroundDemo } from "../components/bubble-background";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientText } from "../components/animate-ui/text/gradient";
import NissanSkylineWallpaper from "../../public/NissanSkylineWallpaper.jpeg";

function Register({ className, ...props }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Captura o token JWT da URL após o redirecionamento do backend
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const registerError = urlParams.get('error');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (registerError) {
      setError(`Registration failed: ${registerError.replace(/_/g, ' ')}.`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/Auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong registering user.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:3000/api/Auth/google-login", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google registration failed");
    }
  };

  // Funções para iniciar o fluxo Passport.js - Apenas redirecionam para o backend
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/auth/facebook';
  };

  const handleAppleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/auth/apple';
  };

  const handleTwitterLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/auth/twitter';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/auth/github';
  };

  const handleLinkednInLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/auth/linkedin';
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Usar VITE_ aqui */}
      <div className="relative min-h-screen">
        <BubbleBackgroundDemo />
        <div
          className={cn("flex min-h-screen flex-col items-center justify-center p-6 md:p-10", className)}
          style={{ pointerEvents: "none" }}
          {...props}
        >
          <div className="w-full max-w-sm md:max-w-3xl z-50 p-10" style={{ pointerEvents: "auto" }}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <Card className="overflow-hidden z-50">
              <CardContent className="grid p-0 md:grid-cols-2">
                <form className="p-8 sm:p-10 md:p-12 lg:p-16" onSubmit={handleRegister}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <GradientText
                        className="text-balance text-2xl font-bold mb-2"
                        text="Crie sua conta!"
                      />
                      <p className="text-balance text-muted-foreground">
                        Registre-se para começar!
                      </p>
                    </div>
                    {/* Formulário de registro  */}
                    <div className="grid gap-2">
                      <Label htmlFor="user">Username</Label>
                      <Input
                        id="user"
                        type="text"
                        placeholder="Seu nome de usuário"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Registrar
                    </Button>
                    {/* Divida */}
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                    {/* Botões de login */}
                    <div className="grid grid-cols-3 gap-4">
                      <button variant="outline"  className="w-full">
                        <GoogleLogin 
                          onSuccess={handleGoogleSuccess}
                          onError={() => setError("Google registration failed")}
                        />
                        <span className="sr-only">Registrar com o Google</span>
                      </button>
                      <Button variant="outline" className="w-full" onClick={handleAppleLogin}>
                        {/* Ícone da Apple */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24" height="24" fill="currentColor"
                        >
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Registrar com Apple</span>
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleFacebookLogin}>
                        {/* Ícone do Facebook */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24" height="24" fill="currentColor"
                        >
                          <path d="M12 2.046c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm2.25 7.75h-1.5v-1c0-.55.45-1 1-1h.5v-2h-1c-1.66 0-3 1.34-3 3v1.5h-2v2.5h2v6h3v-6h2.5l.5-2.5h-3v-1.25z" />
                        </svg>
                        <span className="sr-only">Registrar com Meta</span>
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleTwitterLogin}>
                        {/* Ícone do X (Twitter) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24" height="24" fill="currentColor"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.761 11.392h-2.586l-6.232-8.11-8.28 8.11h-3.308l7.558-8.629-9.153-11.393h2.586l5.795 7.492 7.021-7.492zm-2.228 17.618h2.094l-7.02-8.354-2.228 8.354zm-1.89-13.435l-7.021-7.492-2.094 8.354 7.021 7.492z" />
                        </svg>
                        <span className="sr-only">Registrar com X</span>
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleLinkednInLogin}>
                        {/* Ícone do LinkedIn */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24" height="24" fill="currentColor">
                            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.02h3.42v1.56h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.46c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm1.78 13H3.56V9.02h3.56v11.43zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                        </svg>
                        <span className="sr-only">Registrar com LinkedIn</span>
                      </Button> 
                      <Button variant="outline" className="w-full" onClick={handleGitHubLogin}>
                       {/* Ícone do GitHub */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          width="24" height="24" fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .26.18.57.69.49C19.13 20.14 22 16.41 22 12c0-5.52-4.48-10-10-10z" />
                        </svg>
                        <span className="sr-only">Registrar com GitHub</span>
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Já tem uma conta?{" "}
                      <a href="/login" className="underline underline-offset-4">
                        Login
                      </a>
                    </div>
                  </div>
                </form>
                <div className="relative hidden bg-muted md:block z-50">
                  <img
                    src={NissanSkylineWallpaper}
                    alt="Image"
                    className="z-50 absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              Ao continuar, você concorda com nossos{" "}
              <a href="#">Termos de Serviço</a> e{" "}
              <a href="#">Política de Privacidade</a>.
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Register;