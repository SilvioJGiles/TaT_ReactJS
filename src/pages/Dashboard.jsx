import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  // Token desde localStorage
  const tokenActual = localStorage.getItem('authToken');

  // Ir al formulario de agregar producto
  const manejarAgregarProducto = () => {
    navigate('/formulario-producto');
  };

  return (
    <div style={{ padding: '20px', minHeight: '60vh' }}>
      <h1>Dashboard Administrativo</h1>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        
        {/* USUARIO */}
        <p>
          <strong>Sesión iniciada como: </strong> {usuario?.nombre}
        </p>

        {/* TOKEN */}
        <div
          style={{
            background: '#e9ecef',
            padding: '10px',
            borderRadius: '4px',
            margin: '10px 0',
            fontSize: '14px',
            wordBreak: 'break-all',
          }}
        >
          <strong>Token de autenticación:</strong>
          <br />
          <code>{tokenActual}</code>
        </div>

        {/* ACCIONES ADMIN */}
        <div style={{ margin: '20px 0' }}>
          <h3>Acciones:</h3>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '10px',
            }}
          >
            {/* AGREGAR PRODUCTOS */}
            <button
              onClick={manejarAgregarProducto}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Agregar Productos
            </button>

            {/* LISTA DE PRODUCTOS */}
            <Link
              to="/productos"
              style={{
                padding: '10px 20px',
                background: '#17a2b8',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Ver / Editar / Eliminar Productos
            </Link>
          </div>
        </div>

        <hr />

        {/* CERRAR SESIÓN */}
        <button
          onClick={cerrarSesion}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
