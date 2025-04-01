import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignIn.module.css";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      ? "instructor@kwan.com"
      : "usuario@ejemplo.com";
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmail(getDefaultEmail());
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar inicio de sesión según el apartado correspondiente
    if (activeTab === "General" && email === "instructor@kwan.com") {
      alert("Eres instructor, ve a tu apartado para ingresar.");
      return;
    }

    if (activeTab === "Instructor" && email !== "instructor@kwan.com") {
      alert("Eres usuario general, inicia sesión desde tu apartado.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
        role: activeTab.toLowerCase(),
      });

      const userData = {
        email,
        name: response.data.name || "Usuario",
        role: activeTab.toLowerCase(),
        token: response.data.token,
      };

      login(userData);

      if (activeTab === "Instructor") {
        navigate("/instructor/courses");
      } else {
        navigate("/courses");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error de inicio de sesión:", err);
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
