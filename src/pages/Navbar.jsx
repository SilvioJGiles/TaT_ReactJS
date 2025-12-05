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
  <nav className="nav-custom">

    {/* Hamburguesa a la izquierda */}
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

    {/* Menu Desktop (queda igual) */}
    <ul className="menu-desktop">
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/servicios">Servicios</Link></li>
      <li><Link to="/productos">Productos</Link></li>

      {isAuthenticated ? (
        <>
          <li className="saludo">Hola, <b>{usuario.nombre}</b></li>

          {usuario.rol === "administrador" && (
            <li><Link to="/dashboard">Administrar</Link></li>
          )}

          <li><button className="btn-salir" onClick={cerrarSesion}>Salir</button></li>
          <li><Carrito /></li>
        </>
      ) : (
        <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
      )}
    </ul>

  </nav>


      {/* Menu Móvil (Overlay) */}
      <div className={`menu-movil ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Inicio</Link></li>
          <li><Link to="/servicios" onClick={() => setOpen(false)}>Servicios</Link></li>
          <li><Link to="/productos" onClick={() => setOpen(false)}>Productos</Link></li>

          {isAuthenticated ? (
            <>
              <li className="saludo">Hola, <b>{usuario.nombre}</b></li>

              {usuario.rol === "administrador" && (
                <li><Link to="/dashboard" onClick={() => setOpen(false)}>Administrar</Link></li>
              )}

              <li>
                <button className="btn-salir" onClick={() => { cerrarSesion(); setOpen(false); }}>
                  Cerrar Sesión
                </button>
              </li>

              <li><Carrito /></li>
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
