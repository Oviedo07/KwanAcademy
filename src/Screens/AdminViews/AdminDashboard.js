import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Home, LogOut, ShieldUser, Wallet, ShoppingCart, UsersRound, School, Cog } from 'lucide-react';
import "./css/Sidebar.css";
import "./css/AdminDashboard.css";
import useSidebar from "./utils/FunctionsCenterAdmin";
import AdminManagement from './components/AdminManagement';
import UserManagement from './components/UserManagement';
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const AdminDashboard = () => {
    // Hooks
    const { isAdminAuthenticated, logoutAdmin } = useAdminAuth();
    const { expanded } = useSidebar();
    const [activeComponent, setActiveComponent] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const adminData = localStorage.getItem("admin");
            if (!adminData) {
                console.log("🚫 No hay sesión activa, redirigiendo a Login...");
                navigate("/AdminViews/LoginAdmin");
                return;
            }

            // Verificar que adminData es un JSON válido
            const admin = JSON.parse(adminData);
            console.log("🔎 Sesión verificada en AdminDashboard:", admin);
        } catch (error) {
            console.error("❌ Error al verificar sesión:", error);
            localStorage.removeItem("admin"); // Eliminar dato corrupto
            navigate("/AdminViews/LoginAdmin"); // Redirigir al login
        }
    }, [navigate]);

    // Si no hay autenticación, redirigir al login
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
        return <Navigate to="/AdminViews/LoginAdmin" replace />;
    }

    // Función para manejar los clics en los elementos del menú
    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    // Cierre de sesión
    const handleLogout = () => {
        // Mostrar mensaje de éxito primero
        Swal.fire({
            title: "¡Sesión Cerrada!",
            text: "Has cerrado sesión correctamente",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        // Esperar a que se muestre el mensaje antes de redirigir
        setTimeout(() => {
            logoutAdmin(); // Usar función del contexto para limpiar todo
            navigate("/AdminViews/LoginAdmin"); // Usar navigate para redirección
        }, 2100);
    };
    // Renderizado de componentes
    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'home':
                return <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
                    <h4 className="text-center mb-3">BIENVENIDO AL PANEL DE ADMINISTRACIÓN</h4>
                    <p className="text-center">Selecciona una opción del menú lateral para administrar los diferentes aspectos de la plataforma.</p>
                </div>;
            case 'admins':
                return <AdminManagement />;
            case 'users':
                return <UserManagement />;
            case 'instructors':
                return <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
                    <h4 className="text-center mb-3">GESTIÓN DE INSTRUCTORES</h4>
                    <p>Componente en desarrollo...</p>
                </div>;
            case 'courses':
                return <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
                    <h4 className="text-center mb-3">GESTIÓN DE CURSOS</h4>
                    <p>Componente en desarrollo...</p>
                </div>;
            case 'payments':
                return <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
                    <h4 className="text-center mb-3">GESTIÓN DE PAGOS</h4>
                    <p>Componente en desarrollo...</p>
                </div>;
            case 'support':
                return <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
                    <h4 className="text-center mb-3">SOPORTE TÉCNICO</h4>
                    <p>Componente en desarrollo...</p>
                </div>;
            default:
                return <div>Selecciona una opción del menú</div>;
        }
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className={`sidebar-container ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="app-logo">
                        <img
                            src="https://i.imgur.com/xa8TdxM.png"
                            alt="Logo Kwan Academy"
                            className="logo-img"
                        />
                        <span className="logo-text">KWAN ACADEMY</span>
                    </div>
                </div>



                <div className="sidebar-menu">
                    <div
                        className={`menu-item ${activeComponent === 'home' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('home')}
                    >
                        <Home size={20} />
                        {expanded && <span>Inicio</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'admins' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('admins')}
                    >
                        <ShieldUser size={20} />
                        {expanded && <span>Administradores</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'users' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('users')}
                    >
                        <UsersRound size={20} />
                        {expanded && <span>Usuarios</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'instructors' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('instructors')}
                    >
                        <School size={20} />
                        {expanded && <span>Instructores</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'courses' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('courses')}
                    >
                        <ShoppingCart size={20} />
                        {expanded && <span>Cursos</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'payments' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('payments')}
                    >
                        <Wallet size={20} />
                        {expanded && <span>Pagos</span>}
                    </div>
                    <div
                        className={`menu-item ${activeComponent === 'support' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('support')}
                    >
                        <Cog size={20} />
                        {expanded && <span>Soporte Técnico</span>}
                    </div>
                    <div className="menu-item" onClick={handleLogout}>
                        <LogOut size={20} />
                        {expanded && <span>Cerrar Sesión</span>}
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="content-container">
                {renderActiveComponent()}
            </div>
        </div>
    );
};

export default AdminDashboard;