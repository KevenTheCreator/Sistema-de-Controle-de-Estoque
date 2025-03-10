import React from 'react';
import { FaEnvelope, FaLock} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './login.css';

const Login = () => {
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
      <form>
        <h1>Portal Admin</h1>
        <div className="input-field">
          <input type="email" placeholder="E-mail" required />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-field">
          <input type="password" placeholder="Senha" required />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
        <Link to= "/esqueceuSenha">Esqueceu a senha?</Link>
        </div>
        <button>Entrar</button>
      </form>
    </div>
  )
}

export default Login
