import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (usuario.rol !== "administrador") {
    return <Navigate to="/" replace />; // Redirige al inicio si no es admin
  }

  return children;
}
