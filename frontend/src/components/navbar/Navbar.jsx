import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { setIsLogged } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>

        {/* Enlace a Dashboard */}
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>

        {/* Enlace a Contacto */}
        <Button color="inherit" component={Link} to="/contacto">
          Contacto
        </Button>

        {/* Botón de Logout */}
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;