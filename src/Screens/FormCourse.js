import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, ImagePlus, Save, Edit, Trash2, X, Plus, Check } from 'lucide-react';
import styles from './FormCourse.module.css';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";

const MySwal = withReactContent(Swal);
const FormularioCurso = () => {
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);


  
  // Constantes para el modal
  const { user } = useAuth();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursosInstructor, setCursosInstructor] = useState([]);
  
  // Cargar cursos cuando se muestre el modal
  useEffect(() => {
    if (mostrarModal && user?.id) {
      fetch(`http://localhost:5000/api/getCursosByInstructor/${user.id}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          console.log("Cursos obtenidos:", data);
          setCursosInstructor(data.cursos || []);
        })
        .catch(err => console.error('Error al obtener cursos:', err));
    }
  }, [mostrarModal, user]);
  
  // Función para eliminar curso
  const handleEliminarCurso = (idCurso) => {
    MySwal.fire({
      title: '¿Eliminar este curso?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E70014',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/deleteCurso/${idCurso}`, {
          method: 'DELETE',
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            MySwal.fire({
              title: 'Eliminado',
              text: 'El curso ha sido eliminado',
              icon: 'success',
              confirmButtonColor: '#E70014'
            });
            setCursosInstructor(prev => prev.filter(curso => curso.id !== idCurso));
          })
          .catch(err => {
            console.error("Error al eliminar:", err);
            MySwal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el curso',
              icon: 'error',
              confirmButtonColor: '#E70014'
            });
          });
      }
    });
  };
  
  // Función para editar curso
  // Función para editar curso - CORREGIDA
