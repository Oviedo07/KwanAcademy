import React, { useState, useEffect } from 'react';
import { getSummaryInstructor, getPendingInstructors, assignPasswordToInstructor } from '../services/instructorService.js';
import { Search, Eye, Key, ExternalLink, Users, Clock, CheckCircle } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const InstructorManagement = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [instructores, setInstructores] = useState([]);
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [filteredPending, setFilteredPending] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'summary') {
      cargarInstructores();
    } else if (activeTab === 'pending') {
      cargarInstructoresPendientes();
    }
  }, [activeTab]);

  useEffect(() => {
    // Filtrar instructores pendientes por término de búsqueda
    if (searchTerm.trim() === '') {
      setFilteredPending(pendingInstructors);
    } else {
      const filtered = pendingInstructors.filter(instructor => 
        instructor.primer_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPending(filtered);
    }
  }, [searchTerm, pendingInstructors]);

  const cargarInstructores = async () => {
    setLoading(true);
    const data = await getSummaryInstructor();
    setInstructores(data);
    setLoading(false);
  };

  const cargarInstructoresPendientes = async () => {
    setLoading(true);
    const data = await getPendingInstructors();
    setPendingInstructors(data);
    setFilteredPending(data);
    setLoading(false);
  };

  const handleAssignPassword = async (instructor) => {
    const { value: tempPassword } = await Swal.fire({
      title: `Asignar contraseña temporal`,
      html: `
        <div class="text-start mb-3">
          <strong>Instructor:</strong> ${instructor.primer_nombre} ${instructor.primer_apellido}<br>
          <strong>Email:</strong> ${instructor.email}
        </div>
        <p class="text-muted small text-start">La contraseña debe tener al menos 6 caracteres</p>
      `,
      input: 'password',
      inputLabel: 'Contraseña temporal',
      inputPlaceholder: 'Ingresa una contraseña temporal...',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
        minlength: 6
      },
      showCancelButton: true,
      confirmButtonText: 'Asignar Contraseña',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar una contraseña'
        }
        if (value.length < 6) {
          return 'La contraseña debe tener al menos 6 caracteres'
        }
      }
    });

    if (tempPassword) {
      const success = await assignPasswordToInstructor(instructor.id, tempPassword);
      if (success) {
        // Recargar la lista de instructores pendientes
        cargarInstructoresPendientes();
      }
    }
  };

  const handleViewCertificate = (enlaceCertificado) => {
    if (enlaceCertificado && enlaceCertificado.trim() !== '') {
      window.open(enlaceCertificado, '_blank');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Certificado no disponible',
        text: 'Este instructor no ha proporcionado un enlace de certificado válido',
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFullName = (instructor) => {
    const nombres = [instructor.primer_nombre, instructor.segundo_nombre].filter(Boolean).join(' ');
    const apellidos = [instructor.primer_apellido, instructor.segundo_apellido].filter(Boolean).join(' ');
    return `${nombres} ${apellidos}`.trim();
  };

  return (
    <div className="container-fluid">
      <main className="col-md-12 align-items-center justify-content-start mt-4">
        <div className="card shadow-lg">
          {/* Navegación por pestañas */}
          <div className="card-header bg">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`}
                  onClick={() => setActiveTab('summary')}
                  
                >
                  <Users size={18} className="me-2 " />
                  Resumen Instructores
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'pending' ? 'active' : ''} position-relative`}
                  onClick={() => setActiveTab('pending')}
                >
                  <Clock size={18} className="me-2 text-dark" />
                  Solicitudes Pendientes 
                  {pendingInstructors.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                      {pendingInstructors.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* Contenido de Resumen de Instructores */}
            {activeTab === 'summary' && (
              <>
                <h4 className="text-center mb-4">
                  <Users size={24} className="me-2" />
                  RESUMEN DE INSTRUCTORES
                </h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <p className="text-muted text-center mb-4">
                  Visualiza cuántos cursos y ventas tiene cada instructor registrado en la plataforma.
                </p>

                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover text-center">
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: '5%' }}>#</th>
                          <th style={{ width: '20%' }}>Nombre Instructor</th>
                          <th style={{ width: '20%' }}>Apellido Instructor</th>
                          <th style={{ width: '15%' }}>Cursos Publicados</th>
                          <th style={{ width: '15%' }}>Cantidad Ventas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instructores.length > 0 ? (
                          instructores.map((inst, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{inst.primer_nombre}</td>
                              <td>{inst.primer_apellido}</td>
                              <td>
                                <span className="badge bg-transparent text-dark">{inst.cantidad_cursos}</span>
                              </td>
                              <td>
                                <span className="badge bg-transparent text-dark">{inst.total_ventas}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-muted">No hay instructores disponibles</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Contenido de Solicitudes Pendientes */}
            {activeTab === 'pending' && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">
                    <Clock size={24} className="me-2" />
                    SOLICITUDES PENDIENTES
                  </h4>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-warning text-dark fs-6">
                      {filteredPending.length} solicitudes
                    </span>
                  </div>
                </div>

                <p className="text-muted text-center mb-4">
                  Gestiona las solicitudes de registro de nuevos instructores. Revisa sus certificados y asigna contraseñas temporales.
                </p>

                {/* Buscador */}
                <div className="row mb-4">
                  <div className="col-md-6 offset-md-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Search size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre, apellido o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: '5%' }}>#</th>
                          <th style={{ width: '25%' }}>Nombre Completo</th>
                          <th style={{ width: '25%' }}>Email</th>
                          <th style={{ width: '15%' }}>Fecha Registro</th>
                          <th style={{ width: '15%' }}>Certificado</th>
                          <th style={{ width: '15%' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPending.length > 0 ? (
                          filteredPending.map((instructor, index) => (
                            <tr key={instructor.id}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="fw-bold">{getFullName(instructor)}</div>
                              </td>
                              <td>
                                <span className="text-primary">{instructor.email}</span>
                              </td>
                              <td>
                                <small className="text-muted">
                                  {formatDate(instructor.fecha_registro)}
                                </small>
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-info btn-sm"
                                  onClick={() => handleViewCertificate(instructor.enlace_certificado)}
                                  title="Ver certificado"
                                >
                                  <ExternalLink size={16} className="me-1" />
                                  Ver
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleAssignPassword(instructor)}
                                  title="Asignar contraseña temporal"
                                >
                                  <Key size={16} className="me-1" />
                                  Asignar
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-muted text-center py-4">
                              {searchTerm ? 
                                'No se encontraron instructores que coincidan con la búsqueda' : 
                                'No hay solicitudes pendientes en este momento'
                              }
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Información adicional */}
                {filteredPending.length > 0 && (
                  <div className="alert alert-info mt-4">
                    <CheckCircle size={18} className="me-2" />
                    <strong>Instrucciones:</strong>
                    <ul className="mb-0 mt-2">
                      <li>Revisa el certificado de cada instructor antes de aprobar su solicitud</li>
                      <li>Asigna una contraseña temporal segura (mínimo 6 caracteres)</li>
                      <li>El instructor podrá iniciar sesión con esta contraseña temporal</li>
                      <li>Recomienda al instructor cambiar su contraseña en el primer acceso</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorManagement;