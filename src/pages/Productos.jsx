// src/pages/Productos.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carrito from "../pages/Carrito";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Modal edición
  const [modalVisible, setModalVisible] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState("");

  // Modal eliminación
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: ""
  });

  // Búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  const { isAuthenticated, usuario } = useAuth();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  const API_URL = "https://692976f49d311cddf34a01f2.mockapi.io/api/v1/productos";

  // ======================================================
  // Cargar productos
  // ======================================================
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const productosConImagen = data.map(producto => ({
          ...producto,
          imagen: producto.imagen
            ? producto.imagen.startsWith("data:image")
              ? producto.imagen
              : `data:image/jpeg;base64,${producto.imagen}`
            : null
        }));
        setProductos(productosConImagen);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error al cargar productos");
        setCargando(false);
      });
  }, []);

  // ======================================================
  // Filtrado y paginación
  // ======================================================
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);

  // ======================================================
  // Comprar
  // ======================================================
  const manejarComprar = (producto) => {
    if (!isAuthenticated) {
      navigate("/iniciar-sesion");
    } else if (usuario.rol !== "administrador") {
      agregarAlCarrito(producto);
    }
  };

  // ======================================================
  // Abrir modal edición
  // ======================================================
  const abrirModalEditar = (productoId) => {
    if (!productoId) {
      setFormData({ id: "", nombre: "", descripcion: "", precio: "", imagen: "" });
      setModalVisible(true);
      setErrorGuardar("");
      return;
    }

    fetch(`${API_URL}/${productoId}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          id: data.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          imagen: data.imagen.startsWith("data:image")
            ? data.imagen
            : `data:image/jpeg;base64,${data.imagen}`
        });
        setModalVisible(true);
        setErrorGuardar("");
      })
      .catch(err => console.error(err));
  };

  const manejarCerrarModal = () => setModalVisible(false);

  // ======================================================
  // Inputs formulario edición
  // ======================================================
  const manejarInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarImagenChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, imagen: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ======================================================
  // Guardar edición / agregar producto
  // ======================================================
  const manejarGuardarCambios = () => {
    setErrorGuardar("");

    const imgBase64 = formData.imagen.includes("base64,")
      ? formData.imagen.split(",")[1]
      : formData.imagen;

    const payload = { ...formData, imagen: imgBase64 };

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? `${API_URL}/${formData.id}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => {
        const productoActualizado = { ...data, imagen: `data:image/jpeg;base64,${data.imagen}` };

        if (formData.id) {
          setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
        } else {
          setProductos(prev => [...prev, productoActualizado].sort((a, b) => a.nombre.localeCompare(b.nombre)));
        }

        setModalVisible(false);
      })
      .catch(err => setErrorGuardar("No se pudo guardar el producto. La imagen puede ser demasiado grande."));
  };

  // ======================================================
  // Confirmación eliminar
  // ======================================================
  const manejarEliminar = (producto) => {
    setProductoAEliminar(producto);
    setModalEliminarVisible(true);
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
    setModalEliminarVisible(false);
  };

  const eliminarProducto = () => {
    if (!productoAEliminar) return;

    fetch(`${API_URL}/${productoAEliminar.id}`, { method: "DELETE" })
      .then(() => {
        setProductos(prev => prev.filter(p => p.id !== productoAEliminar.id));
        setProductoAEliminar(null);
        setModalEliminarVisible(false);
      })
      .catch(err => console.error(err));
  };

  // ======================================================
  // Render
  // ======================================================
  if (cargando) return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh", flexDirection: "column", textAlign: "center" }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#333",
          margin: 0
        }}
      >
        Cargando productos...
      </p>
    </div>
  );

  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
        className="form-control mb-3"
      />

      {/* Botón agregar */}
      {isAuthenticated && usuario.rol === "administrador" && (
        <div className="mb-4">
          <button className="btn btn-success" onClick={() => abrirModalEditar(null)}>
            Agregar Producto
          </button>
        </div>
      )}

      {/* Lista de productos */}
      <ul id="lista-productos" style={{ listStyle: "none", padding: 0 }}>
        {productosPaginados.map(producto => (
          <li
            key={producto.id}
            style={{
              marginBottom: "1.5rem",
              padding: "0.8rem",
              border: "1px solid #cf4b0dff", // borde bordó de la tarjeta
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{producto.nombre}</h3>
            <p style={{ marginBottom: "0.3rem" }}>{producto.descripcion}</p>
            <p style={{ marginBottom: "0.5rem" }}>Precio: ${producto.precio}</p>

            {producto.imagen && (
              <div style={{ border: "1px solid #ccc", padding: "4px", marginBottom: "0.7rem", borderRadius: "8px" }}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  width="90%"
                  style={{ display: "block", margin: "0 auto", borderRadius: "6px", border: "none" }}
                />
              </div>
            )}

            {/* Botón Más detalles */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.3rem" }}>
              <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{ producto }}>
                <button className="btn btn-outline-primary btn-sm">Más detalles</button>
              </Link>
            </div>

            {/* Botones de acción */}
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
              {usuario?.rol !== "administrador" && (
                <button
                  onClick={() => manejarComprar(producto)}
                  className="btn btn-sm"
                  style={{ backgroundColor: "#e98a1eff", color: "white" }}
                >
                  Comprar
                </button>
              )}

              {usuario?.rol === "administrador" && (
                <>
                  <button
                    onClick={() => abrirModalEditar(producto.id)}
                    className="btn btn-sm"
                    style={{ backgroundColor: "#6ba010ff", color: "white" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => manejarEliminar(producto)}
                    className="btn btn-sm"
                    style={{ backgroundColor: "#e23258ff", color: "white" }}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => cambiarPagina(i + 1)}
            className="btn btn-sm mx-1"
            style={
              paginaActual === i + 1
                ? {
                    backgroundColor: "#cf4b0dff",
                    color: "white",
                    border: "2.5px solid #cf4b0dff",
                    fontWeight: "700"
                  }
                : {
                    backgroundColor: "transparent",
                    color: "white",
                    border: "2.5px solid white",
                    fontWeight: "700"
                  }
            }
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal edición / agregar */}
      {modalVisible && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 999
        }}>
          <div style={{
            backgroundColor: "white", padding: "2rem", borderRadius: "8px",
            width: "400px", maxHeight: "90%", overflowY: "auto"
          }}>
            <h3>{formData.id ? "Editar Producto" : "Agregar Producto"}</h3>
            {errorGuardar && <div className="alert alert-danger">{errorGuardar}</div>}

            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={manejarInputChange} className="form-control mb-2" />

            <label>Descripción:</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={manejarInputChange} className="form-control mb-2" />

            <label>Precio:</label>
            <input type="number" name="precio" value={formData.precio} onChange={manejarInputChange} className="form-control mb-2" />

            <label>Imagen actual:</label>
            {formData.imagen && (
              <div style={{ border: "1px solid #ccc", padding: "5px", marginBottom: "5px" }}>
                <img src={formData.imagen} alt="Producto" style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />
              </div>
            )}

            <label>Cambiar imagen:</label>
            <input type="file" accept="image/*" onChange={manejarImagenChange} className="form-control mb-3" />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={manejarGuardarCambios} className="btn btn-success">Guardar</button>
              <button onClick={manejarCerrarModal} className="btn btn-secondary">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {modalEliminarVisible && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "white", padding: "2rem", borderRadius: "8px",
            width: "350px", textAlign: "center"
          }}>
            <h4>¿Eliminar "{productoAEliminar?.nombre}"?</h4>
            <p>Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
              <button className="btn btn-secondary" onClick={cancelarEliminar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && usuario.rol !== "administrador" && <Carrito />}
    </div>
  );
}
