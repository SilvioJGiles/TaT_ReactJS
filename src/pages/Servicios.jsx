import React from 'react';
import { Link } from 'react-router-dom';

function Servicios() {

  const botonSalmon = {
    backgroundColor: '#FA8072',
    color: 'white',
    border: 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  };

  const botonSalmonHover = {
    backgroundColor: '#E6735C',
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '10px auto 0 auto',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      <h1>Servicios</h1>
      <hr style={{ borderColor: 'white' }} />

      <p>En nuestra carnicería ofrecemos una atención personalizada y una selección de productos pensados para satisfacer a todos nuestros clientes, desde hogares hasta negocios gastronómicos.</p>

      <h3>🛒 Servicios que brindamos:</h3>
      <ul>
        <li><strong>Venta de carnes frescas:</strong> Vacuna, porcina, aviar y ovina, seleccionadas con estrictos controles de calidad.</li>
        <li><strong>Cortes a pedido:</strong> Realizamos el corte que necesites: milanesas, bifes, churrascos, deshuesado, etc.</li>
        <li><strong>Productos listos para cocinar:</strong> Hamburguesas caseras, arrollados, brochettes, milanesas y más.</li>
        <li><strong>Envasado al vacío:</strong> Ideal para conservar por más tiempo o para compras al por mayor.</li>
        <li><strong>Pedidos por WhatsApp o teléfono:</strong> Hacelo fácil. Pedí, retiralo o recibilo en tu casa.</li>
        <li><strong>Reparto a domicilio:</strong> Entregamos en la zona, sin cargo adicional en compras superiores a cierto monto.</li>
        <li><strong>Asesoramiento en cortes y recetas:</strong> Te ayudamos a elegir el corte ideal para lo que quieras cocinar.</li>
        <li><strong>Promociones y combos semanales:</strong> Aprovechá nuestros packs familiares o por volumen para ahorrar.</li>
        <li><strong>Provisión para eventos:</strong> Abastecemos carnes para cumpleaños, asados, fiestas o reuniones especiales.</li>
      </ul>

      <p>Nos esforzamos cada día por brindarte calidad, atención y confianza. ¡Te esperamos!</p>

      <Link to="/">
        <button style={botonSalmon}>Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default Servicios;
