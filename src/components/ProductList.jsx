// src/components/ProductList.jsx
import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import DeleteModal from "./DeleteModal";

export default function ProductList() {
  const { products, setSelectedProduct } = useProducts();
  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      <ul className="list-group">
        {products.map((p) => (
          <li className="list-group-item d-flex justify-content-between" key={p.id}>
            <div>
              <strong>{p.name}</strong> — ${p.price}
              <br />
              {p.description}
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => setSelectedProduct(p)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => setDeleteId(p.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteId && <DeleteModal id={deleteId} onClose={() => setDeleteId(null)} />}
    </>
  );
}
