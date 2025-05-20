import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto de autenticación para usuarios
const UserAuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserAuth = () => useContext(UserAuthContext);

// Proveedor del contexto de autenticación
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Solo verificamos la sesión con el servidor, ignorando localStorage inicialmente
        const res = await fetch("http://localhost:5000/api/sessionUser", {
          credentials: "include",
        });
  
        const data = await res.json();
        if (data.session) {
          // Solo si hay una sesión activa en el servidor, establecemos el estado
          setUser(data.session);
          setIsAuthenticated(true);
          // Actualizamos localStorage para mantenerlos sincronizados
          localStorage.setItem("user", JSON.stringify(data.session));
        } else {
          // Si no hay sesión en el servidor, limpiamos todo
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
        // En caso de error, también limpiamos los estados
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, []);
  
  // Función para iniciar sesión con los datos correctos
  const login = async (userData) => {
    try {
      console.log("UserAuthContext - Datos recibidos del backend:", userData);

      // IMPORTANTE: Comprueba qué campos recibe realmente
      const availableFields = Object.keys(userData);
      console.log("Campos disponibles en el objeto userData:", availableFields);
      
      // Mapeo de los campos de la base de datos a los del frontend
      const userToStore = {
        id: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        genero: userData.genero,
        estado: userData.estado,
        fecha_creacion: userData.fecha_creacion,
        rol: userData.rol || "usuario"
      };
      
      console.log("UserAuthContext - Datos transformados para almacenar:", userToStore);
      
      setUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userToStore));
      return true;
    } catch (error) {
      console.error("Error al procesar login:", error);
      return false;
    }
  };

  // Función para actualizar el perfil de usuario en el contexto
  const updateUserContext = (updatedUserData) => {
    try {
      console.log("UserAuthContext - Actualizando datos del usuario:", updatedUserData);
      setUser(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      return true;
    } catch (error) {
      console.error("Error al actualizar el contexto del usuario:", error);
      return false;
    }
  };

  // Función mejorada para cerrar sesión
  const logout = async () => {
    try {
      // Primero, llamamos al endpoint del servidor para cerrar la sesión
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Independientemente de la respuesta, limpiamos el estado local
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      
      // Aún si hay error, limpiamos localmente
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      
      return true; // Devolvemos true porque localmente se ha cerrado sesión
    }
  };

  return (
    <UserAuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      updateUserContext
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;