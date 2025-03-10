import React from "react";
import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./esqueceuSenha.css";

const EsqueceuSenha = () => {
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
      <form>
        <h1>Encontre sua conta</h1>
        <p>Informe o e-mail associado à sua conta para alterar a sua senha.</p>
        <div className="input-field">
          <input type="email" placeholder="E-mail" required />
          <FaEnvelope className="icon" />
        </div>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default EsqueceuSenha;
