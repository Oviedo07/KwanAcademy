import React from "react";
import axios from "axios";
import { LogIn, User, KeyRound,  Mail, Phone } from "lucide-react";
import "./css/Login.css"; // Enlace al CSS
import Swal from 'sweetalert2';
import { useLoginAdmin, colors } from "./utils/FunctionsLoginAdmin";
import { Link } from "react-router-dom";

// ---------------------- Logica Back --------------------------  
const LoginAdmin = () => {

    const { email, setEmail, contrasena, setContrasena, error, setError, navigate } = useLoginAdmin();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", email, "Contrasena:", contrasena);
    
        try {
          const response = await axios.post("http://localhost:5000/login", 
            { email, contrasena }, 
            { withCredentials: true } // 🔹 NECESARIO PARA SESIONES
          );
    
          Swal.fire({
            title: "Loguin Exitoso!",
            html: "<i>!Bienvenido a nuestro sistema¡</i>",
            icon: "success",
            draggable: true,
            timer: 2000
          });
    
        setTimeout(() => {
          navigate("/Center");
        }, 2000);
           
        } catch (error) {
          setError(error.response?.data?.error || "Error al iniciar sesión");
        }
      };

  return (
       <div>
        <nav className="nav">
            <div className="logo-container">
                <Link to="/AdminViews/HomeAdmin" className="login-btn" size={20} >
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
        <section id="contacto" className="contact-section">
        <h2>Contáctanos</h2>
        <div className="contact-info">
          <p><Mail className="contact-icon" /> contacto@kwanacademy.com</p>
          <p><Phone className="contact-icon" /> +123 456 7890</p>
        </div>
      </section>

      <footer className="site-footer">
        <p>&copy; 2025 KwanAcademy. Todos los derechos reservados.</p>
      </footer>
      </div>
    </div> 
  );
};

export default LoginAdmin;