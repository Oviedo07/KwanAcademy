import React, { useEffect, useState } from 'react';
import { getAdministradores, addAdministrador, encasillarAdministrador, updateAdministrador, Delete } from "../services/adminService";

const AdminManagement = () => {
    const [editar, setEditar] = useState(null);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState("");
    const [error, setError] = useState(null);
    const [administradoresLista, setAdministradores] = useState([]);

    // Cargar administradores al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAdministradores();
                setAdministradores(data);
            } catch (error) {
                console.error("Error al cargar administradores:", error);
            }
        };
        
        fetchData();
    }, []);

    // Importación Añadir Administradores
    const handleAdd = async (e) => {
        e.preventDefault();
        await addAdministrador(
            nombre,
            apellido,
            email,
            contrasena,
            telefono,
            rol,
            setError,
            getAdministradores
        );
        const nuevosAdministradores = await getAdministradores();
        setAdministradores(nuevosAdministradores);
        
        // Limpiar campos después de la adición
        limpiarCampos();
    };

    // Limpiar Inputs Administradores
    const limpiarCampos = () => {
        setNombre("");
        setApellido("");
        setEmail("");
        setContrasena("");
        setTelefono("");
        setRol("");
        setEditar(false); 
    };

    return (
        <div className="card p-4 shadow-lg" style={{ width: "100%" }}>
            <h4 className="text-center mb-3">GESTIÓN DE ADMINISTRADORES</h4>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Formulario */}
            <form className="mb-4" onSubmit={handleAdd}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Apellido:</label>
                        <input type="text" className="form-control" value={apellido} 
                            onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email_register" 
                            autoComplete="new-email"/>
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Contraseña:</label>
                        <input type="password" className="form-control" value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            name="password_register" 
                            autoComplete="new-password" required />
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Teléfono:</label>
                        <input type="tel" className="form-control" value={telefono}
                            onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label">Rol:</label>
                        <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="">Seleccione un rol</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                            <option value="Soporte">Soporte</option>
                        </select>
                    </div>
                </div>
                <div>
                    {
                        editar ?
                        <div className="d-flex flex-column align-items-center gap-3">
                            <button className="btn btn-warning w-100" 
                                onClick={(e) => updateAdministrador(
                                    e,
                                    { id, nombre, apellido, email, contrasena, telefono, rol }, 
                                    { setError, getAdministradores, setEditar, limpiarCampos },
                                    setAdministradores,
                                    administradoresLista
                                )}>
                                Actualizar
                            </button>
                            <button className="btn btn-danger w-100" onClick={limpiarCampos}>Cancelar</button>
                        </div>
                        :  
                        <button type="submit" className="btn btn-success w-100 mt-3">Registrar</button>
                    }
                </div>
            </form>  

            {/* Tabla de Administradores */}
            <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradoresLista.length > 0 ? (
                            administradoresLista.map((admin, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{admin.nombre}</td>
                                    <td>{admin.apellido}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.telefono}</td>
                                    <td>{admin.rol}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button 
                                                onClick={() => encasillarAdministrador(
                                                    admin, setEditar, 
                                                    setNombre, setApellido, 
                                                    setEmail, setContrasena, 
                                                    setTelefono, setRol, 
                                                    setId
                                                )}
                                                className="btn btn-warning"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => Delete(admin, setAdministradores, getAdministradores)} 
                                                className="btn btn-danger"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Cargando administradores...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManagement;