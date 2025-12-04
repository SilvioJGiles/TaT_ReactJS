// src/components/ProductForm.jsx
import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import { toast } from "react-toastify";

export default function ProductForm({ productoEdit }) {
  const { crearProducto, actualizarProducto } = useProducts();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    if (productoEdit) setForm(productoEdit);
  }, [productoEdit]);

  const validar = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (form.descripcion.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres";
    if (isNaN(form.precio) || Number(form.precio) <= 0)
      return "El precio debe ser mayor a 0";
    if (!form.imagen.trim() || !form.imagen.startsWith("http"))
      return "La imagen debe ser una URL válida";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validar();
    if (error) return toast.error(error);

    const productoData = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen: form.imagen,
    };

    if (productoEdit) {
      await actualizarProducto(productoEdit.id, productoData);
      toast.success("Producto actualizado");
    } else {
      await crearProducto(productoData);
      toast.success("Producto creado");
    }

    setForm({ nombre: "", descripcion: "", precio: "", imagen: "" });
  };

  return (
    <div className="card p-3 shadow mb-4">
      <h4>{productoEdit ? "Editar producto" : "Agregar producto"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="URL Imagen"
          value={form.imagen}
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />
        <button className="btn btn-primary w-100" type="submit">
          {productoEdit ? "Guardar cambios" : "Crear producto"}
        </button>
      </form>
    </div>
  );
}
