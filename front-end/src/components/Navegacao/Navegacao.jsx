import React from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import WidgetsIcon from '@mui/icons-material/Widgets';
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
        <div className="container-icon">
        <Badge badgeContent={100} color="error">
        <NotificationsIcon sx={{cursor: 'pointer',
        fontSize: 30, transition: "transform 0.5s ease-in-out",
        "&:hover": { transform: "scale(1.1)" } }}></NotificationsIcon>
        </Badge>
        <AccountCircleIcon
          onClick={handleClick}
          sx={{
            fontSize: 41,
            color: "black",
            marginLeft: 0,
            cursor: "pointer",
            transition: "transform 0.5s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
        </div>
        <nav className="navbar">
          <ul className="navlist">
            <li>
              <Link to="/tela-inicial">
                <HomeIcon className="iconNav" sx={{ fontSize: 30, color: "black", position: "relative", top: 6}} />
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/tela-produtos">
                <WidgetsIcon className="iconNav" sx={{ fontSize: 30, color: "black", position: "relative", top: 6, right: 3}} />
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/tela-solicitantes">
                <Diversity3Icon className="iconNav" sx={{ fontSize: 30, color: "black", position: "relative", top: 6, right: 5}} />
                Solicitantes
              </Link>
            </li>
            <li>
              <Link to="/tela-entradas">
                <LocalShippingIcon className="iconNav" sx={{fontSize: 30, color: "black", position: "relative", top: 6, right: 5}} />
                Entradas
              </Link>
            </li>
            <li>
              <Link to="/tela-saidas">
                <ShoppingCartIcon className="iconNav" sx={{fontSize: 30, color: "black", position: "relative", top: 6}} />
                Saídas
              </Link>
            </li>
            <li>
              <Link to="/tela-relatorios">
                <InsertDriveFileIcon className="iconNav" sx={{fontSize: 30, color: "black", position: "relative", top: 6}} />
                Relatórios
              </Link>
            </li>
          </ul>
        </nav>
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
