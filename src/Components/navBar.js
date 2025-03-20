import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import menuside from "../assets/images/menuside.png";
import logoside from "../assets/images/logoka.png";
import logo from "../assets/images/logoka.png";
import { useAuth } from "../context/AuthContext";
import logoSesion from "../assets/images/testimonio4.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para el menú emergente
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Kwan Academy Logo" className={styles.logo} onClick={() => navigate("/")} />
        <h2 className={styles.title} onClick={() => navigate("/")}>Kwan Academy</h2>
      </div>

      {/* Contenedor del Menú y botones de autenticación */}
      <div className={styles.menuContainer}>
        {isAuthenticated ? (
          <div className={styles.profileContainer}>
            <img 
              src={logoSesion} 
              className={styles.profileImage} 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              alt="Perfil"
            />
            {isProfileOpen && (
              <div className={styles.dropdownMenu}>
                <p className={styles.userName}>{user?.name || "Usuario"}</p>
                <p className={styles.userEmail}>{user?.email || "Correo no disponible"}</p>
                <button className={styles.ProfileButton}>
                  Tu cuenta 
                </button>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className={styles.registerButton} onClick={() => navigate("/Register")}>
              Regístrate
            </button>
            <button className={styles.loginButton} onClick={() => navigate("/SignIn")}>
              Ingresar
            </button>
          </>
        )}
      </div>

      {/* Fondo oscuro cuando el menú está abierto */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      {/* Sidebar con Logo y Título */}
      <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          {!menuOpen ? (
            <img
              src={menuside}
              alt="Sidebar Logo"
              className={styles.sidebarLogo}
              onClick={() => setMenuOpen(true)}
            />
          ) : (
            <img
              src={logoside}
              alt="Kwan Academy Logo"
              className={styles.logosidebar}
              onClick={() => setMenuOpen(false)}
            />
          )}
          <h2 className={styles.sidebarTitle}>Kwan Academy</h2>
          <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
            ✖
          </button>
        </div>

        <ul>
          <li onClick={() => navigate("/")}>Inicio</li>
          <li onClick={() => navigate("/servicios")}>Técnicas de defensa</li>
          <li onClick={() => navigate("/Courses")}>Cursos virtuales</li>
          <li onClick={() => navigate("/videos")}>Videos de práctica</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
