import React, { useState, useEffect, useContext } from 'react';
import { Edit, Check, X, Plus, Book, DollarSign } from 'lucide-react';
import styles from './PanelInstructor.module.css';
import { AuthContext } from '../context/AuthContext'; // Ajusta según tu estructura

const PanelInstructor = () => {
  const { user } = useContext(AuthContext);

  const [instructorInfo, setInstructorInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  // Cursos publicados (simulados)
  const [cursos, setCursos] = useState([
    { id: 1, titulo: 'Matemáticas Avanzadas', estudiantes: 45, calificacion: 4.8 },
    { id: 2, titulo: 'Álgebra Lineal', estudiantes: 32, calificacion: 4.5 },
  ]);

  // Ventas simuladas
  const [ventas, setVentas] = useState([
    { id: 1, curso: 'Matemáticas Avanzadas', fecha: '15/04/2025', monto: 29.99 },
    { id: 2, curso: 'Matemáticas Avanzadas', fecha: '20/04/2025', monto: 29.99 },
    { id: 3, curso: 'Álgebra Lineal', fecha: '22/04/2025', monto: 24.99 },
  ]);

  useEffect(() => {
    if (user) {
      const datosIniciales = {
        nombre: `${user.primer_nombre} ${user.segundo_nombre || ''}`.trim(),
        apellido: `${user.primer_apellido} ${user.segundo_apellido || ''}`.trim(),
        tipoDocumento: user.tipo_documento || '',
        numeroIdentificacion: user.numero_identificacion || '',
        genero: user.genero || '',
        telefono: user.numero_telefonico || '',
        ocupacion: user.ocupacion || '',
        descripcionPerfil: user.descripcion_perfil || '',
      };
      setInstructorInfo(datosIniciales);
      setTempInfo(datosIniciales);
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setInstructorInfo({ ...tempInfo });
    } else {
      setTempInfo({ ...instructorInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({ ...instructorInfo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublicarCurso = () => {
    alert('Redirigiendo a formulario de publicación de curso...');
  };

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
                <option value="CC">Cedula Ciudadania</option>
                <option value="CE">Cedula Extranjeria</option>
                <option value="PPT">Permiso Proteccion Temporal</option>
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
                name="numeroDocumento"
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
          {cursos.map(curso => (
            <div key={curso.id} className={styles.cursoCard}>
              <div className={styles.cursoImagePlaceholder}>
                <Book size={32} />
              </div>
              <h3>{curso.titulo}</h3>
              <div className={styles.cursoStats}>
                <span>{curso.estudiantes} estudiantes</span>
                <span className={styles.cursoRating}>★ {curso.calificacion}</span>
              </div>
              <button className={styles.secondaryButton}>Ver Detalles</button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>No has publicado ningún curso todavía.</p>
      )}
    </div>
  );

  const renderVentasSection = () => (
    <div className={styles.ventasContainer}>
      <div className={styles.sectionHeader}>
        <h2>Mis Ventas</h2>
      </div>
      {ventas.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.ventasTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.curso}</td>
                  <td>{venta.fecha}</td>
                  <td>${venta.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.ventasSummary}>
            <span>Total de ventas: {ventas.length}</span>
            <span>Ingresos totales: ${ventas.reduce((sum, venta) => sum + venta.monto, 0).toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className={styles.emptyMessage}>Aún no has realizado ninguna venta.</p>
      )}
    </div>
  );

  return (
    <div className={styles.panelContainer}>
      <h1 className={styles.panelTitle}>Panel de Instructor</h1>
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'perfil' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('perfil')}
        >
          Perfil
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'cursos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cursos')}
        >
          Mis Cursos
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'ventas' ? styles.activeTab : ''}`}
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
  );
};

export default PanelInstructor;