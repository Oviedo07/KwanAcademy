import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Home, LogOut, ShieldUser, Wallet, ShoppingCart, UsersRound, School, Cog } from 'lucide-react';
import "./css/Sidebar.css";
import "./css/AdminDashboard.css";
import useSidebar from "./utils/FunctionsCenterAdmin";
import AdminManagement from './components/AdminManagement';
import UserManagement from './components/UserManagement';
import InstructorManagement from './components/InstructorManagement';
import CursoManagement from './components/CursoManagement';
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    // Hooks
    const { admin, isAdminAuthenticated, logoutAdmin } = useAdminAuth();
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
            const adminParsed = JSON.parse(adminData);
            console.log("🔎 Sesión verificada en AdminDashboard:", adminParsed);
            console.log("🔎 Datos del admin desde el contexto:", admin);
            console.log("🔎 Nombre del admin:", admin?.nombre, admin?.name, admin?.username);
        } catch (error) {
            console.error("❌ Error al verificar sesión:", error);
            localStorage.removeItem("admin"); // Eliminar dato corrupto
            navigate("/AdminViews/LoginAdmin"); // Redirigir al login
        }
    }, [navigate, admin]);

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
                return < InstructorManagement />
            case 'courses':
                return < CursoManagement />
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
                    <div className="menu-item" onClick={handleLogout}>
                        <LogOut size={20} />
                        {expanded && <span>Cerrar Sesión</span>}
                    </div>
                </div>

                {/* Sección de perfil del administrador */}
                <div className="admin-profile-section">
                    <div 
                        className="admin-profile-container"
                        data-admin-name={admin?.nombre || 'Administrador'}
                    >
                        <div className="admin-avatar">
                            <img
                                src={`${process.env.PUBLIC_URL}/samurai_admin.jpg`}
                                alt="Foto de perfil"
                                className="profile-img"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/50x50/cccccc/666666?text=Admin';
                                }}
                            />
                        </div>
                        {expanded && (
                            <div className="admin-info">
                                <div className="admin-name">
                                    {admin?.nombre || admin?.name || admin?.username || admin?.email || 'Administrador'}
                                </div>
                                <div className="admin-role">
                                    Administrador
                                </div>
                            </div>
                        )}
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