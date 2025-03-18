import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "masculino",
    email: "",
    contrasena: "",
    id_rol: 2, // Por defecto, asignamos el rol de usuario
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message || "Registro exitoso");
      navigate("/signin"); // Pinga
    } catch (error) {
      alert("Error al registrar usuario");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Género:</label>
          <select name="genero" value={formData.genero} onChange={handleChange} required>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Contraseña:</label>
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.registerButton}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
