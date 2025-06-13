import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Solo verificamos la sesión con el servidor, ignorando localStorage inicialmente
        const res = await fetch("http://localhost:5000/api/sessionInstructor", {
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
  
  // Función para iniciar sesión
  const login = async (userData) => {
    try {
      console.log("AuthContext - Datos recibidos del backend:", userData);

      const availableFields = Object.keys(userData);
      console.log("Campos disponibles en el objeto userData:", availableFields);
      
      const userToStore = {
        id: userData.id,
        tipo_documento: userData.tipo_documento,
        numero_identificacion: userData.numero_identificacion,
        primer_nombre: userData.primer_nombre,
        segundo_nombre: userData.segundo_nombre,
        primer_apellido: userData.primer_apellido,
        segundo_apellido: userData.segundo_apellido,
        ocupacion: userData.ocupacion,
        email: userData.email,
        contrasena: userData.contrasena, 
        enlace_certificado: userData.enlace_certificado,
        genero: userData.genero,
        descripcion_perfil: userData.descripcion_perfil,
        numero_telefonico: userData.numero_telefonico,
        rol: userData.rol || "instructor"
      };
      
      console.log("AuthContext - Datos transformados para almacenar:", userToStore);
      
      setUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userToStore));
      return true;
    } catch (error) {
      console.error("Error al procesar login:", error);
      return false;
    }
  };

  // Función para actualizar el perfil
  const updateInstructorContext = (updatedUserData) => {
    try {
      console.log("AuthContext - Actualizando datos del usuario:", updatedUserData);
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
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      updateInstructorContext
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;