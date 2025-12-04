import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        <div className="footer__column">
          <h2 className="footer__logo">Osobuco Palace</h2>
          <p>Seguinos:</p>
          <div className="footer__social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="footer__column">
          <h4>Legales</h4>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
