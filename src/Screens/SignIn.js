import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignIn.module.css";
import { useAuth } from "../context/AuthContext";
import { userAuthContext } from "../context/UserAuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getDefaultEmail = () => {
    return activeTab === "Instructor"
      ? " "
      : " ";
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmail(getDefaultEmail());
    setPassword("");
  };
// Solo actualizamos la parte relevante del handleSubmit en SignIn.js

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    console.log("Enviando solicitud de inicio de sesión...");
    
    // Endpoint diferente según el tipo de usuario
    const endpoint = activeTab === "Instructor" 
      ? "http://localhost:5000/api/signInInstructor" 
      : "http://localhost:5000/api/signin";
    
    // Ahora usamos "contrasena" en lugar de "password" para instructores
    // para coincidir con lo que espera el backend
    const payload = activeTab === "Instructor" 
      ? { email, contrasena: password } 
      : { email, password, role: activeTab.toLowerCase() };
    
    console.log("Enviando payload:", payload);
    
    const response = await axios.post(endpoint, payload, {
      withCredentials: true // Importante para mantener la sesión
    });

    console.log("Respuesta del servidor:", response.data);
    
    if (response.data.user) {
      // Pasamos el objeto user completo al método login
      const userData = response.data.user;
      
      // Asegurarnos de que el usuario tenga un rol definido
      if (!userData.rol) {
        userData.rol = activeTab === "Instructor" ? "instructor" : "general";
      }
      
      await login(userData);
      
      console.log("Usuario logueado correctamente");
      
      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Acceso exitoso',
        text: `Bienvenido ${userData.nombre || ''}`,
        timer: 1500,
        showConfirmButton: false
      });
      
      // Redirección según el tipo de usuario
      if (activeTab === "Instructor") {
        navigate("/PanelInstructor");
      } else {
        navigate("/PanelUser");
      }
    } else {
      setError("La respuesta del servidor no contiene datos de usuario");
      console.error("Respuesta inesperada:", response.data);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La respuesta del servidor no contiene datos de usuario'
      });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Credenciales incorrectas";
    setError(errorMessage);
    console.error("Error de inicio de sesión:", err);
    
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesión',
      text: errorMessage
    });
  }
};

  const renderUserTypeTitle = () => {
    return activeTab === "Instructor" ? "Instructor" : "Usuario Regular";
  };

  const renderUserTypeDescription = () => {
    return activeTab === "Instructor"
      ? "Accede como instructor para gestionar tus cursos"
      : "Accede como usuario para comprar y ver cursos";
  };

  const renderButtonText = () => {
    return activeTab === "Instructor"
      ? "Iniciar sesión como Instructor"
      : "Iniciar sesión";
  };

  const showRegisterLink = activeTab === "General";
  const showForgotPassword = activeTab === "General";

  return (
    <div className={styles.container}>
      <div className={styles.signInBox}>
        <h1 className={styles.title}>Bienvenido de nuevo</h1>
        <p className={styles.subtitle}>
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "General" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("General")}
          >
            General
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "Instructor" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("Instructor")}
          >
            Instructor
          </button>
        </div>

        <div className={styles.userTypeContainer}>
          <h2 className={styles.userType}>{renderUserTypeTitle()}</h2>
          <p className={styles.userTypeDescription}>
            {renderUserTypeDescription()}
          </p>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo electrónico</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.passwordHeader}>
              <label className={styles.label}>Contraseña</label>
              {showForgotPassword && (
                <a href="//" className={styles.forgotPassword}>
                  ¿Olvidaste tu contraseña?
                </a>
              )}
            </div>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.signInButton}>
            {renderButtonText()}
          </button>
        </form>

        {showRegisterLink && (
          <div className={styles.registerContainer}>
            <span>¿No tienes una cuenta? </span>
            <span
              onClick={() => navigate("/register")}
              className={styles.registerLink}
            >
              Regístrate
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;