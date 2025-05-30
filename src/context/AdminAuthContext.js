  //ADMIN AUTH CONTEXT

  import React, { createContext, useState, useContext, useEffect } from 'react';

  // Crear el contexto de autenticación para administradores
  const AdminAuthContext = createContext();

  // Hook personalizado para usar el contexto de autenticación de administradores
  export const useAdminAuth = () => useContext(AdminAuthContext);

  // Proveedor del contexto de autenticación de administradores
  export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    // Verificar si hay un admin en localStorage al cargar la aplicación
    useEffect(() => {
      try {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
          const parsedAdmin = JSON.parse(storedAdmin);
          setAdmin(parsedAdmin);
          setIsAdminAuthenticated(true);
          console.log("✅ Sesión de administrador recuperada del localStorage");
        }
      } catch (error) {
        console.error("❌ Error al recuperar datos del administrador:", error);
        localStorage.removeItem('admin'); // Eliminar datos corruptos
      }
    }, []);

    // Función para iniciar sesión del administrador
    const loginAdmin = (adminData) => {
      return new Promise((resolve) => {
        try {
          // Guardar en el estado
          setAdmin(adminData);
          setIsAdminAuthenticated(true);
          
          // Guardar en localStorage (asegurar que sea un objeto válido)
          localStorage.setItem('admin', JSON.stringify(adminData));
          console.log("✅ Datos del administrador guardados correctamente");
          resolve(true);
        } catch (error) {
          console.error("❌ Error al guardar datos del administrador:", error);
          resolve(false);
        }
      });
    };

    // Función para cerrar sesión
    const logoutAdmin = () => {
      setAdmin(null);
      setIsAdminAuthenticated(false);
      localStorage.removeItem('admin');
      console.log("🚪 Sesión cerrada correctamente");
    };

    return (
      <AdminAuthContext.Provider value={{ 
        admin, 
        isAdminAuthenticated, 
        loginAdmin, 
        logoutAdmin 
      }}>
        {children}
      </AdminAuthContext.Provider>
    );
  };

  export default AdminAuthContext;