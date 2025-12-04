import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaShoppingCart, FaTrash, FaCreditCard, FaPlus, FaMinus } from "react-icons/fa";
import "../CarritoCompras.css";

export default function Carrito() {
  const { carrito, vaciarCarrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad } = useCarrito();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  const handleToggle = () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para usar el carrito");
      return;
    }
    setAbierto(!abierto);
  };

  const handleVaciar = () => {
    vaciarCarrito();
    toast.success("Carrito vaciado");
  };

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
    setAbierto(false);
    toast.success("Redirigiendo a pago");
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Botón flotante */}
      <button className="carrito-toggle" onClick={handleToggle}>
        <FaShoppingCart size={20} />
        {carrito.length > 0 && <span className="badge">{carrito.length}</span>}
      </button>

      {/* Overlay */}
      {abierto && <div className="carrito-overlay" onClick={() => setAbierto(false)} />}

      {/* Panel flotante */}
      <div className={`carrito-flotante ${abierto ? "abierto" : ""}`}>
        <h2 className="carrito-titulo">
          Carrito de <span className="bold">Compras</span>
        </h2>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío</p>
        ) : (
          <>
            <div className="carrito-lista">
              {carrito.map((item) => (
                <div key={item.id} className="carrito-item d-flex justify-content-between align-items-center">
                  <div>
                    {item.nombre} - ${ (item.precio * item.cantidad).toFixed(3) }
                    <div className="d-flex gap-2 mt-1">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => disminuirCantidad(item.id)}>
                        <FaMinus />
                      </button>
                      <span>{item.cantidad}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => aumentarCantidad(item.id)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarrito(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="carrito-total mt-3">
              <hr />
              <strong>Total:</strong> ${total.toFixed(3)}
            </div>

            <div className="carrito-botones mt-2 d-flex gap-2">
              <button className="btn btn-outline-danger" onClick={handleVaciar}>
                <FaTrash /> Vaciar
              </button>
              <button className="btn btn-outline-success" onClick={irAPagar}>
                <FaCreditCard /> Pagar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
