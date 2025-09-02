import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Logins
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BubbleBackgroundDemo } from "../components/bubble-background";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientText } from "../components/animate-ui/text/gradient";
import NissanSkylineWallpaper from "../../public/NissanSkylineWallpaper.jpeg"; // Importação da imagem

function Login({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Captura o token JWT da URL após o redirecionamento do backend
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const loginError = urlParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redireciona para a página principal ou dashboard
      window.history.replaceState({}, document.title, window.location.pathname); // Limpa o token da URL
    } else if (loginError) {
      setError(`Login failed: ${loginError.replace(/_/g, " ")}.`);
      window.history.replaceState({}, document.title, window.location.pathname); // Limpa o erro da URL
    }
  }, [navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Auth/google-login",
        {
          token: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  // Funções para iniciar o fluxo Passport.js - Apenas redirecionam para o backend
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/auth/facebook";
  };

  const handleAppleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/auth/apple";
  };

  const handleTwitterLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/auth/twitter";
  };

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/auth/github";
  };

  const handleLinkednInLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/auth/linkedin";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {" "}
      {/* Usar VITE_ aqui */}
      <div className="relative min-h-screen">
        <BubbleBackgroundDemo />
        <div
          className={cn(
            "flex min-h-screen flex-col items-center justify-center p-6 md:p-10",
            className
          )}
          style={{ pointerEvents: "none" }}
          {...props}>
          <div
            className="w-full max-w-sm md:max-w-3xl z-50 p-10"
            style={{ pointerEvents: "auto" }}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <Card className="overflow-hidden z-50">
              <CardContent className="grid p-0 md:grid-cols-2">
                <form
                  className="p-8 sm:p-10 md:p-12 lg:p-16"
                  onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <GradientText
                        className="text-balance text-2xl font-bold mb-2"
                        text="Bem vindo de volta!"
                      />
                      <p className="text-balance text-muted-foreground">
                        Logar com sua conta!
                      </p>
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
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline">
                          Esqueceu sua senha?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {/* logins */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleAppleLogin}>
                        {/* Ícone da Apple */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor">
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Login with Apple</span>
                      </Button>
                      {/* google login */}
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("google login failed")}
                        render={(renderProps) => (
                          <Button
                            variant="outline"
                            className="w-20 h-5 p-2 flex items-center justify-center rounded-2xl "
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <svg
                              width="20"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                              <path d="M1 1h22v22H1V1z" fill="none" />
                            </svg>

                            <span className="sr-only">Login with Google</span>
                          </Button>
                        )}
                      />
                      {/* facebook login */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleFacebookLogin}>
                        {/* Ícone do Facebook */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                            fill="#0F0F0F"
                          />
                        </svg>
                        <span className="sr-only">Login with Meta</span>
                      </Button>
                      {/* twitter login */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleTwitterLogin}>
                        {/* Ícone do X (Twitter) */}
                        <svg
                          fill="#000000"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="800px"
                          height="800px"
                          viewBox="-51.2 -51.2 614.40 614.40"
                          stroke="#000000"
                          stroke-width="0.00512"
                          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                          <g id="SVGRepo_bgCarrier" stroke-width="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="7935ec95c421cee6d86eb22ecd12f847">
                              {" "}
                              <path
                                style="display: inline;"
                                d="M459.186,151.787c0.203,4.501,0.305,9.023,0.305,13.565 c0,138.542-105.461,298.285-298.274,298.285c-59.209,0-114.322-17.357-160.716-47.104c8.212,0.973,16.546,1.47,25.012,1.47 c49.121,0,94.318-16.759,130.209-44.884c-45.887-0.841-84.596-31.154-97.938-72.804c6.408,1.227,12.968,1.886,19.73,1.886 c9.55,0,18.816-1.287,27.617-3.68c-47.955-9.633-84.1-52.001-84.1-102.795c0-0.446,0-0.882,0.011-1.318 c14.133,7.847,30.294,12.562,47.488,13.109c-28.134-18.796-46.637-50.885-46.637-87.262c0-19.212,5.16-37.218,14.193-52.7 c51.707,63.426,128.941,105.156,216.072,109.536c-1.784-7.675-2.718-15.674-2.718-23.896c0-57.891,46.941-104.832,104.832-104.832 c30.173,0,57.404,12.734,76.525,33.102c23.887-4.694,46.313-13.423,66.569-25.438c-7.827,24.485-24.434,45.025-46.089,58.002 c21.209-2.535,41.426-8.171,60.222-16.505C497.448,118.542,479.666,137.004,459.186,151.787z">
                                {" "}
                              </path>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                        <span className="sr-only">Login with X</span>
                      </Button>
                      {/* github login */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGitHubLogin}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .26.18.57.69.49C19.13 20.14 22 16.41 22 12c0-5.52-4.48-10-10-10z" />
                        </svg>
                        <span className="sr-only">Login with GitHub</span>
                      </Button>
                      {/* linkedin login */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLinkednInLogin}>
                        {/* Ícone do LinkedIn */}
                        <svg
                          xmlns="http://www.w3.org/2000/
                        svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor">
                          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.02h3.42v1.56h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.46c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm1.78 13H3.56V9.02h3.56v11.43zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                        </svg>
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Não tem uma conta?{" "}
                      <a
                        href="/register"
                        className="underline underline-offset-4">
                        Sign up
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
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
