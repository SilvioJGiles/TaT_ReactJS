// src/pages/Administrar.jsx
import { useLocation } from "react-router-dom";
import { ProductsProvider } from "../context/ProductsContext";
import Productos from "./Productos";        // Modo admin
import ProductForm from "../components/ProductForm";
import DeleteModal from "../components/DeleteModal";
import { useState } from "react";

export default function Administrar() {
  // Si venimos desde botón EDITAR pasamos el producto en location.state
  const location = useLocation();
  const productoEdit = location.state?.productoEdit || null;

  const [modalEliminar, setModalEliminar] = useState(null);

  return (
    <ProductsProvider>
      <div className="container py-4">

        <h1 className="mb-4">Administración de productos</h1>

        <div className="row">

          {/* FORMULARIO */}
          <div className="col-md-4">
            <ProductForm productoEdit={productoEdit} />
          </div>

          {/* LISTA DE PRODUCTOS (Modo admin) */}
          <div className="col-md-8">
            <Productos
              adminMode={true}
              onDelete={(id) => setModalEliminar(id)}
            />
          </div>

        </div>

        {/* MODAL DE ELIMINACIÓN */}
        {modalEliminar && (
          <DeleteModal id={modalEliminar} onClose={() => setModalEliminar(null)} />
        )}

      </div>
    </ProductsProvider>
  );
}
