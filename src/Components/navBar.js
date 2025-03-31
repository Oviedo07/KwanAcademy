import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import menuside from "../assets/images/menuside.png";
import logoside from "../assets/images/logoka.png";
import logo from "../assets/images/logoka.png";
import { useAuth } from "../context/AuthContext";
import logoSesion from "../assets/images/testimonio4.jpeg";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2
import { MdLogin } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // ✅ Nueva función para confirmar el cierre de sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Serás desconectado de tu cuenta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire("Sesión cerrada", "Has cerrado sesión exitosamente.", "success");
      }
    });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Kwan Academy Logo" className={styles.logo} onClick={() => navigate("/")} />
        <h2 className={styles.title} onClick={() => navigate("/")}>Kwan Academy</h2>
        <div className={styles.NavLink}>
          <a href="/" className={styles.Link}>Inicio</a>
          <a href="/Courses" className={styles.Link}>Cursos</a>
          <a href="/FreeResources" className={styles.Link}>Recursos gratuitos</a>
          <a href="/FAQ" className={styles.Link}>FAQ</a>
        </div>

      </div>

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
                <button className={styles.ProfileButton} onClick={() => navigate("/Data")}>
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
          
            <button className={styles.loginButton} onClick={() => navigate("/Signin")}>
            <MdLogin className={styles.loginIcon} />
              Ingresa
            </button>
            <button className={styles.registerButton} onClick={() => navigate("/Register")}>
              Registro
            </button>
          </>
        )}
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

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
          <li onClick={() => navigate("/servicios")}>Técnicas defensa</li>
          <li onClick={() => navigate("/Courses")}>Cursos </li>
          <li onClick={() => navigate("/videos")}>Videos práctica</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
