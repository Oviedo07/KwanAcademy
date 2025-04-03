import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/UserManagement.css"

// Import services from userService
import { 
  getUsuariosActivos,
  getUsuariosInactivos, 
  cambiarUsuarios as toggleUsuarios, 
  desactivarUsuario as toggleEstadoUsuario 
} from '../services/userServices.js';

const UserManagement = () => {
    // State variables
    const [error, setError] = useState(null);
    const [mostrarActivos, setMostrarActivos] = useState(true);
    const [usuariosLista, setUsuariosLista] = useState([]);
    const navigate = useNavigate();

    // Load users on component mount
    useEffect(() => {
        // Initial load of active users
        handleGetUsuariosActivos();
    }, []);

    // Fetch active users
    const handleGetUsuariosActivos = async () => {
        try {
            await getUsuariosActivos(setUsuariosLista);
        } catch (error) {
            console.error("Error al cargar usuarios activos:", error);
            setError("Error al cargar usuarios activos. Por favor, intente de nuevo.");
        }
    };

    // Fetch inactive users
    const handleGetUsuariosInactivos = async () => {
        try {
            await getUsuariosInactivos(setUsuariosLista);
        } catch (error) {
            console.error("Error al cargar usuarios inactivos:", error);
            setError("Error al cargar usuarios inactivos. Por favor, intente de nuevo.");
        }
    };

    // Toggle between active and inactive users
    const handleToggleUsuarios = () => {
        toggleUsuarios(setMostrarActivos, handleGetUsuariosActivos, handleGetUsuariosInactivos);
    };

    // Handle user activation/deactivation
    const handleChangeUserStatus = async (id, nombre, apellido, estadoActual) => {
        try {
            await toggleEstadoUsuario(
                id, 
                nombre, 
                apellido, 
                estadoActual, 
                mostrarActivos ? handleGetUsuariosActivos : handleGetUsuariosInactivos
            );
        } catch (error) {
            console.error("Error al cambiar estado del usuario:", error);
            setError("Error al cambiar el estado del usuario. Por favor, intente de nuevo.");
        }
    };

    return (
        <div className="container-fluid">
    <div className="row">
        {/* Main Content - Cambiado a col-md-12 para usar todo el ancho disponible */}
        <main className="col-md-12 align-items-center justify-content-start mt-4">
            <div className="card p-4 shadow-lg">
                <h4 className="text-center mb-3">GESTIÓN DE USUARIOS</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row mb-3">
                    <div className="col-12">
                        <p>Encuentre todos los usuarios de nuestro sistema</p>
                        <button className="btn btn-warning" onClick={handleToggleUsuarios}>
                            {mostrarActivos ? "Mostrar Usuarios Inactivos" : "Mostrar Usuarios Activos"}
                        </button>           
                    </div>
                </div> 

                {/* Users Table - Mejorada la responsividad */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                            <th style={{ width: '2%' }}>ID</th>
                            <th style={{ width: '5%' }}>Nombre</th>
                            <th style={{ width: '3%' }}>Apellido</th>
                            <th style={{ width: '5%' }}>Género</th>
                            <th style={{ width: '5%' }}>Email</th>
                            <th style={{ width: '5%' }}>Estado</th>
                            <th style={{ width: '5%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosLista.length > 0 ? (
                                usuariosLista.map((usuario, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="text-truncate" title={usuario.nombre}>{usuario.nombre}</td>
                                        <td className="text-truncate" title={usuario.apellido}>{usuario.apellido}</td>
                                        <td>{usuario.genero}</td>
                                        <td className="text-truncate" title={usuario.email}>{usuario.email}</td>
                                        <td>{usuario.estado}</td>
                                        <td>
                                            {/* Botones de acción optimizados */}
                                            <div className="d-flex justify-content-center gap-1">
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${usuario.estado === "activo" ? "btn-danger" : "btn-success"}`}
                                                    onClick={() => handleChangeUserStatus(
                                                        usuario.id, 
                                                        usuario.nombre, 
                                                        usuario.apellido, 
                                                        usuario.estado
                                                    )}
                                                >
                                                    {usuario.estado === "activo" ? "Desactivar" : "Activar"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No hay usuarios disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>
    );
};

export default UserManagement;