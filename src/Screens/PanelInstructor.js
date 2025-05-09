import React, { useState } from 'react';
import { Edit, Check, X, Plus, Book, DollarSign } from 'lucide-react';
import styles from './PanelInstructor.module.css';

const PanelInstructor = () => {
  // Estado para la información personal del instructor
  const [instructorInfo, setInstructorInfo] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    tipoDocumento: 'DNI',
    numeroDocumento: '12345678',
    genero: 'Masculino',
    telefono: '123-456-7890',
    ocupacion: 'Profesor de Matemáticas',
    descripcionPerfil: 'Especialista en matemáticas aplicadas con más de 10 años de experiencia en educación superior.'
  });

  // Estado para manejar la edición
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({...instructorInfo});
  
  // Cursos publicados
  const [cursos, setCursos] = useState([
    { id: 1, titulo: 'Matemáticas Avanzadas', estudiantes: 45, calificacion: 4.8 },
    { id: 2, titulo: 'Álgebra Lineal', estudiantes: 32, calificacion: 4.5 },
  ]);
  
  // Ventas
  const [ventas, setVentas] = useState([
    { id: 1, curso: 'Matemáticas Avanzadas', fecha: '15/04/2025', monto: 29.99 },
    { id: 2, curso: 'Matemáticas Avanzadas', fecha: '20/04/2025', monto: 29.99 },
    { id: 3, curso: 'Álgebra Lineal', fecha: '22/04/2025', monto: 24.99 },
  ]);
  
  // Estado para controlar qué sección se muestra
  const [activeTab, setActiveTab] = useState('perfil');
  
  // Funciones para manejar la edición del perfil
  const handleEditToggle = () => {
    if (isEditing) {
      // Guardar cambios
      setInstructorInfo({...tempInfo});
    } else {
      // Comenzar edición
      setTempInfo({...instructorInfo});
    }
    setIsEditing(!isEditing);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({...instructorInfo});
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Función para publicar nuevo curso (simulada)
  const handlePublicarCurso = () => {
    alert('Redirigiendo a formulario de publicación de curso...');
  };
  
  // Renderiza la sección de información personal
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
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cédula">Cédula</option>
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
                value={tempInfo.numeroDocumento}
                onChange={handleInputChange}
              />
            ) : (
              <p>{instructorInfo.numeroDocumento}</p>
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
  
  // Renderiza la sección de cursos
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
  
  // Renderiza la sección de ventas
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