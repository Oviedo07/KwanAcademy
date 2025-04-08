import React from "react";
import { LogIn, User, KeyRound } from "lucide-react";
import { TbArrowBackUp } from "react-icons/tb";
import "./css/Login.css";
import Swal from 'sweetalert2';
import { useLoginAdmin } from "./utils/FunctionsLoginAdmin";
import {  useNavigate } from "react-router-dom";
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
          showConfirmButton: false,
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            content: 'swal-custom-content'
          }
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
    <div className="login-page">
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header">
            <div className="icon-circle">
              <LogIn size={50} color="#E70014" strokeWidth={1.5} />
            </div>
            <h2 className="login-title">Iniciar Sesión</h2>
            <p className="login-subtitle">Acceso al panel de administración</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <User size={18} style={{ marginRight: '8px' }} />
                Usuario
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
                <KeyRound size={18} style={{ marginRight: '8px' }} />
                Contraseña
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
            <button type="submit" className="btn-back" onClick={() => navigate("/AdminViews/HomeAdmin")}>
              <TbArrowBackUp size={18} className="mr-2" style={{ verticalAlign: 'middle', marginRight: '7px', marginTop: '-5px' }} />
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;