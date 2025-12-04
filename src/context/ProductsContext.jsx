// src/context/ProductsContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

const API_URL = "https://692976f49d311cddf34a01f2.mockapi.io/api/v1/productos";

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos
  const cargarProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
      setCargando(false);
    } catch (err) {
      console.error(err);
      setError("Error cargando productos");
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Crear producto
  const crearProducto = async (producto) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    const nuevo = await res.json();
    setProductos([...productos, nuevo]);
  };

  // Actualizar producto
  const actualizarProducto = async (id, producto) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    const actualizado = await res.json();
    setProductos(productos.map((p) => (p.id === id ? actualizado : p)));
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        crearProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
