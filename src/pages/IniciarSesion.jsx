import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Leer usuarios desde localStorage
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario por nombre
    const usuarioEncontrado = storedUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuarioEncontrado) {
      setError("El usuario no existe.");
      return;
    }

    if (usuarioEncontrado.password !== password) {
      setError("La contraseña es incorrecta.");
      return;
    }

    // Login exitoso: guardamos el usuario en el contexto
    login(usuarioEncontrado);

    // Navegar al inicio
    navigate("/");
  };

  const inputStyle = {
    backgroundColor: "#2c2c2c",
    color: "white",
    border: "1px solid #555",
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="fw-bold text-white">Iniciar Sesión</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold text-white">Dirección de correo:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control form-control-sm"
            style={inputStyle}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-white">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control form-control-sm"
            style={inputStyle}
          />
        </div>

        <button className="btn btn-primary w-100 mt-2" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
