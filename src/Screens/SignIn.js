import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignIn.module.css";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

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
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error de inicio de sesión:", err);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formContainer}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.signInButton}>
            Iniciar Sesión
          </button>
        </form>
        <p className={styles.registerLink}>
          ¿No tienes una cuenta?{' '}
          <span onClick={() => navigate('/register')}>Regístrate aquí</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
