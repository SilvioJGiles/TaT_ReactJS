import React from 'react';

function Inicio() {
  return (
<section
  style={{
    position: 'relative',
    backgroundImage: 'url(/banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '75vh',      // Banner más alto
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',  // Texto pegado abajo
    alignItems: 'center',
    paddingBottom: '40px',
  }}
>
  {/* Overlay que cubre TODO el banner */}
  <div
    style={{
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      height: 300, 
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      zIndex: 1,
    }}
  ></div>

  {/* Texto arriba del overlay, fijo abajo */}
  <div style={{ position: 'absolute', top: 180, zIndex: 2 }}>
    <h1
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 900,
        fontSize: '4.5rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        margin: 0,
        textShadow: `
          0 0 10px rgba(255,255,255,0.8),
          0 0 20px rgba(255,255,255,0.4)
        `,
      }}
    >
      Osobuco Palace
    </h1>

    <h2
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: '1.5rem',
        marginBottom: '1rem',
        textShadow: '0 0 10px rgba(255,255,255,0.6)',
      }}
    >
      El corte que se hizo "cool" por darle manija en Instagram
    </h2>
  </div>
</section>

  );
}

export default Inicio;
