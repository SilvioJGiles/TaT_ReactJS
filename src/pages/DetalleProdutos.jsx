// src/pages/DetalleProductos.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

export default function DetalleProductos() {
  const location = useLocation();
  const { producto } = location.state || {};
  const { isAuthenticated, usuario } = useAuth();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const manejarComprar = () => {
    if (!isAuthenticated) {
      navigate("/iniciar-sesion");
    } else if (usuario.rol !== "administrador") {
      agregarAlCarrito(producto);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #800000",
          borderRadius: "10px",
          padding: "1rem",
          maxWidth: "250px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
        }}
      >
        {/* Nombre del producto */}
        <h2 style={{ fontWeight: "700", fontSize: "1.4rem", marginBottom: "0.8rem" }}>
          {producto.nombre}
        </h2>

        {/* Imagen con borde gris */}
        {producto.imagen && (
          <div style={{ border: "1px solid #ccc", padding: "4px", marginBottom: "0.8rem", borderRadius: "8px" }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "contain",
                borderRadius: "6px"
              }}
            />
          </div>
        )}

        {/* Descripción */}
        <p style={{ marginBottom: "0.4rem", fontSize: "0.95rem" }}>
          {producto.descripcion}
        </p>

        {/* Precio */}
        <p style={{ fontWeight: "600", fontSize: "1rem", marginBottom: "0.8rem" }}>
          Precio: ${producto.precio}
        </p>

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {usuario?.rol !== "administrador" && (
            <button
              onClick={manejarComprar}
              className="btn"
              style={{ backgroundColor: "#e98a1eff", color: "white", padding: "0.4rem 1rem" }}
            >
              Comprar
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            style={{ padding: "0.4rem 1rem" }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
