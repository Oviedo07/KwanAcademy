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
    id_rol: 2, // Por defecto, usuario regular
    tipo_documento: "",
    numero_identificacion: "",
    segundo_nombre: "",
    segundo_apellido: "",
    numero_telefonico: "",
    ocupacion: "",
    descripcion_perfil: "",
  });

  const [activeTab, setActiveTab] = useState("General");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleInfo = {
    General: {
      id: 2,
      title: "Usuario Regular",
      description: "Accede como usuario para comprar y ver cursos",
    },
    Instructor: {
      id: 3,
      title: "Instructor",
      description: "Accede como instructor para gestionar cursos",
    },
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.fecha_nacimiento) newErrors.fecha_nacimiento = "La fecha de nacimiento es requerida";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida";
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }

    if (activeTab === "Instructor") {
      if (!formData.tipo_documento.trim()) newErrors.tipo_documento = "El tipo de documento es requerido";
      if (!formData.numero_identificacion.trim()) newErrors.numero_identificacion = "El número de identificación es requerido";
      if (!formData.numero_telefonico.trim()) newErrors.numero_telefonico = "El número telefónico es requerido";
      if (!formData.ocupacion.trim()) newErrors.ocupacion = "La ocupación es requerida";
      if (!formData.descripcion_perfil.trim()) newErrors.descripcion_perfil = "La descripción del perfil es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cambiar el tab y actualizar el rol del usuario
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      id_rol: roleInfo[tab].id,
    }));
    setErrors({}); // Limpiar errores al cambiar de pestaña
  };

  // Captura cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message || "¡Registro exitoso! Redirigiendo...");
      navigate("/signin");
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      "Error al registrar usuario. Por favor, inténtalo de nuevo.";
      alert(errorMsg);
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.registerContainer}>
        <h1 className={styles.welcomeTitle}>Crear nueva cuenta</h1>
        <p className={styles.welcomeSubtitle}>
          Ingresa tus datos para registrarte en la plataforma
        </p>

        {/* Pestañas de Usuario / Instructor */}
        <div className={styles.tabsContainer}>
          {Object.keys(roleInfo).map((tab) => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className={styles.userTypeContainer}>
          <h2 className={styles.userTypeTitle}>{roleInfo[activeTab].title}</h2>
          <p className={styles.userTypeDescription}>{roleInfo[activeTab].description}</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campos generales */}
          <div className={styles.formField}>
            <label>Nombre*</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? styles.inputError : ""}
            />
            {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
          </div>

          <div className={styles.formField}>
            <label>Apellido*</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={errors.apellido ? styles.inputError : ""}
            />
            {errors.apellido && <span className={styles.errorText}>{errors.apellido}</span>}
          </div>

          <div className={styles.formField}>
            <label>Fecha de Nacimiento*</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className={errors.fecha_nacimiento ? styles.inputError : ""}
            />
            {errors.fecha_nacimiento && (
              <span className={styles.errorText}>{errors.fecha_nacimiento}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label>Género*</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label>Correo electrónico*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formField}>
            <label>Contraseña*</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={errors.contrasena ? styles.inputError : ""}
            />
            {errors.contrasena && (
              <span className={styles.errorText}>{errors.contrasena}</span>
            )}
          </div>

          {/* Campos adicionales solo para instructores */}
          {activeTab === "Instructor" && (
            <>
              <div className={styles.formField}>
                <label>Tipo de Documento*</label>
                <input
                  type="text"
                  name="tipo_documento"
                  value={formData.tipo_documento}
                  onChange={handleChange}
                  className={errors.tipo_documento ? styles.inputError : ""}
                />
                {errors.tipo_documento && (
                  <span className={styles.errorText}>{errors.tipo_documento}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label>Número de Identificación*</label>
                <input
                  type="text"
                  name="numero_identificacion"
                  value={formData.numero_identificacion}
                  onChange={handleChange}
                  className={errors.numero_identificacion ? styles.inputError : ""}
                />
                {errors.numero_identificacion && (
                  <span className={styles.errorText}>{errors.numero_identificacion}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label>Número Telefónico*</label>
                <input
                  type="text"
                  name="numero_telefonico"
                  value={formData.numero_telefonico}
                  onChange={handleChange}
                  className={errors.numero_telefonico ? styles.inputError : ""}
                />
                {errors.numero_telefonico && (
                  <span className={styles.errorText}>{errors.numero_telefonico}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label>Ocupación*</label>
                <input
                  type="text"
                  name="ocupacion"
                  value={formData.ocupacion}
                  onChange={handleChange}
                  className={errors.ocupacion ? styles.inputError : ""}
                />
                {errors.ocupacion && (
                  <span className={styles.errorText}>{errors.ocupacion}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label>Descripción del Perfil*</label>
                <textarea
                  name="descripcion_perfil"
                  value={formData.descripcion_perfil}
                  onChange={handleChange}
                  className={errors.descripcion_perfil ? styles.inputError : ""}
                />
                {errors.descripcion_perfil && (
                  <span className={styles.errorText}>{errors.descripcion_perfil}</span>
                )}
              </div>
            </>
          )}

          {/* Botón de registro */}
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Enlace para iniciar sesión */}
        <p className={styles.signInLink}>
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => navigate("/signin")}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default Register;