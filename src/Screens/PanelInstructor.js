// src/components/PanelInstructor.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Edit,
  Check,
  X,
  Plus,
  Book,
  DollarSign,
  User,
} from 'lucide-react';
import styles from './PanelInstructor.module.css';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PanelInstructor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [instructorInfo, setInstructorInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  // ────────────────────────────────────────────────────────────
  // Estados para cursos y ventas
  // ────────────────────────────────────────────────────────────
  const [cursos, setCursos] = useState([
    { id: 1, titulo: 'Tus cursos aquí.', estudiantes: 0, calificacion: 0.0 }
  ]);

  const [ventas, setVentas] = useState([]);
  const [loadingVentas, setLoadingVentas] = useState(false);

  // ────────────────────────────────────────────────────────────
  // Cargar info inicial del usuario
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (user) {
      const datosIniciales = {
        nombre: `${user.primer_nombre} ${user.segundo_nombre || ''}`.trim(),
        apellido: `${user.primer_apellido} ${user.segundo_apellido || ''}`.trim(),
        tipoDocumento: user.tipo_documento || '',
        numeroIdentificacion: user.numero_identificacion || '',
        genero: user.genero || '',
        telefono: user.numero_telefonico || '',
        email: user.email || '',
        ocupacion: user.ocupacion || '',
        contrasena: user.contrasena || '',
        descripcionPerfil: user.descripcion_perfil || '',
        enlaceCertificado: user.enlace_certificado || '',
      };
      setInstructorInfo(datosIniciales);
      setTempInfo(datosIniciales);
    }
  }, [user]);

  // ────────────────────────────────────────────────────────────
  // Cargar cursos reales del backend
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/getCursosByInstructor/${user.id}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCursos(data);
          } else if (data.cursos && Array.isArray(data.cursos)) {
            setCursos(data.cursos);
          }
        })
        .catch((err) => console.error('Error al obtener cursos:', err));
    }
  }, [user]);

  // ────────────────────────────────────────────────────────────
  // Cargar ventas reales del backend
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchVentas = async () => {
      if (user?.id) {
        setLoadingVentas(true);
        try {
          const response = await fetch('http://localhost:5000/api/getSalesInstructor', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener las ventas');
          }

          const data = await response.json();
          setVentas(data);
        } catch (error) {
          console.error('Error al obtener ventas:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las ventas',
            confirmButtonColor: '#d33',
          });
        } finally {
          setLoadingVentas(false);
        }
      }
    };

    fetchVentas();
  }, [user]);

  // ────────────────────────────────────────────────────────────
  // Función para formatear fecha
  // ────────────────────────────────────────────────────────────
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // ────────────────────────────────────────────────────────────
  // Guardar / alternar edición
  // ────────────────────────────────────────────────────────────
  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const nombreParts = (tempInfo.nombre || '').trim().split(' ');
        const apellidoParts = (tempInfo.apellido || '').trim().split(' ');

        const userData = {
          tipo_documento: tempInfo.tipoDocumento || '',
          numero_identificacion: tempInfo.numeroIdentificacion || '',
          primer_nombre: nombreParts[0] || '',
          segundo_nombre: nombreParts.slice(1).join(' ') || '',
          primer_apellido: apellidoParts[0] || '',
          segundo_apellido: apellidoParts.slice(1).join(' ') || '',
          email: user?.email || '',
          contrasena: tempInfo.contrasena || '',
          ocupacion: tempInfo.ocupacion || '',
          descripcion_perfil: tempInfo.descripcionPerfil || '',
          numero_telefonico: tempInfo.telefono || '',
          enlace_certificado: tempInfo.enlaceCertificado || '',
          genero: tempInfo.genero || '',
        };

        const response = await fetch(
          `http://localhost:5000/api/updateInstructor/${user.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar');
        }

        await response.json();

        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados',
          text: 'Tu perfil fue actualizado correctamente.',
          confirmButtonColor: '#3085d6',
        });

        setInstructorInfo({ ...tempInfo });
        setIsEditing(false);
      } catch (error) {
        console.error('Error al actualizar instructor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ocurrió un error: ${error.message}`,
          confirmButtonColor: '#d33',
        });
      }
    } else {
      setTempInfo({ ...instructorInfo });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({ ...instructorInfo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublicarCurso = () => navigate('/FormCourse');
  const handleEditarCurso = () => navigate('/FormCourse#footer');

  // ────────────────────────────────────────────────────────────
  // Secciones UI
  // ────────────────────────────────────────────────────────────
  const renderPerfilSection = () => (
    <div className={styles.perfilContainer}>
      <div className={styles.sectionHeader}>
        <h2>Información Personal</h2>
        {isEditing ? (
          <div className={styles.editButtons}>
            <button className={styles.actionButton} onClick={handleEditToggle}>
              <Check size={20} />
              <span>Guardar</span>
            </button>
            <button className={styles.cancelButton} onClick={handleCancelEdit}>
              <X size={20} />
              <span>Cancelar</span>
            </button>
          </div>
        ) : (
          <button className={styles.actionButton} onClick={handleEditToggle}>
            <Edit size={20} />
            <span>Editar</span>
          </button>
        )}
      </div>

      

      <div className={styles.perfilForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Email</label>
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            {isEditing ? (
              <input
                type="text" // Cambiado a "text" para mostrar el valor real
                name="contrasena"
                value={tempInfo.contrasena}
                onChange={handleInputChange}
              />
            ) : (
              <p>{"•".repeat(instructorInfo.contrasena?.length || 8)}</p> // Mostrar puntos
            )}
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={tempInfo.nombre}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.nombre}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Apellido</label>
            {isEditing ? (
              <input
                type="text"
                name="apellido"
                value={tempInfo.apellido}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.apellido}</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Tipo de Documento</label>
            {isEditing ? (
              <select
                name="tipoDocumento"
                value={tempInfo.tipoDocumento}
                onChange={handleInputChange}
              >
                <option value="CC">Cédula Ciudadanía</option>
                <option value="CE">Cédula Extranjería</option>
                <option value="PPT">Permiso Protección Temporal</option>
                <option value="PS">Pasaporte</option>
              </select>
            ) : (
              <p>{instructorInfo.tipoDocumento}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Número de Documento</label>
            {isEditing ? (
              <input
                type="text"
                name="numeroIdentificacion"  
                value={tempInfo.numeroIdentificacion}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.numeroIdentificacion}</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Género</label>
            {isEditing ? (
              <select
                name="genero"
                value={tempInfo.genero}
                onChange={handleInputChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p>{instructorInfo.genero}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            {isEditing ? (
              <input
                type="text"
                name="telefono"
                value={tempInfo.telefono}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.telefono}</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Ocupación</label>
            {isEditing ? (
              <input
                type="text"
                name="ocupacion"
                value={tempInfo.ocupacion}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.ocupacion}</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Descripción del Perfil</label>
          {isEditing ? (
            <textarea
              name="descripcionPerfil"
              value={tempInfo.descripcionPerfil}
              onChange={handleInputChange}
              rows={4}
            />
          ) : (
            <p>{instructorInfo.descripcionPerfil}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Enlace Certificado</label>
          {isEditing ? (
            <textarea
              name="enlaceCertificado"
              value={tempInfo.enlaceCertificado}
              onChange={handleInputChange}
              rows={4}
            />
          ) : (
            <p>{instructorInfo.enlaceCertificado}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderCursosSection = () => (
    <div className={styles.cursosContainer}>
      <div className={styles.sectionHeader}>
        <h2>Mis Cursos</h2>
        <button className={styles.actionButton} onClick={handlePublicarCurso}>
          <Plus size={20} />
          <span>Publicar Curso</span>
        </button>
      </div>

      {cursos.length > 0 ? (
        <div className={styles.cursosGrid}>
          {cursos.map((curso) => (
            <div key={curso.id} className={styles.cursoCard}>
              {curso.imagen_url ? (
                <img
                  src={curso.imagen_url}
                  alt={curso.nombre || curso.titulo}
                  className={styles.cursoImage}
                />
              ) : (
                <div className={styles.cursoImagePlaceholder}>
                  <Book size={32} />
                </div>
              )}
              <h3>{curso.nombre || curso.titulo}</h3>
              <div className={styles.cursoStats}>
                <div className={styles.cursoPrecio}>
                  ${curso.precio || 0}
                </div>
                <div className={styles.cursoMeta}></div>
              </div>
              <button
                className={styles.secondaryButton}
                onClick={handleEditarCurso}
              >
                Gestionar Curso
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          No has publicado ningún curso todavía.
        </p>
      )}
    </div>
  );

  const renderVentasSection = () => (
    <div className={styles.ventasContainer}>
      <div className={styles.sectionHeader}>
        <h2>Mis Ventas</h2>
      </div>
      
      {loadingVentas ? (
        <div className={styles.loadingMessage}>
          <p>Cargando ventas...</p>
        </div>
      ) : ventas.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.ventasTable}>
            <thead>
              <tr>
                <th>Factura</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.numero_factura}</td>
                  <td>{venta.nombre_curso}</td>
                  <td>{formatearFecha(venta.fecha_creacion)}</td>
                  <td>${parseFloat(venta.precio).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.ventasSummary}>
            <span>Total de ventas: {ventas.length}</span>
            <span>
              Ingresos totales: $
              {ventas
                .reduce((sum, venta) => sum + parseFloat(venta.precio), 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Aún no has realizado ninguna venta.
        </p>
      )}
    </div>
  );

  // ────────────────────────────────────────────────────────────
  // Render principal
  // ────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <div className={styles.panelContainer}>
        <h1 className={styles.panelTitle}>Panel de Instructor</h1>

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'perfil' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('perfil')}
          >
            Perfil
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'cursos' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('cursos')}
          >
            Mis Cursos
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'ventas' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('ventas')}
          >
            Mis Ventas
          </button>
        </div>

        <div className={styles.contentContainer}>
          {activeTab === 'perfil' && renderPerfilSection()}
          {activeTab === 'cursos' && renderCursosSection()}
          {activeTab === 'ventas' && renderVentasSection()}
        </div>
      </div>
    </div>
  );
};

export default PanelInstructor;