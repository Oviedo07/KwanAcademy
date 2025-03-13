import { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "masculino",
    email: "",
    contrasena: "",
    id_rol: 2, // Puedes cambiar este valor según corresponda en tu BD
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      setSuccess("Registro exitoso, ahora puedes iniciar sesión.");
      setFormData({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        genero: "masculino",
        email: "",
        contrasena: "",
        id_rol: 2,
      });
    } catch (err) {
      setError("Error al registrar usuario. Verifica los datos.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />

        <select name="genero" value={formData.genero} onChange={handleChange} required>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>

        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
        <input type="password" name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange} required />
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
