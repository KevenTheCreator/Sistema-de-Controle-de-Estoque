import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import EsqueceuSenha from './components/EsqueceuSenha/esqueceuSenha';
import Telainicial from './components/Tela-Inicial/tela-inicial';
import AuthLayout from './components/AuthLayout/AuthLayout';
import MainLayout from './components/MainLayout/MainLayout';
import RedefinirSenha from './components/redefinirSenha/redefinirSenha';

function App() {
  return (    
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
          <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/tela-inicial" element={<Telainicial />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
