import React, { useState, useEffect } from 'react';
import { Edit, Check, X, Book, User, ShoppingCart, ExternalLink, Globe, Lock, UserX, AlertTriangle } from 'lucide-react';
import styles from './PanelUser.module.css';
import { useUserAuth } from '../context/UserAuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const PanelUsuario = () => {
  const { user, updateUserContext, logout } = useUserAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  // Estados para cursos comprados
  const [cursosComprados, setCursosComprados] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);

  // Estados para modal de acceso al curso
  const [modalAccesoOpen, setModalAccesoOpen] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

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
        contrasena: user.contrasena || '',
      };
      setUserInfo(datosIniciales);
      setTempInfo(datosIniciales);
    }
  }, [user]);

  // Cargar cursos comprados del usuario
  useEffect(() => {
    const cargarCursosComprados = async () => {
      if (!user?.id) return;

      setLoadingCursos(true);
      try {
        const response = await fetch('http://localhost:5000/api/getPurchasedCourses', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error al obtener cursos comprados');
        }

        const data = await response.json();
        console.log("Cursos comprados obtenidos:", data);
        setCursosComprados(data.cursos || []);
      } catch (err) {
        console.error('Error al obtener cursos comprados:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los cursos comprados',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoadingCursos(false);
      }
    };

    cargarCursosComprados();
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
          contrasena: tempInfo?.contrasena || '',
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

  // Función para desactivar cuenta
  const handleDesactivarCuenta = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Al desactivar tu cuenta no podrás acceder a tus cursos ni realizar nuevas compras. Esta acción puede ser reversible contactando al soporte.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Segunda confirmación
      const confirmResult = await Swal.fire({
        title: 'Confirmación final',
        text: 'Escribe "DESACTIVAR" para confirmar que deseas desactivar tu cuenta',
        input: 'text',
        inputPlaceholder: 'Escribe DESACTIVAR',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Desactivar cuenta',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (value !== 'DESACTIVAR') {
            return 'Debes escribir exactamente "DESACTIVAR"'
          }
        }
      });

      if (confirmResult.isConfirmed) {
        try {
          // 1. Desactivar la cuenta en la base de datos
          const response = await fetch('http://localhost:5000/api/updateStatusUsuarios', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              id: user.id,
              estado: 'inactivo'
            }),
          });

          if (!response.ok) {
            throw new Error('Error al desactivar la cuenta');
          }

          // 2. Cerrar sesión en el servidor
          await fetch('http://localhost:5000/api/sessionUser', {
            method: 'DELETE',
            credentials: 'include',
          });

          // 3. Limpiar localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('user_app_user');

          await Swal.fire({
            icon: 'success',
            title: 'Cuenta desactivada',
            text: 'Tu cuenta ha sido desactivada exitosamente. Serás redirigido al inicio.',
            confirmButtonColor: '#3085d6',
            timer: 3000,
            timerProgressBar: true
          });

          // 4. Cerrar sesión en el contexto y redirigir
          logout();
          window.location.href = '/';

        } catch (error) {
          console.error('Error al desactivar cuenta:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo desactivar la cuenta. Inténtalo de nuevo.',
            confirmButtonColor: '#d33',
          });
        }
      }
    }
  };

  // Función para abrir el modal de acceso al curso
  const handleAccederCurso = (curso) => {
    setCursoSeleccionado(curso);
    setModalAccesoOpen(true);
  };

  // Función para ir al curso desde el modal con actualización de progreso
  const handleIrAlCursoConSwal = () => {
    if (!cursoSeleccionado) return;

    // Verificar si el curso tiene enlace válido
    if (cursoSeleccionado.enlace_curso &&
      cursoSeleccionado.enlace_curso.trim() !== '' &&
      cursoSeleccionado.enlace_curso !== null) {

      // Calcular nuevo progreso (incremento de 10% cada vez, máximo 100%)
      const progresoActual = cursoSeleccionado.progreso || 10;
      const incremento = 10;
      const nuevoProgreso = Math.min(progresoActual + incremento, 100);

      // Actualizar el estado local inmediatamente
      setCursosComprados(prevCursos => 
        prevCursos.map(curso => 
          curso.id === cursoSeleccionado.id 
            ? { ...curso, progreso: nuevoProgreso }
            : curso
        )
      );

      // Actualizar también el curso seleccionado para el modal
      setCursoSeleccionado(prevCurso => ({
        ...prevCurso,
        progreso: nuevoProgreso
      }));

      // Mostrar mensaje de progreso actualizado
      if (nuevoProgreso === 100) {
        Swal.fire({
          title: '¡Felicitaciones!',
          text: 'Has completado el 100% del curso',
          icon: 'success',
          confirmButtonColor: '#E70014',
          confirmButtonText: 'Continuar'
        });
      } else {
        Swal.fire({
          title: 'Progreso actualizado',
          text: `Tu progreso en el curso es ahora del ${nuevoProgreso}%`,
          icon: 'info',
          confirmButtonColor: '#E70014',
          confirmButtonText: 'Continuar',
          timer: 2000,
          timerProgressBar: true
        });
      }

      // Abrir el enlace del curso
      window.open(cursoSeleccionado.enlace_curso, '_blank');
      setModalAccesoOpen(false);

    } else {
      Swal.fire({
        title: 'Enlace no disponible',
        text: 'Este curso no tiene un enlace válido configurado.',
        icon: 'warning',
        confirmButtonColor: '#E70014',
        confirmButtonText: 'Entendido'
      });
      setModalAccesoOpen(false);
    }
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
            <label>Contraseña</label>
            {isEditing ? (
              <input
                type="password"
                name="contrasena"
                value={tempInfo.contrasena}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
              />
            ) : (
              <p>••••••••</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
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

      {/* Sección de Gestión de Cuenta */}
      <div className={styles.cuentaGestionContainer}>
        <div className={styles.sectionHeader}>
          <h2>Gestión de Cuenta</h2>
        </div>

        <div className={styles.cuentaActions}>
          <div className={styles.warningSection}>
            <div className={styles.warningCard}>
              <AlertTriangle size={24} className={styles.warningIcon} />
              <div className={styles.warningContent}>
                <h3>Zona de Peligro</h3>
                <p>Una vez que desactives tu cuenta, perderás el acceso a todos tus cursos y no podrás realizar nuevas compras. Esta acción puede requerir contactar al soporte para ser revertida.</p>
              </div>
            </div>

            <button
              className={styles.dangerButton}
              onClick={handleDesactivarCuenta}
            >
              <UserX size={20} />
              <span>Desactivar mi cuenta</span>
            </button>
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
      {loadingCursos ? (
        <div className={styles.loadingState}>
          <p>Cargando cursos...</p>
        </div>
      ) : cursosComprados.length > 0 ? (
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
              <div className={styles.cursoActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleAccederCurso(curso)}
                >
                  <ExternalLink size={16} />
                  Ir al Curso
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Book size={64} />
          <p className={styles.emptyMessage}>No has comprado ningún curso todavía.</p>
          <button
            className={styles.actionButton}
            onClick={() => navigate('/courses')}
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

      {/* Modal de acceso al curso - Estructura adaptada */}
      {modalAccesoOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Botón de cerrar posicionado absolutamente */}
            <button
              onClick={() => setModalAccesoOpen(false)}
              className={styles.closeButton}
            >
              <X size={20} />
            </button>

            {cursoSeleccionado && (
              <div className={styles.modalBody}>
                {/* Imagen con badge superpuesto */}
                <div style={{ position: 'relative' }}>
                  {/* Badge de categoría */}
                  <div className={styles.modalCategory}>
                    DEFENSA PERSONAL
                  </div>

                  {cursoSeleccionado.imagen_url ? (
                    <img
                      src={cursoSeleccionado.imagen_url}
                      alt={cursoSeleccionado.nombre || cursoSeleccionado.titulo}
                      className={styles.modalCursoImage}
                    />
                  ) : (
                    <div className={styles.modalImagePlaceholder}>
                      <Book size={48} />
                    </div>
                  )}
                </div>

                {/* Contenido de texto */}
                <div className={styles.modalTextContent}>
                  <h3>{cursoSeleccionado.nombre || cursoSeleccionado.titulo}</h3>
                  {cursoSeleccionado.descripcion && (
                    <p className={styles.modalDescripcion}>
                      {cursoSeleccionado.descripcion}
                    </p>
                  )}
                  {/* Mostrar progreso actualizado en el modal */}
                  
                </div>
              </div>
            )}

            {/* Acciones - Solo botón principal */}
            <div className={styles.modalActions}>
              <button
                onClick={handleIrAlCursoConSwal}
                className={styles.actionButton}
              >
                IR AL CURSO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelUsuario;