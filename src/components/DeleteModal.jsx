// src/components/DeleteModal.jsx
import { useProducts } from "../context/ProductsContext";

export default function DeleteModal({ id, onClose }) {
  const { eliminarProducto } = useProducts();

  const aceptar = () => {
    eliminarProducto(id);
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar eliminación</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            ¿Estás seguro que querés eliminar este producto?
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={aceptar}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
