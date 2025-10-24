import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const { isAuthenticated, usuario, carrito, cerrarSesion } = useAppContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Marca o logo */}
        <Link className="navbar-brand" to="/">Carni Line</Link>

        {/* Botón del menú responsive */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>

            <li className="nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white">
                    👋 Hola, <strong>{usuario.nombre}</strong>
                  </span>
                  <span className="badge bg-success">
                    🛒 {carrito.length}
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={cerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link className="nav-link" to="/iniciar-sesion">Iniciar Sesión</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
