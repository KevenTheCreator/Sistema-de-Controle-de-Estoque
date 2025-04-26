import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom';

const Navegacao = () => {
  return (
    <div className="Home">
    {/* Header */}
    <header className="header">
      <div className="div-logo">
        <img className="logo-header" src="/logo-principal.png" alt="" />
      </div>
      <nav className="navbar">
        <ul className="navlist">
          <li>
          <HomeIcon sx={{ fontSize: 30, color: 'black', position: "absolute", right: 58, bottom: -1}} />
            <Link to="/tela-inicial">Inicio</Link>
          </li>
          <li>
          <Inventory2Icon sx={{ fontSize: 25, color: 'black', position: "absolute", right: 99, bottom: -1}} />
            <Link to="/tela-produtos">Produtos</Link>
          </li>
          <li>
          <Diversity3Icon sx={{ fontSize: 30, color: 'black', position: "absolute", right: 127, bottom: -1}} />
            <Link to="/tela-solicitantes">Solicitantes</Link>
          </li>
          <li>
          <LocalShippingIcon sx={{ fontSize: 30, color: 'black', position: "absolute", right: 97, bottom: -1}} />
            <Link to="/tela-entradas">Entradas</Link>
          </li>
          <li>
          <ShoppingCartIcon sx={{ fontSize: 30, color: 'black', position: "absolute", right: 70, bottom: -1}} />
            <Link to="/tela-saidas">Saídas</Link>
          </li>
          <li>
          <InsertDriveFileIcon sx={{ fontSize: 30, color: 'black', position: "absolute", right: 107, bottom: -1}} />
            <Link to="/tela-relatorios">Relatórios</Link>
          </li>
        </ul>
      </nav>
      <AccountCircleIcon sx={{ fontSize: 48, color: 'black', marginLeft: 70, cursor: 'pointer', transition: 'transform 0.2s ease-in-out', '&:hover': {transform: 'scale(1.1)'}}}/>
    </header>
    </div>
  );  
};

export default Navegacao;
