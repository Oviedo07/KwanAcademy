import React, { useState, useEffect } from "react";
import styles from "./Data.module.css";
import { updateUserProfile } from "./AdminViews/services/userServices";
import { useAuth } from "../context/AuthContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaEdit, 
  FaSave, 
  FaTimes 
} from "react-icons/fa";

const Data = () => {
  const { user, updateUserContext } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: ""
  });

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "", // Por seguridad, no mostrar la contraseña
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
        gender: user.gender || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      if (!userId) {
        alert("No se encontró el ID del usuario.");
        setIsLoading(false);
        return;
      }

      // Mapear los campos del formulario a los campos esperados por la API
      const updatedData = {
        nombre: userData.firstName,
        apellido: userData.lastName,
        email: userData.email,
        // Solo incluir contraseña si se ha modificado
        ...(userData.password && { contrasena: userData.password }),
        fecha_nacimiento: userData.birthDate,
        genero: userData.gender
      };
      
      console.log("Enviando actualización:", updatedData);
      
      // Llamar al servicio para actualizar los datos
      const response = await updateUserProfile(userId, updatedData);
      console.log("Respuesta de la API:", response);
      
      if (response.success) {
        // Actualizar el contexto del usuario
        if (typeof updateUserContext === 'function') {
          const updatedUserContext = {
            ...user,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            birthDate: userData.birthDate,
            gender: userData.gender
          };
          
          updateUserContext(updatedUserContext);
          console.log("Contexto del usuario actualizado:", updatedUserContext);
        } else {
          console.error("La función updateUserContext no está disponible");
        }
        
        setIsEditing(false);
        alert("Datos actualizados correctamente.");
      } else {
        alert("Error al actualizar los datos: " + (response.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al actualizar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para formatear la fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <img src="https://imgur.com/vnUR4HS.jpg" alt="Profile" className={styles.profileImage} />
        <h1 className={styles.profileName}>{userData.firstName}</h1>
        <p className={styles.profileUsername}>{userData.lastName}</p>
      </div>

      <div className={styles.buttonContainer}>
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              className={styles.saveButton} 
              disabled={isLoading}
            >
              <FaSave /> {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className={styles.cancelButton}
              disabled={isLoading}
            >
              <FaTimes /> Cancelar
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            <FaEdit /> Editar perfil
          </button>
        )}
      </div>

      <div className={styles.socialLinks}>
        {[
          { field: "Nombre", name: "firstName", icon: <FaUser />, type: "text" },
          { field: "Apellido", name: "lastName", icon: <FaUser />, type: "text" },
          { field: "Email", name: "email", icon: <FaEnvelope />, type: "email" },
          { field: "Contraseña", name: "password", icon: <FaLock />, type: "password" },
          { field: "Fecha de nacimiento", name: "birthDate", icon: <FaBirthdayCake />, type: "date" },
          { field: "Género", name: "gender", icon: <FaVenusMars />, type: "select", options: ["Masculino", "Femenino", "Otro", "Prefiero no decir"] }
        ].map((field, index) => (
          <div key={index} className={styles.socialLink}>
            <span className={styles.socialIcon}>{field.icon}</span>
            {isEditing ? (
              field.type === "select" ? (
                <select 
                  name={field.name} 
                  value={userData[field.name]} 
                  onChange={handleInputChange} 
                  className={styles.socialInput}
                  disabled={isLoading}
                >
                  <option value="">Seleccionar</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type} 
                  name={field.name} 
                  value={userData[field.name]} 
                  onChange={handleInputChange} 
                  className={styles.socialInput} 
                  disabled={isLoading}
                />
              )
            ) : (
              <span className={styles.socialText}>
                {field.type === "password" ? "••••••••" : 
                 field.name === "birthDate" ? formatDate(userData[field.name]) : 
                 userData[field.name]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;