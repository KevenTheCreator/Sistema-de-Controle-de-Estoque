import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate  } from 'react-router-dom';
import "./redefinirSenha.css"
import { FaLock } from 'react-icons/fa'

const RedefinirSenha = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Location Search: ", location.search);

  const queryParams = new URLSearchParams(location.search);
  const token  = queryParams.get("token");

  console.log(token);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        token: token,
        newPassword: newPassword,
      });
      setMessage(response.data);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Erro ao redefinir a senha. O token pode estar expirado ou inválido.');
    }
  };

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
        <form onSubmit={handleResetPassword}>
          <h1>Redefinir Senha</h1>
         <div className="input-field">
            <input type="password" name="newPassword" id="newPassword" required placeholder='Nova Senha' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <FaLock className='icon'/>
         </div>
         <div className="input-field">
            <input type="password" name="confirmPassword" id="confirmPassword" required placeholder='Confirme a Nova Senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <FaLock className='icon'/>
        </div>           
            <button type='submit'>Redefinir</button>
            {message && <p>{message}</p>}       
        </form>
    </div>
  )
}

export default RedefinirSenha