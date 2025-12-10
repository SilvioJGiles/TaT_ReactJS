import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

export default function Pagar() {
  const { cerrarSesion } = useAuth();
  const { carrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const total = carrito.reduce(
    (suma, producto) => suma + Number(producto.precio),
    0
  );

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <div 
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px"
        }}
      >
        
        {/* Título */}
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Confirmar Compra
        </h2>

        {/* Carrito */}
        <div>
          {carrito.length > 0 ? (
            <>
              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    background: "#fafafa",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px"
                    }}
                  />

                  <span style={{ flex: 1, marginLeft: "1rem", fontSize: "1.1rem" }}>
                    {producto.nombre}
                  </span>

                  <strong
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#333"
                    }}
                  >
                    ${producto.precio}
                  </strong>
                </div>
              ))}

              {/* Total */}
              <h3
                style={{
                  textAlign: "right",
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  marginTop: "1rem",
                  color: "#222"
                }}
              >
                Total: ${total}
              </h3>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </div>

        {/* Botones */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          {carrito.length > 0 && (
            <button
              onClick={comprar}
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#cf4b0d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}
            >
              Confirmar y Pagar
            </button>
          )}

          <button
            onClick={() => navigate("/productos")}
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#ddd",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600"
            }}
          >
            {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
          </button>

          {/* Cerrar sesión opcional */}
          <button
            onClick={cerrarSesion}
            style={{
              marginTop: "1rem",
              color: "#777",
              background: "none",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
