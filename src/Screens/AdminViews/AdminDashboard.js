import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Home, LogOut, ShieldUser, Wallet, ShoppingCart, UsersRound, School, Cog } from 'lucide-react';
import "./css/Sidebar.css";
import "./css/AdminDashboard.css";
import useSidebar from "./utils/FunctionsCenterAdmin";
import AdminManagement from './components/AdminManagement';
import UserManagement from './components/UserManagement';

const AdminDashboard = () => {
    // Constantes de componente sidebar
    const { expanded } = useSidebar();
    
    // Estado para controlar qué componente mostrar
    const [activeComponent, setActiveComponent] = useState('home');

    // Función para manejar los clics en los elementos del menú
    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    // Función para renderizar el componente activo
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
            {/* Sidebar integrado directamente */}
            <div className={`sidebar-container ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="app-logo">
                        <div className="logo-text">Panel Administración</div>
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
                    <div className="menu-item">
                        <LogOut size={20} />
                        {expanded && <span>Cerrar Sesión</span>}
                    </div>
                </div>
            </div>
            
            {/* Área de contenido dinámico */}
            <div className="content-container">
                {renderActiveComponent()}
            </div>
        </div>
    );
};

export default AdminDashboard;