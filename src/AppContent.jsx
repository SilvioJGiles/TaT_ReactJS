// src/AppContent.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Navbar from './pages/Navbar';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/DetalleProdutos';
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from './pages/Footer';
import Dashboard from "./pages/Dashboard";

import Administrar from "./pages/Administrar";

import { useAuth } from "./context/AuthContext";  // ← Para validar rol
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppContent() {
  const { isAuthenticated, usuario } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:id' element={<ProductoDetalle />} />
        <Route path='/productos/:categoria/:id' element={<ProductoDetalle />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* PAGAR: protegido solo por autenticación */}
        <Route
          path="/pagar"
          element={
            <RutaProtegida>
              <Pagar />
            </RutaProtegida>
          }
        />

        {/* ADMINISTRAR: Solo para rol "administrador" */}
        <Route
          path="/administrar"
          element={
            isAuthenticated && usuario.rol === "administrador" ? (
              <Administrar />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
