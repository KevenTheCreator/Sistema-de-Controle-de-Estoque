import React from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from '@mui/icons-material/Inventory';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "./Navegacao.css";

const Navegacao = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/"); 
  };

  return (
    <div className="Home">
      <header className="header">
        <div className="div-logo">
          <img className="logo-header" src="/logo-principal.png" alt="" />
        </div>
        <nav className="navbar">
          <ul className="navlist">
            <li>
              <Link to="/tela-inicial">
                <HomeIcon sx={{ fontSize: 30, color: "black"}} />
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/tela-produtos">
                <InventoryIcon sx={{ fontSize: 30, color: "black"}} />
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/tela-solicitantes">
                <Diversity3Icon sx={{ fontSize: 30, color: "black"}} />
                Solicitantes
              </Link>
            </li>
            <li>
              <Link to="/tela-entradas">
                <LocalShippingIcon sx={{ fontSize: 30, color: "black"}} />
                Entradas
              </Link>
            </li>
            <li>
              <Link to="/tela-saidas">
                <ShoppingCartIcon sx={{ fontSize: 30, color: "black"}} />
                Saídas
              </Link>
            </li>
            <li>
              <Link to="/tela-relatorios">
                <InsertDriveFileIcon sx={{ fontSize: 30, color: "black"}} />
                Relatórios
              </Link>
            </li>
          </ul>
        </nav>
        <AccountCircleIcon
          onClick={handleClick}
          sx={{
            fontSize: 41,
            color: "black",
            marginLeft: 70,
            cursor: "pointer",
            transition: "transform 0.5s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }} 
          sx={{
            position: "absolute",
            left: -10,
            "& .MuiPaper-root": {
              MinWidth: 50,
            },
          }}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Conta</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem> 
        </Menu>
      </header>
    </div>
  );
};

export default Navegacao;
