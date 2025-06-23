import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token && response.data.refreshToken) {
        const { token, refreshToken } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/tela-inicial");

      } else {
        setErrorMessage("Falha ao autenticar. Resposta inesperada.");
      }

    } catch {
      setErrorMessage("Falha ao autenticar. Verifique suas credenciais.");
    } 
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = document.querySelector(".container");
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Portal Admin</h1>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash
              id="eye"
              className="icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEye
              id="eye"
              className="icon"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <div className="recall-forget">
          <Link to="/esqueceuSenha">Esqueceu a senha?</Link>
        </div>

        <button type="submit">Entrar</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
