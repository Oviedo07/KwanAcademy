import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Sección de Logo y Descripción */}
        <div className={styles.brand}>
          <h2>Kwan Academy</h2>
          <p>"Conocimiento que empodera, defensa que transforma."</p>
        </div>

        {/* Sección de Links */}
        <div className={styles.links}>
          <p>Enlaces</p>
          <ul>
            <li><a href="#1">Inicio</a></li>
            <li><a href="#2">Cursos</a></li>
            <li><a href="#3">Testimonios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div className={styles.social}>
          <p>Síguenos</p>
          <div className={styles.icons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className={styles.copyright}>
        <p>Kwan Academy © {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
