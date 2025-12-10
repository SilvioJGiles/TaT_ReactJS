import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import Carrito from './Carrito';
import '../Navbar.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, usuario, cerrarSesion } = useAuth();
  const { carrito } = useCarrito();

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className="nav-custom">

        {/* Hamburguesa */}
        <div className="hamburguesa" onClick={() => setOpen(!open)}>
          <div className={open ? "linea open" : "linea"}></div>
          <div className={open ? "linea open" : "linea"}></div>
          <div className={open ? "linea open" : "linea"}></div>
        </div>

        {/* Logo */}
        <Link
          className="logo"
          to={usuario?.rol === "administrador" ? "/dashboard" : "/"}
        >
          Carni Line
        </Link>

        {/* MENU DESKTOP */}
        <ul className="menu-desktop">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/productos">Productos</Link></li>

          {/* CONTENIDO DEPENDIENDO LOGIN */}
          {isAuthenticated ? (
            <>
              {/* Saludo */}
              <li className="saludo">Hola, <b>{usuario.nombre}</b></li>

              {/* Admin */}
              {usuario.rol === "administrador" && (
                <li><Link to="/dashboard">Administrar</Link></li>
              )}

              {/* Botón salir */}
              <li>
                <button
                  className="btn-salir"
                  onClick={cerrarSesion}
                >
                  Salir
                </button>
              </li>

              {/* Carrito Desktop */}
              <li><Carrito /></li>
            </>
          ) : (
            <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
          )}
        </ul>

      </nav>

      {/* MENU MÓVIL (overlay) */}
      <div className={`menu-movil ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Inicio</Link></li>
          <li><Link to="/servicios" onClick={() => setOpen(false)}>Servicios</Link></li>
          <li><Link to="/productos" onClick={() => setOpen(false)}>Productos</Link></li>

          {/* CONTENIDO LOGIN/MÓVIL */}
          {isAuthenticated ? (
            <>
              <li className="saludo saludo-movil">Hola, <b>{usuario.nombre}</b></li>

              {usuario.rol === "administrador" && (
                <li><Link to="/dashboard" onClick={() => setOpen(false)}>Administrar</Link></li>
              )}

              <li>
                <button
                  className="btn-salir"
                  onClick={() => { cerrarSesion(); setOpen(false); }}
                >
                  Cerrar Sesión
                </button>
              </li>

              <li className="carrito-movil">
                <Carrito />
              </li>
            </>
          ) : (
            <li><Link to="/iniciar-sesion" onClick={() => setOpen(false)}>Iniciar Sesión</Link></li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
