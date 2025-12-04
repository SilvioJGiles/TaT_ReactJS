import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : { nombre: "", email: "" };
  });

  const login = (user) => {
    setIsAuthenticated(true);
    setUsuario(user);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("usuario", JSON.stringify(user));
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
