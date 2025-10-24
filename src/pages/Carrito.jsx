import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../CarritoCompras.css";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito } = useAppContext();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
    setAbierto(false); // 👈 cierra el panel al ir a pagar
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.precio), 0);

  return (
    <>
      {/* 🔘 Botón flotante */}
      <button className="carrito-toggle" onClick={() => setAbierto(!abierto)}>
        🛒 {carrito.length > 0 && <span className="badge">{carrito.length}</span>}
      </button>

      {/* 🌙 Overlay */}
      {abierto && <div className="carrito-overlay" onClick={() => setAbierto(false)} />}

      {/* 🧺 Panel flotante */}
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
                <div key={item.id} className="carrito-item">
                  {item.nombre} - ${Number(item.precio).toFixed(3)}
                </div>
              ))}
            </div>

            <div className="carrito-total">
              <hr />
              <strong>Total:</strong> ${Number(total).toFixed(3)}
            </div>

            <div className="carrito-botones">
              <button onClick={vaciarCarrito}>Vaciar</button>
              <button onClick={irAPagar}>Pagar</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
