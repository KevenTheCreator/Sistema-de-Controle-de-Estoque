import React, { useEffect } from 'react'
import "./redefinirSenha.css"
import { FaLock } from 'react-icons/fa'

const RedefinirSenha = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
    },
    { threshold: 0.1 }
  );

  const containerRedefinicao = document.querySelector(".container-redefinicao");
  if (containerRedefinicao) {
    observer.observe(containerRedefinicao);
  }

  return () => {
    if (containerRedefinicao) {
      observer.unobserve(containerRedefinicao);
    }
  };
  }, []);

  return (
    <div className='container-redefinicao'>
        <form>
          <h1>Redefinir Senha</h1>
         <div className="input-field">
            <input type="password" name="newPassword" id="newPassword" required placeholder='Nova Senha'/>
            <FaLock className='icon'/>
         </div>
         <div className="input-field">
            <input type="password" name="confirmPassword" id="confirmPassword" required placeholder='Confirme a Nova Senha'/>
            <FaLock className='icon'/>
        </div>           
            <button>Redefinir</button>       
        </form>
    </div>
  )
}

export default RedefinirSenha