const handleEditarCurso = (curso) => {
  MySwal.fire({
    title: 'Editar Curso',
    html: `
    <div style="display: flex; flex-direction: column; gap: 15px; padding: 10px;">
      <div>
        <label for="nombreCurso" style="display: block; font-weight: 500; margin-bottom: 6px; color: #343a40; text-align: left;">Nombre Curso</label>
        <input id="nombreCurso" class="swal2-input" placeholder="Nombre" value="${curso.nombre}" style="margin: 0; border-radius: 8px; border: 1px solid #ced4da; padding: 10px 15px; width: 100%;">
      </div>

      <div>
        <label for="descripcionCurso" style="display: block; font-weight: 500; margin-bottom: 6px; color: #343a40; text-align: left;">Descripción</label>
        <textarea id="descripcionCurso" class="swal2-textarea" placeholder="Descripción" style="margin: 0; border-radius: 8px; border: 1px solid #ced4da; padding: 10px 15px; width: 100%; min-height: 100px;">${curso.descripcion}</textarea>
      </div>

      <div>
        <label for="objetivosCurso" style="display: block; font-weight: 500; margin-bottom: 6px; color: #343a40; text-align: left;">Objetivos</label>
        <textarea id="objetivosCurso" class="swal2-textarea" placeholder="Objetivos" style="margin: 0; border-radius: 8px; border: 1px solid #ced4da; padding: 10px 15px; width: 100%; min-height: 80px;">${curso.objetivos}</textarea>
      </div>

      <div>
        <label for="precioCurso" style="display: block; font-weight: 500; margin-bottom: 6px; color: #343a40; text-align: left;">Precio</label>
        <input id="precioCurso" class="swal2-input" placeholder="Precio" value="${curso.precio}" type="number" style="margin: 0; border-radius: 8px; border: 1px solid #ced4da; padding: 10px 15px; width: 100%;">
      </div>

      <div>
        <label for="enlaceCurso" style="display: block; font-weight: 500; margin-bottom: 6px; color: #343a40; text-align: left;">Enlace Curso</label>
        <textarea id="enlaceCurso" class="swal2-textarea" placeholder="Enlace del curso" style="margin: 0; border-radius: 8px; border: 1px solid #ced4da; padding: 10px 15px; width: 100%; min-height: 100px;">${curso.enlace_curso}</textarea>
      </div>
    </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
    customClass: {
      popup: 'custom-popup-class',
      confirmButton: 'custom-confirm-button',
    },
    preConfirm: () => {
      const nombre = document.getElementById('nombreCurso').value;
      const descripcion = document.getElementById('descripcionCurso').value;
      const objetivos = document.getElementById('objetivosCurso').value;
      const precio = document.getElementById('precioCurso').value;
      const enlace_curso = document.getElementById('enlaceCurso').value; // ✅ CAMBIADO: ahora usa enlace_curso

      if (!nombre || !descripcion || !objetivos || !precio || !enlace_curso) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
      }

      return { nombre, descripcion, objetivos, precio, enlace_curso }; // ✅ CAMBIADO: ahora retorna enlace_curso
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { nombre, descripcion, objetivos, precio, enlace_curso } = result.value; // ✅ Ya estaba correcto

      // ✅ Agregar console.log para debug
      console.log("Datos a enviar:", { nombre, descripcion, objetivos, precio, enlace_curso });

      fetch(`http://localhost:5000/api/updateCurso/${curso.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nombre,
          descripcion,
          objetivos,
          precio,
          enlace_curso
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Respuesta del servidor:", data); // ✅ Agregar log
          MySwal.fire({
            title: 'Curso actualizado',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          // Actualizar el curso en el estado local
          setCursosInstructor(prevCursos => 
            prevCursos.map(c => 
              c.id === curso.id ? {...c, nombre, descripcion, objetivos, precio, enlace_curso} : c
            )
          );
        })
        .catch(err => {
          console.error("Error al actualizar:", err);
          MySwal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el curso',
            icon: 'error',
            confirmButtonColor: '#E70014'
          });
        });
    }
  });
};
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreInstructor: '', 
    apellidoInstructor: '', 
    nombreCurso: '',
    descripcionCurso: '', 
    objetivosCurso: '', 
    precioCurso: '', 
    enlaceCurso: '',
    fotoCurso: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar datos del instructor al iniciar
  useEffect(() => {
    if (user) {
      console.log("Datos de usuario disponibles:", user);
      
      const nombre = user.primer_nombre || user.firstName || '';
      const apellido = user.primer_apellido || user.lastName || '';
      
      setFormData(prev => ({
        ...prev,
        nombreInstructor: nombre,
        apellidoInstructor: apellido
      }));
    }
  }, [user]);

  // Actualizar vista previa de imagen
  useEffect(() => {
    if (formData.fotoCurso && (formData.fotoCurso.startsWith('http') || formData.fotoCurso.startsWith('data:'))) {
      setPreviewUrl(formData.fotoCurso);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.fotoCurso]);

  // Validaciones
  const validate = (field, value) => {
    const validations = {
      nombreInstructor: v => v.trim() ? '' : 'Campo obligatorio',
      apellidoInstructor: v => v.trim() ? '' : 'Campo obligatorio',
      nombreCurso: v => v.trim() ? '' : 'Agrega un título',
      objetivosCurso: v => v.trim().length >= 10 ? '' : 'Mínimo 10 caracteres',
      descripcionCurso: v => v.trim().length >= 10 ? '' : 'Mínimo 10 caracteres',
      precioCurso: v => v && !isNaN(v) && v > 0 ? '' : 'Precio inválido',
      enlaceCurso: v => v.trim() ? '' : 'Campo obligatorio',
      fotoCurso: v => v.trim().startsWith('http') ? '' : 'URL no válida'
    };
    return validations[field] ? validations[field](value) : '';
  };

  // Manejadores de eventos
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  // Mostrar alertas
  const mostrarAlerta = (titulo, texto, icono, color = '#28a745') => {
    MySwal.fire({ 
      title: titulo, 
      text: texto, 
      icon: icono, 
      confirmButtonColor: color, 
      timer: 2000, 
      timerProgressBar: true
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const campos = Object.keys(formData);
    const nuevosErrores = {};
    campos.forEach(f => { nuevosErrores[f] = validate(f, formData[f]); });
    setErrors(nuevosErrores);
    setTouched(Object.fromEntries(campos.map(f => [f, true])));

    if (Object.values(nuevosErrores).some(err => err)) {
      mostrarAlerta('Error', 'Por favor, completa correctamente todos los campos', 'error', '#E70014');
      return;
    }

    const result = await MySwal.fire({
      title: '¿Publicar curso?', 
      icon: 'question', 
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar', 
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', 
      cancelButtonColor: '#6c757d',
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const body = {
        id_instructor: user.id,
        nombre: formData.nombreCurso,
        descripcion: formData.descripcionCurso,
        objetivos: formData.objetivosCurso,
        precio: formData.precioCurso,
        enlace_curso: formData.enlaceCurso,
        imagen: formData.fotoCurso
      };

      console.log("Enviando datos para crear curso:", body);

      const response = await fetch('http://localhost:5000/api/registerCurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear el curso: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      
      mostrarAlerta('¡Éxito!', 'Curso publicado correctamente', 'success');
      resetForm();
    } catch (error) {
      console.error('Error al publicar el curso:', error);
      mostrarAlerta('Error', `No se pudo publicar el curso: ${error.message}`, 'error', '#E70014');
    } finally {
      setLoading(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nombreInstructor: user?.primer_nombre || user?.firstName || '',
      apellidoInstructor: user?.primer_apellido || user?.lastName || '',
      nombreCurso: '',
      descripcionCurso: '', 
      objetivosCurso: '', 
      precioCurso: '', 
      enlaceCurso: '',
      fotoCurso: '',
    });
    setErrors({});
    setTouched({});
    setPreviewUrl(null);
  };

  // Eliminar formulario
  const handleDelete = () => {
    MySwal.fire({
      title: '¿Limpiar formulario?', 
      text: 'Se borrarán todos los datos ingresados.', 
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Limpiar', 
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E70014', 
      cancelButtonColor: '#6c757d'
    }).then(res => {
      if (res.isConfirmed) {
        resetForm();
        mostrarAlerta('Formulario limpiado', 'Se han eliminado los datos del formulario', 'success', '#E70014');
      }
    });
  };

  // Renderizar campos de formulario
  const renderInput = (icon, label, name, type = 'text') => {
    const isReadOnly = name === 'nombreInstructor' || name === 'apellidoInstructor';
    return (
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <span className={styles.iconWrapper}>
            {React.cloneElement(icon, { size: 16, color: '#E70014' })}
          </span>
          <span>{label}</span>
        </label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors[name] && touched[name] ? styles.inputError : ''} ${isReadOnly ? styles.readOnlyField : ''}`}
          placeholder={label}
          readOnly={isReadOnly}
        />
        {errors[name] && touched[name] && <div className={styles.errorText}>{errors[name]}</div>}
      </div>
    );
  };

  const renderTextarea = (icon, label, name, rows = 3) => (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.iconWrapper}>
          {React.cloneElement(icon, { size: 16, color: '#E70014' })}
        </span>
        <span>{label}</span>
      </label>
      <textarea
        name={name} 
        rows={rows} 
        value={formData[name]} 
        onChange={handleChange} 
        onBlur={handleBlur}
        className={`${styles.input} ${errors[name] && touched[name] ? styles.inputError : ''}`} 
        placeholder={label}
      />
      {errors[name] && touched[name] && <div className={styles.errorText}>{errors[name]}</div>}
    </div>
  );

  // Verificar si hay usuario autenticado
  if (!user || !user.id) {
    return (
      <div className={styles.containerSection}>
        <div className={styles.container} style={{ backgroundColor: '#fff3f3', borderLeft: '4px solid #E70014' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <X size={24} color="#E70014" />
            <h4 style={{ margin: 0, color: '#212529' }}>Acceso restringido</h4>
          </div>
          <p style={{ margin: 0, color: '#495057' }}>Debes iniciar sesión como instructor para publicar cursos.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.containerSection}>
      <div className={styles.container}>
        <h3 className={styles.header}>
          <Book size={28} className={styles.headerIcon} />
          Crear Curso
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
            {renderInput(<User size={16} />, 'Nombre del Instructor', 'nombreInstructor')}
            {renderInput(<User size={16} />, 'Apellido del Instructor', 'apellidoInstructor')}
          </div>

          {renderInput(<Book size={16} />, 'Nombre del Curso', 'nombreCurso')}
          {renderTextarea(<FileText size={16} />, 'Objetivos del Curso', 'objetivosCurso', 3)}
          {renderTextarea(<Target size={16} />, 'Descripción del Curso', 'descripcionCurso', 4)}
          {renderInput(<DollarSign size={16} />, 'Precio del Curso', 'precioCurso', 'number')}
          {renderInput(<DollarSign size={16} />, 'Enlace del Curso', 'enlaceCurso', 'text')}
          {renderInput(<ImagePlus size={16} />, 'Enlace de la Imagen del Curso', 'fotoCurso')}

          {previewUrl && (
            <div className={styles.previewContainer}>
              <img src={previewUrl} alt="Vista previa" className={styles.previewImage} />
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className="btn" 
              style={{
                backgroundColor: '#f8f9fa',
                color: '#E70014',
                border: '1px solid #E70014',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onClick={handleDelete} 
              disabled={loading}
            >
              <Trash2 size={18} /> Limpiar
            </button>
            
            <button 
              type="button" 
              className="btn" 
              style={{
                backgroundColor: '#343a40',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setMostrarModal(true)} 
              disabled={loading}
            >
              <Edit size={18} /> Gestionar Curso
            </button>
            
            <button 
  type="submit" 
  className="btn" 
  style={{
    backgroundColor: '#E70014',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    height: 'auto',
    flexGrow: 0,           // evita que se expanda
    whiteSpace: 'nowrap'   // evita que el texto se divida
  }}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Publicando...
    </>
  ) : (
    <>
      <Plus size={16} /> Publicar Curso
    </>
  )}
</button>

          </div>
        </form>
      
        {/* Modal para ver/editar/eliminar cursos */}
        {mostrarModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: '800px' }}>
              <div className="modal-content" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <div className="modal-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '3px solid #E70014', padding: '1rem 1.5rem' }}>
                  <h5 className="modal-title" style={{ fontWeight: '600', color: '#212529', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Book size={22} color="#E70014" /> Mis Cursos Publicados
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    style={{ opacity: 0.8 }}
                    onClick={() => setMostrarModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body" style={{ padding: '1.5rem' }}>
                  {cursosInstructor.length === 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem 1rem',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <Book size={40} color="#6c757d" style={{ marginBottom: '1rem', opacity: 0.6 }} />
                      <p style={{ color: '#6c757d', margin: 0 }}>No has publicado ningún curso todavía.</p>
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {cursosInstructor.map((curso) => (
                        <li key={curso.id} className={styles.cursoItem}>
                          <div>
                            <div className={styles.cursoNombre}>{curso.nombre}</div>
                            <div className={styles.cursoPrecio}>${curso.precio}</div>
                          </div>
                          <div className={styles.actionButtons}>
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: '#343a40',
                                color: 'white',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.875rem',
                                padding: '0.4rem 0.75rem'
                              }}
                              onClick={() => handleEditarCurso(curso)}
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              className="btn btn-sm"
                              style={{
                                backgroundColor: '#E70014',
                                color: 'white',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.875rem',
                                padding: '0.4rem 0.75rem'
                              }}
                              onClick={() => handleEliminarCurso(curso.id)}
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="modal-footer" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6', padding: '1rem 1.5rem' }}>
                  <button 
                    className="btn" 
                    style={{
                      backgroundColor: '#343a40',
                      color: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.6rem 1.2rem',
                      transition: 'all 0.3s ease'
                    }} 
                    onClick={() => setMostrarModal(false)}
                  >
                    <X size={16} /> Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormularioCurso;