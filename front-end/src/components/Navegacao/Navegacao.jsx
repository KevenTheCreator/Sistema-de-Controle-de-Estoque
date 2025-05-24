import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Navegacao.css';

const pages = [
  { label: 'Inicio', path: '/tela-inicial' },
  { label: 'Produtos', path: '/tela-produtos' },
  { label: 'Solicitantes', path: '/tela-solicitantes' },
  { label: 'Entradas', path: '/tela-entradas' },
  { label: 'Saídas', path: '/tela-saidas' },
  { label: 'Relatórios', path: '/tela-relatorios' }
];
const Inicio = (event) => {
  event.preventDefault();
  window.location.href = '/tela-inicial';
}
const Produtos = (event) => {
  event.preventDefault();
  window.location.href = '/tela-produtos';
}
const Solicitantes = (event) => {
  event.preventDefault();
  window.location.href = '/tela-solicitantes';
}
const Entradas = (event) => {
  event.preventDefault();
  window.location.href = '/tela-entradas';
}
const Saidas = (event) => {
  event.preventDefault();
  window.location.href = '/tela-saidas';
}
const Relatorios = (event) => {
  event.preventDefault();
  window.location.href = '/tela-relatorios';
}

export default function Navegacao() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "rgba(255, 255, 255, 0)", boxShadow: 'none', mt: 3.5, "&MuiPaper-root": { width: "90%" } }} >
      <Container maxWidth="xxl" sx={{ backgroundColor: "#222D3C", borderRadius: 3, boxShadow: "10", padding: 2, width: "90%" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={"/tela-inicial"}><img className="logo-header" src="/logo-principal.png" alt="" /></Link>
          </Typography>
          
          {/* Menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={Inicio}>Inicio</MenuItem>
              <MenuItem onClick={Produtos}>Produtos</MenuItem>
              <MenuItem onClick={Solicitantes}>Solicitantes</MenuItem>
              <MenuItem onClick={Entradas}>Entradas</MenuItem>
              <MenuItem onClick={Saidas}>Saidas</MenuItem>
              <MenuItem onClick={Relatorios}>Relatórios</MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img className="logo-header" src="/logo-principal.png" alt="" />
          </Typography>

          {/* Menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700, fontSize: 16 }}
                component={Link}
                to={page.path}
              >
                {page.label}
              </Button>
            ))}
          </Box>
           
          <Badge badgeContent={100} color="error" sx={{mr: 1}}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir Menu">

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
               <MenuItem onClick={handleClose}>Notificações</MenuItem>
              <MenuItem onClick={handleClose}>Conta</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
          </Badge> 
        </Toolbar>
      </Container>
    </AppBar>
  );
}