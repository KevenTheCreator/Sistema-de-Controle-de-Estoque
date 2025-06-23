import React, { useState } from "react";
import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import "./esqueceuSenha.css";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", {
        email: email,
      });
      setMessage(response.data);
    } catch {
      setMessage("Erro ao enviar o link de redefinição de senha. Tente novamente.");
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

    const containerForgetPassword = document.querySelector(".container-forget-password");
    if (containerForgetPassword) {
      observer.observe(containerForgetPassword);
    }

    return () => {
      if (containerForgetPassword) {
        observer.unobserve(containerForgetPassword);
      }
    };
  }, []);

  return (
    <div className="container-forget-password">
      <form onSubmit={handleSubmit}>
       <h1>Encontre sua conta</h1>
        <p>Informe o e-mail associado à sua conta para alterar a sua senha.</p>
        <div className="input-field">
          <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <FaEnvelope className="icon" />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EsqueceuSenha;
