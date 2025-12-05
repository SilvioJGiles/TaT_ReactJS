import React from 'react';
import '../Inicio.css'; // Creamos un CSS separado para facilitar el responsivo

function Inicio() {
  return (
    <section className="banner">
      <div className="banner-overlay"></div>

      <div className="banner-text">
        <h1>Osobuco Palace</h1>
        <h2>El corte que se hizo "cool" por darle manija en Instagram</h2>
      </div>
    </section>
  );
}

export default Inicio;
