import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sessionInstructor", {
          credentials: "include",
        });
  
        const data = await res.json();
        if (data.session) {
          setUser(data.session);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(data.session));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, []);
  

  // Función para iniciar sesión con los datos correctos
  const login = (userData) => {
    return new Promise((resolve) => {
      try {
        console.log("AuthContext - Datos recibidos del backend:", userData);

        // IMPORTANTE: Comprueba qué campos recibe realmente
        const availableFields = Object.keys(userData);
        console.log("Campos disponibles en el objeto userData:", availableFields);
        
        // Mapeo de los campos de la base de datos a los del frontend
        const userToStore = {
          id: userData.id,
          firstName: userData.nombre || "",
          lastName: "",  // Inicialmente vacío, se llenará con datos del instructor
          email: userData.email || "",
          rol: userData.rol || "instructor",
          // Campos adicionales para instructores
          primer_nombre: userData.nombre || "",
          primer_apellido: userData.primer_apellido || "",
        };
        
        console.log("AuthContext - Datos transformados para almacenar:", userToStore);
        
        setUser(userToStore);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userToStore));
        resolve(true);
      } catch (error) {
        console.error("Error al procesar login:", error);
        resolve(false);
      }
    });
  };

  // Nueva función para actualizar el perfil de usuario en el contexto
  const updateUserContext = (updatedUserData) => {
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

  const logout = () => {
    return new Promise((resolve) => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      resolve(true);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      updateUserContext // Exponemos la nueva función
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
