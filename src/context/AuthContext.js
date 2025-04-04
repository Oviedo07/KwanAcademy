import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al recuperar datos del usuario:", error);
      localStorage.removeItem('user'); // Eliminar datos corruptos
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    return new Promise((resolve) => {
      try {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(true);
      } catch (error) {
        console.error("Error al guardar datos del usuario:", error);
        resolve(false);
      }
    });
  };

  // Función para cerrar sesión
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
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
