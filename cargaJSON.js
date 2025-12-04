import fs from "fs/promises"; // módulo nativo
// fetch ya está disponible en Node 24+

const API_URL = "https://692976f49d311cddf34a01f2.mockapi.io/api/v1/productos";

async function cargarProductos() {
  try {
    // Leemos el JSON generado con Base64
    const jsonData = await fs.readFile("./productos_base64.json", "utf-8");
    const productosJson = JSON.parse(jsonData);

    for (const producto of productosJson.productos) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto), // enviamos todo el objeto tal cual
        });

        if (!res.ok) {
          console.error("Error cargando:", producto.nombre, res.statusText);
          continue;
        }

        const data = await res.json();
        console.log("Producto cargado:", data.nombre, "ID:", data.id);
      } catch (err) {
        console.error("Error:", producto.nombre, err.message);
      }
    }

    console.log("✅ Carga finalizada!");
  } catch (err) {
    console.error("No se pudo leer el archivo JSON:", err.message);
  }
}

cargarProductos();
