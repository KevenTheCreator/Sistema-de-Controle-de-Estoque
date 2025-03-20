import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      console.log("Resposta da API: ", response);

      if (response.data && response.data.token && response.data.refreshToken) {
        const { token, refreshToken } = response.data;

        console.log("token: ", token);
        console.log("refreshToken: ", refreshToken);

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/tela-inicial"); 

      } else {
        setErrorMessage("Falha ao autenticar. Resposta inesperada.");
      }
      
    } catch (error) {
      console.log(error);
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
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
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
