import React, { createContext, useState, useContext, useEffect } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);
export { UserAuthContext };

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sessionUser", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.session) {
          setUser(data.session);
          setIsAuthenticated(true);
          localStorage.setItem("user_app_user", JSON.stringify(data.session));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user_app_user");
        }
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user_app_user");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (userData) => {
    try {
      console.log("AuthContext - Datos recibidos del backend:", userData);
      const userToStore = {
        id: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        fecha_nacimiento: userData.fecha_nacimiento,
        genero: userData.genero,
        email: userData.email,
        id_rol: userData.id_rol || 2,
        fecha_creacion: userData.fecha_creacion,
        estado: userData.estado
      };

      console.log("AuthContext - Datos transformados para almacenar:", userToStore);

      setUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('user_app_user', JSON.stringify(userToStore));
      return true;
    } catch (error) {
      console.error("Error al procesar login:", error);
      return false;
    }
  };

  const updateUserContext = (updatedUserData) => {
    try {
      console.log("AuthContext - Actualizando datos del usuario:", updatedUserData);
      setUser(updatedUserData);
      localStorage.setItem('user_app_user', JSON.stringify(updatedUserData));
      return true;
    } catch (error) {
      console.error("Error al actualizar el contexto del usuario:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user_app_user');
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user_app_user');
      return true;
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
