import { useState } from "react";
import axios from "axios";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });

      alert("Inicio de sesión exitoso");
      console.log(response.data); // Aquí puedes manejar el token o la respuesta
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="SingInBtn"type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default SignIn;
