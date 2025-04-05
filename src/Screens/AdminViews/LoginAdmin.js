import React from "react";
import { LogIn, User, KeyRound } from "lucide-react";
import "./css/Login.css";
import Swal from 'sweetalert2';
import { useLoginAdmin } from "./utils/FunctionsLoginAdmin";
import { Link, useNavigate } from "react-router-dom";
import { signInAdministradores } from "./services/adminService";
import { useAdminAuth } from "../../context/AdminAuthContext";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();
  const { email, setEmail, contrasena, setContrasena, error, setError } = useLoginAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await signInAdministradores(email, contrasena);
      console.log("🔍 Respuesta del servidor:", response);
  
      if (response && response.user) {
        console.log("✅ Usuario autenticado:", response.user);
        
        // Guardar en el contexto y localStorage correctamente
        const adminData = {
          id: response.user.id || "",
          email: response.user.email || email,
          nombre: response.user.nombre || "",
          rol: response.user.rol || "admin"
        };
        
        // Usar el método del contexto para guardar datos
        await loginAdmin(adminData);
        
        console.log("🔐 Sesión guardada:", localStorage.getItem("admin"));

        Swal.fire({
          title: "¡Login Exitoso!",
          html: "<i>¡Bienvenido a nuestro sistema!</i>",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
  
        // Usar navigate en lugar de window.location para mejor manejo de enrutamiento
        setTimeout(() => {
          console.log("🔀 Redirigiendo a AdminDashboard...");
          navigate("/AdminViews/AdminDashboard");
        }, 2100);
      } else {
        Swal.fire({
          title: "Error",
          text: "Credenciales incorrectas",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      setError(error.message || "Error al iniciar sesión");
      
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar sesión. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <nav className="nav">
        <div className="logo-container">
          <Link to="/AdminViews/HomeAdmin" className="login-btn" size={20}>
            Home
          </Link>
        </div>
      </nav>  

      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header">
            <LogIn size={60} color="#FA812F" strokeWidth={1.5} className="mx-auto mb-4" />
            <h2 className="login-title">Iniciar Sesión</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                <User size={20} className="inline-block mr-2" /> Usuario
              </label>
              <input 
                type="text" 
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu email"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <KeyRound size={20} className="inline-block mr-2" /> Contraseña
              </label>
              <input 
                type="password" 
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default LoginAdmin;