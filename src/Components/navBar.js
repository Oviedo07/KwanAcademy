import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../assets/images/logo.png";
import menuside from "../assets/images/menuside.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Kwan Academy Logo" className={styles.logo} onClick={() => navigate("/")} />
        <h2 className={styles.title}
        onClick={() => navigate("/")}>Kwan Academy</h2>
      </div>

      {/* Contenedor del Menú y Regístrate */}
      <div className={styles.menuContainer}>
        <button className={styles.registerButton} onClick={() => navigate("/registro")}>
          Regístrate
        </button>
          {/* {!menuOpen && (
            <RxHamburgerMenu
              className={styles.menuIcon}
              onClick={() => setMenuOpen(true)}
              size={30}
            />
          )} */}
      </div>

      {/* Fondo oscuro cuando el menú está abierto */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      {/* Sidebar con Logo y Título */}
      <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <img src={menuside} alt="Kwan Academy Logo" className={styles.sidebarLogo} onClick={() => setMenuOpen(true)}/>
          <h2 className={styles.sidebarTitle}>Kwan Academy</h2>
          {/* <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
            ✖
          </button> */}
        </div>

        <ul>
          <li onClick={() => navigate("/")}>Inicio</li>
          <li onClick={() => navigate("/servicios")}>Técnicas de defensa</li>
          <li onClick={() => navigate("/Courses")}>Cursos virtuales</li>
          <li onClick={() => navigate("/videos")}>Videos de práctica</li>
          <li onClick={() => navigate("/contacto")}>Registro</li>
        </ul>
      </div>
    </div>  
  );
};

export default Navbar;
