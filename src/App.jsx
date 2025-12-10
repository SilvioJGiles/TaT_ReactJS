import React, { useEffect } from "react";
import { AppProvider } from './context/AppContext';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import AppContent from './AppContent';
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import usuarios from "../public/usuarios.json";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  useEffect(() => {
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("Usuarios cargados en localStorage");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Tu carnicería en la web</title>
        <meta name="description" content="Compra productos de calidad en nuestra tienda online."/>
        <meta name="keywords" content="productos, tienda online, compras"/>
        <meta name="author" content="Silvio J. Giles"/>
      </Helmet>

      <CarritoProvider>
        <AuthProvider>
          <AppProvider>
            <AppContent />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AppProvider>
        </AuthProvider>
      </CarritoProvider>
    </>
  );
}

export default App;
