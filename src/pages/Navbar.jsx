import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import Carrito from './Carrito';

function Navbar() {
  const { isAuthenticated, usuario, cerrarSesion } = useAuth();
  const { carrito } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* Logo: si es admin → dashboard */}
        <Link
          className="navbar-brand"
          to={usuario?.rol === "administrador" ? "/dashboard" : "/"}
        >
          Carni Line
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Links generales */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to={usuario?.rol === "administrador" ? "/dashboard" : "/"}
              >
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>

            {/* Zona derecha: usuario y carrito */}
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-3">

                  {/* Saludo */}
                  <span className="text-white">
                    👋 Hola, <strong>{usuario.nombre}</strong>
                  </span>

                  {/* Botón visible solo si es administrador */}
                  {usuario.rol === "administrador" && (
                    <Link
                      className="btn btn-warning btn-sm"
                      to="/dashboard"
                    >
                      Administrar
                    </Link>
                  )}

                  {/* Botón cerrar sesión */}
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={cerrarSesion}
                  >
                    Cerrar Sesión
                  </button>

                  {/* Carrito (solo logueado) */}
                  <Carrito />
                </div>
              ) : (
                <Link className="nav-link" to="/iniciar-sesion">Iniciar Sesión</Link>
              )}
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
