import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Campos para usuarios regulares
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "masculino",
    email: "",
    contrasena: "",
    id_rol: "", // Se actualizará según el tab activo

    // Campos para instructores
    tipo_documento: "",
    numero_identificacion: "",
    primer_nombre: "", // Campo mapeado desde nombre
    segundo_nombre: "",
    primer_apellido: "", // Campo mapeado desde apellido
    segundo_apellido: "",
    numero_telefonico: "",
    ocupacion: "",
    descripcion_perfil: "",
  });

  const [activeTab, setActiveTab] = useState("General");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para el enlace del certificado
  const [certificateLink, setCertificateLink] = useState("");

  const roleInfo = {
    General: {
      id: 2,
      title: "Usuario Regular",
      description: "Accede como usuario para comprar y ver cursos",
    },
    Instructor: {
      id: 4, // Actualizado según el controlador proporcionado
      title: "Instructor",
      description: "Accede como instructor para gestionar cursos",
    },
  };

  // Establecer el rol inicial
  useState(() => {
    setFormData(prev => ({
      ...prev,
      id_rol: roleInfo[activeTab].id,
    }));
  }, []);

  // Función para validar URL
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Función para manejar el cambio en el enlace del certificado
  const handleCertificateLinkChange = (e) => {
    const value = e.target.value;
    setCertificateLink(value);

    // Validar que sea una URL válida
    if (value && !isValidURL(value)) {
      setErrors(prev => ({
        ...prev,
        enlace_certificado: "Ingresa un enlace válido"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        enlace_certificado: undefined
      }));
    }
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

    // SOLO para usuarios regulares la contraseña es obligatoria
    if (activeTab === "General") {
      if (!formData.contrasena.trim()) {
        newErrors.contrasena = "La contraseña es requerida";
      } else if (formData.contrasena.length < 6) {
        newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
      }
    }

    // Para instructores: validaciones obligatorias
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
      // Mantener sincronizados los campos que se mapean para el instructor
      ...(name === "nombre" ? { primer_nombre: value } : {}),
      ...(name === "apellido" ? { primer_apellido: value } : {}),
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Mostrar modal de éxito con mensaje personalizado
  const showSuccessModal = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Solicitud de registro realizada con éxito!',
      text: 'Pronto nos comunicaremos contigo para activar tu cuenta',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      navigate("/signin");
    });
  };

  // Mostrar notificación de éxito para usuarios generales
  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: message,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Continuar'
    }).then(() => {
      navigate("/signin");
    });
  };

  // Mostrar notificación de error
  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Intentar nuevamente'
    });
  };

  // Enviar datos al backend - FUNCIÓN OPTIMIZADA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let endpoint = "";
      let dataToSend = {};

      if (activeTab === "General") {
        endpoint = "http://localhost:5000/api/register";
        dataToSend = formData;
      } else if (activeTab === "Instructor") {
        endpoint = "http://localhost:5000/api/registerInstructor";
        dataToSend = {
          tipo_documento: formData.tipo_documento,
          numero_identificacion: formData.numero_identificacion,
          primer_nombre: formData.nombre,
          segundo_nombre: formData.segundo_nombre || "",
          primer_apellido: formData.apellido,
          segundo_apellido: formData.segundo_apellido || "",
          genero: formData.genero,
          numero_telefonico: formData.numero_telefonico,
          ocupacion: formData.ocupacion,
          descripcion_perfil: formData.descripcion_perfil,
          email: formData.email,
          contrasena: null, // Siempre null para instructores
          id_rol: formData.id_rol,
          enlace_certificado: certificateLink || null
        };
      }

      console.log('Enviando datos al backend:', dataToSend);

      // Registrar en tu backend
      const response = await axios.post(endpoint, dataToSend);
      console.log('Registro en backend exitoso:', response.data);

      // Mostrar mensaje de éxito
      if (activeTab === "Instructor") {
        showSuccessModal();
      } else {
        showSuccessAlert(response.data.message || "¡Registro exitoso!");
      }

    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message ||
        "Error al registrar. Por favor, inténtalo de nuevo.";
      showErrorAlert(errorMsg);
      console.error("Error en registro:", error.response?.data || error.message);
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

          {/* Campo de contraseña SOLO para usuarios regulares */}
          {activeTab === "General" && (
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
          )}

          {/* Campos adicionales solo para instructores */}
          {activeTab === "Instructor" && (
            <>
              <div className={styles.formField}>
                <label>Tipo de Documento*</label>
                <select
                  name="tipo_documento"
                  value={formData.tipo_documento}
                  onChange={handleChange}
                  className={errors.tipo_documento ? styles.inputError : ""}
                >
                  <option value="">Seleccionar tipo de documento</option>
                  <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
                  <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
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

              {/* Campo para enlace de certificado (solo para instructores) */}
              <div className={styles.formField}>
                <label>Enlace del certificado </label>
                <input
                  type="url"
                  value={certificateLink}
                  onChange={handleCertificateLinkChange}
                  placeholder=""
                  className={errors.enlace_certificado ? styles.inputError : ""}
                />
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Comparte el enlace de tu certificado (ej: Google Drive, Imgur, etc.)
                </small>
                {errors.enlace_certificado && (
                  <span className={styles.errorText}>{errors.enlace_certificado}</span>
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
            {isSubmitting ? "Enviando..." : "Registrarse"}
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