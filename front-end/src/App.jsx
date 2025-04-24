import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import EsqueceuSenha from './components/EsqueceuSenha/esqueceuSenha';
import TelaInicial from './components/Tela-inicial/tela-inicial';
import Telaprodutos from './components/Tela-produtos/tela-produtos';
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
          <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/tela-produtos" element={<Telaprodutos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
