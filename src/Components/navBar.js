import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoside from "../assets/images/logoka.png";
import logo from "../assets/images/logoka.png";
import { useAuth } from "../context/AuthContext";

import Swal from "sweetalert2";
import { MdLogin } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Controla el sidebar
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Para desplegables
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar sesión
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
      </div>

      {/* Mostrar enlaces normales en PC y ocultar en móvil */}
      <div className={`${styles.NavLink} ${isMobile ? styles.hideOnMobile : ""}`}>
        <a href="/">Inicio</a>
        <a href="/Courses">Cursos</a>
        <a href="/FreeResources">Recursos gratuitos</a>
      </div>

      {/* Mostrar dropdown solo en móvil */}
      {isMobile && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <IoIosArrowDown className={isDropdownOpen ? styles.rotateIcon : ""} />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenuLink}>
              <a href="/">Inicio</a>
              <a href="/Courses">Cursos</a>
              <a href="/FreeResources">Recursos gratuitos</a>
            </div>
          )}
        </div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <img src={logoside} alt="Logo Sidebar" className={styles.logosidebar} />
          <h2 className={styles.sidebarTitle}>Kwan Academy</h2>
          <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <ul>
          <li onClick={() => navigate("/")}>Inicio</li>
          <li onClick={() => navigate("/WhoWeAre")}>¿Quiénes somos?</li>
          <li onClick={() => navigate("/MissionVission")}>Misión y visión</li>
          <li onClick={() => navigate("/FAQ")} className={styles.FAQ}>FAQ</li>
          <li onClick={() => navigate("/AdminViews/HomeAdmin")}>Acceso admin</li>
        </ul>
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <div className={styles.menuContainer}>
        {isAuthenticated ? (
          <div className={styles.profileContainer}>
            <img
              src="https://imgur.com/vnUR4HS.jpg"
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

        {/* Este icono SIEMPRE aparece */}
        <RxHamburgerMenu
          className={styles.sidebarMenu}
          onClick={() => setMenuOpen(true)}
        />
      </div>

    </div>
  );
};

export default Navbar;
