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
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });

      // Usar los datos del usuario de la respuesta
      const userData = {
        email,
        name: response.data.name || "Usuario", // Asumiendo que el backend devuelve el nombre
        token: response.data.token, // Asumiendo que el backend devuelve un token
      };
      
      // Llamar a la función login del contexto
      login(userData);
      
      // Redirigir a la página principal
      navigate("/Courses");
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error de inicio de sesión:", err);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.welcomeTitle}>Bienvenido de nuevo</h1>
        <p className={styles.welcomeSubtitle}>
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        <div className={styles.loginSection}>
          <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
          <p className={styles.loginSubtitle}>
            Accede a tus cursos y materiales de aprendizaje
          </p>

          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="CR7@goat.com"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password">Password</label>
                <span className={styles.forgotPassword}>
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
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
              <span className={styles.signInIcon}>→</span> Iniciar Sesión
            </button>
          </form>
          
          <p className={styles.registerLink}>
            ¿No tienes una cuenta? <span onClick={() => navigate('/register')}>Regístrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
