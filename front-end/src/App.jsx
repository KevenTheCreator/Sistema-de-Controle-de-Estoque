import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import EsqueceuSenha from './components/EsqueceuSenha/esqueceuSenha';
import TelaInicial from './components/Tela-inicial/tela-inicial';
import Telaprodutos from './components/Tela-produtos/tela-produtos';
import AuthLayout from './components/AuthLayout/AuthLayout';
import MainLayout from './components/MainLayout/MainLayout';
import RedefinirSenha from './components/redefinirSenha/redefinirSenha';
import Telasolicitantes from './components/Tela-solicitantes/tela-solicitantes';
import TelaSaidas from './components/Tela-saidas/tela-saidas';
import TelaEntrada from './components/Tela-entradas/tela-entradas';
import TelaRelatorios from './components/Tela-relatorios/tela-relatorios';

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
          <Route path="/tela-saidas" element={<TelaSaidas />} />
          <Route path="/tela-entradas" element={<TelaEntrada />} />
          <Route path="/tela-solicitantes" element={<Telasolicitantes />} />
           <Route path="/tela-relatorios" element={<TelaRelatorios />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
