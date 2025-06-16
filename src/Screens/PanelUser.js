import React, { useState, useEffect } from 'react';
import { Edit, Check, X, Book, User, ShoppingCart } from 'lucide-react';
import styles from './PanelUser.module.css';
import { useUserAuth } from '../context/UserAuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const PanelUsuario = () => {
  const { user, updateUserContext } = useUserAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  // Cursos comprados (simulados)
  const [cursosComprados, setCursosComprados] = useState([
    { id: 1, titulo: 'Matemáticas Básicas', instructor: 'Juan Pérez', progreso: 75, fechaCompra: '10/04/2025' },
    { id: 2, titulo: 'Historia Universal', instructor: 'María García', progreso: 30, fechaCompra: '15/04/2025' },
  ]);

  // Historial de compras - ahora cargado desde la base de datos
  const [historialCompras, setHistorialCompras] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  // Función para formatear fecha de la base de datos a formato de input date
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Función para formatear fecha para mostrar
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (user) {
      const datosIniciales = {
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        fechaNacimiento: formatDateForInput(user.fecha_nacimiento),
        genero: user.genero || '',
      };
      setUserInfo(datosIniciales);
      setTempInfo(datosIniciales);
    }
  }, [user]);

  // Cargar cursos comprados del usuario
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/getCursosComprados/${user.id}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          console.log("Cursos comprados obtenidos:", data);
          setCursosComprados(data.cursos || []);
        })
        .catch(err => console.error('Error al obtener cursos comprados:', err));
    }
  }, [user]);

  // Cargar historial de compras desde getBuyUser
  useEffect(() => {
    const cargarHistorialCompras = async () => {
      if (!user?.id) return;

      setLoadingHistorial(true);
      try {
        const response = await fetch('http://localhost:5000/api/getBuyUser', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error al obtener el historial de compras');
        }

        const data = await response.json();
        console.log("Historial de compras obtenido:", data);

        // Transformar los datos para que coincidan con el formato esperado en la vista
        const historialTransformado = data.map((compra, index) => ({
          id: compra.numero_factura || index + 1,
          curso: compra.nombre_curso,
          fecha: formatDateForDisplay(compra.fecha_creacion),
          monto: parseFloat(compra.precio) || 0
        }));

        setHistorialCompras(historialTransformado);
      } catch (error) {
        console.error('Error al cargar historial de compras:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el historial de compras',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoadingHistorial(false);
      }
    };

    cargarHistorialCompras();
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        // Preparar los datos para enviar al servidor
        const userData = {
          nombre: tempInfo?.nombre || '',
          apellido: tempInfo?.apellido || '',
          email: tempInfo?.email || '',
          fecha_nacimiento: tempInfo?.fechaNacimiento || null, // Enviar como string YYYY-MM-DD o null
          genero: tempInfo?.genero || '',
        };

        console.log("Datos a enviar:", userData);

        const response = await fetch(`http://localhost:5000/api/updateUserProfile/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados',
          text: 'Tu perfil fue actualizado correctamente.',
          confirmButtonColor: '#3085d6',
        });

        // Actualizar el contexto con los nuevos datos
        const updatedUser = { ...user, ...userData };
        updateUserContext(updatedUser);
        setUserInfo({ ...tempInfo });
        setIsEditing(false);
      } catch (error) {
        console.error('Error al actualizar usuario:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ocurrió un error: ${error.message}`,
          confirmButtonColor: '#d33',
        });
      }
    } else {
      setTempInfo({ ...userInfo });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({ ...userInfo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerCurso = (cursoId) => {
    navigate(`/curso/${cursoId}`);
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

      {/* Imagen de perfil centrada */}
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImageWrapper}>
          <img
            src="/samurai_user.jpg"
            alt="Foto de perfil"
            className={styles.profileImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-avatar.png"; // Imagen de respaldo
            }}
          />
        </div>
      </div>

      {/* Separador entre foto y campos */}
      <div className={styles.profileSeparator}></div>

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
              <p>{userInfo.nombre}</p>
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
              <p>{userInfo.apellido}</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Email</label>
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={tempInfo.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userInfo.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Fecha de Nacimiento</label>
            {isEditing ? (
              <input
                type="date"
                name="fechaNacimiento"
                value={tempInfo.fechaNacimiento}
                onChange={handleInputChange}
              />
            ) : (
              <p>{formatDateForDisplay(userInfo.fechaNacimiento)}</p>
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
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p>{userInfo.genero || 'No especificado'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCursosSection = () => (
    <div className={styles.cursosContainer}>
      <div className={styles.sectionHeader}>
        <h2>Mis Cursos</h2>
      </div>
      {cursosComprados.length > 0 ? (
        <div className={styles.cursosGrid}>
          {cursosComprados.map(curso => (
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
                <div className={styles.cursoInstructor}>
                  <User size={16} />
                  <span>{curso.instructor}</span>
                </div>
                <div className={styles.cursoProgreso}>
                  <div className={styles.progresoBar}>
                    <div
                      className={styles.progresoFill}
                      style={{ width: `${curso.progreso || 0}%` }}
                    ></div>
                  </div>
                  <span>{curso.progreso || 0}%</span>
                </div>
              </div>
              <button
                className={styles.actionButton}
                onClick={() => handleVerCurso(curso.id)}
              >
                Continuar Curso
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Book size={64} />
          <p className={styles.emptyMessage}>No has comprado ningún curso todavía.</p>
          <button
            className={styles.actionButton}
            onClick={() => navigate('/cursos')}
          >
            Explorar Cursos
          </button>
        </div>
      )}
    </div>
  );

  const renderHistorialSection = () => (
    <div className={styles.historialContainer}>
      <div className={styles.sectionHeader}>
        <h2>Historial de Compras</h2>
      </div>
      {loadingHistorial ? (
        <div className={styles.loadingState}>
          <p>Cargando historial de compras...</p>
        </div>
      ) : historialCompras.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.historialTable}>
            <thead>
              <tr>
                <th>Número de Factura</th>
                <th>Curso</th>
                <th>Fecha de Compra</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {historialCompras.map((compra, index) => (
                <tr key={compra.id || index}>
                  <td>{compra.id}</td>
                  <td>{compra.curso}</td>
                  <td>{compra.fecha}</td>
                  <td>${compra.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.historialSummary}>
            <span>Total de compras: {historialCompras.length}</span>
            <span>Total gastado: ${historialCompras.reduce((sum, compra) => sum + compra.monto, 0).toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <ShoppingCart size={64} />
          <p className={styles.emptyMessage}>No has realizado ninguna compra todavía.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.panelContainer}>
      <h1 className={styles.panelTitle}>Mi Cuenta</h1>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'perfil' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('perfil')}
        >
          <User size={20} />
          <span>Perfil</span>
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'cursos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cursos')}
        >
          <Book size={20} />
          <span>Mis Cursos</span>
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'historial' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          <ShoppingCart size={20} />
          <span>Historial</span>
        </button>
      </div>

      <div className={styles.contentContainer}>
        {activeTab === 'perfil' && renderPerfilSection()}
        {activeTab === 'cursos' && renderCursosSection()}
        {activeTab === 'historial' && renderHistorialSection()}
      </div>
    </div>
  );
};

export default PanelUsuario;