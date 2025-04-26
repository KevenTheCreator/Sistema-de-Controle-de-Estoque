import React from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

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
              <HomeIcon sx={{ fontSize: 30, color: "black", position: "absolute", right: 58, bottom: -1 }} />
              <Link to="/tela-inicial">Inicio</Link>
            </li>
            <li>
              <Inventory2Icon sx={{ fontSize: 25, color: "black", position: "absolute", right: 99, bottom: -1 }} />
              <Link to="/tela-produtos">Produtos</Link>
            </li>
            <li>
              <Diversity3Icon sx={{ fontSize: 30, color: "black", position: "absolute", right: 127, bottom: -1 }} />
              <Link to="/tela-solicitantes">Solicitantes</Link>
            </li>
            <li>
              <LocalShippingIcon sx={{ fontSize: 30, color: "black", position: "absolute", right: 97, bottom: -1 }} />
              <Link to="/tela-entradas">Entradas</Link>
            </li>
            <li>
              <ShoppingCartIcon sx={{ fontSize: 30, color: "black", position: "absolute", right: 70, bottom: -1 }} />
              <Link to="/tela-saidas">Saídas</Link>
            </li>
            <li>
              <InsertDriveFileIcon sx={{ fontSize: 30, color: "black", position: "absolute", right: 107, bottom: -1 }} />
              <Link to="/tela-relatorios">Relatórios</Link>
            </li>
          </ul>
        </nav>
        <AccountCircleIcon
          onClick={handleClick}
          sx={{
            fontSize: 48,
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
