import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, ImagePlus, Save, Edit, Trash2 } from 'lucide-react';
import './FormularioCurso.module.css';
import { useAuth } from '../context/AuthContext';
const MySwal = withReactContent(Swal);

const FormularioCurso = () => {
  // Constantes para el modal
  const { user } = useAuth(); // ✅ Esto va primero
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursosInstructor, setCursosInstructor] = useState([]);
  
  // Cargar cursos cuando se muestre el modal
  useEffect(() => {
    if (mostrarModal && user?.id) {
      fetch(`http://localhost:5000/api/getCursosByInstructor/${user.id}`, {
        credentials: 'include' // Importante para enviar cookies de sesión
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
    Swal.fire({
      title: '¿Eliminar este curso?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/deleteCurso/${idCurso}`, {
          method: 'DELETE',
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire('Eliminado', 'El curso ha sido eliminado', 'success');
            setCursosInstructor(prev => prev.filter(curso => curso.id !== idCurso));
          })
          .catch(err => {
            console.error("Error al eliminar:", err);
            Swal.fire('Error', 'No se pudo eliminar el curso', 'error');
          });
      }
    });
  };
  
  // Función para editar curso
  const handleEditarCurso = (curso) => {
    Swal.fire({
      title: 'Editar Curso',
      html: `
        <label htmlFor="nombre" class="swal2-label">Nombre Curso</label>
        <input id="nombreCurso" class="swal2-input" placeholder="Nombre" value="${curso.nombre}">
        <label htmlFor="descripcion" class="swal2-label">Descripción</label>
        <textarea id="descripcionCurso" class="swal2-textarea" placeholder="Descripción">${curso.descripcion}</textarea>
        <label htmlFor="objetivos" class="swal2-label">Objetivos</label>
        <textarea id="objetivosCurso" class="swal2-textarea" placeholder="Objetivos">${curso.objetivos}</textarea>
        <label htmlFor="precio" class="swal2-label">Precio</label>
        <input id="precioCurso" class="swal2-input" placeholder="Precio" value="${curso.precio}" type="number">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const nombre = document.getElementById('nombreCurso').value;
        const descripcion = document.getElementById('descripcionCurso').value;
        const objetivos = document.getElementById('objetivosCurso').value;
        const precio = document.getElementById('precioCurso').value;
  
        if (!nombre || !descripcion || !objetivos || !precio) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
  
        return { nombre, descripcion, objetivos, precio };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombre, descripcion, objetivos, precio } = result.value;
  
        fetch(`http://localhost:5000/api/updateCurso/${curso.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            nombre,
            descripcion,
            objetivos,
            precio
          })
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire('Curso actualizado', '', 'success');
            // Actualizar el curso en el estado local
            setCursosInstructor(prevCursos => 
              prevCursos.map(c => 
                c.id === curso.id ? {...c, nombre, descripcion, objetivos, precio} : c
              )
            );
          })
          .catch(err => {
            console.error("Error al actualizar:", err);
            Swal.fire('Error', 'No se pudo actualizar el curso', 'error');
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
      
      // Verificamos tanto los campos mapeados como los originales
      const nombre = user.primer_nombre || user.firstName || '';
      const apellido = user.primer_apellido || user.lastName || '';
      
      console.log(`Configurando nombre: ${nombre}, apellido: ${apellido}`);
      
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
      descripcionCurso: v => v.trim().length >= 20 ? '' : 'Mínimo 20 caracteres',
      objetivosCurso: v => v.trim().length >= 10 ? '' : 'Mínimo 10 caracteres',
      precioCurso: v => v && !isNaN(v) && v > 0 ? '' : 'Precio inválido',
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
  const mostrarAlerta = (titulo, texto, icono, color = '#4caf50') => {
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
      mostrarAlerta('Error', 'Por favor, completa correctamente todos los campos', 'error', '#f44336');
      return;
    }

    const result = await MySwal.fire({
      title: '¿Publicar curso?', 
      icon: 'question', 
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar', 
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4caf50', 
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
        imagen: formData.fotoCurso
      };

      console.log("Enviando datos para crear curso:", body);

      const response = await fetch('http://localhost:5000/api/registerCurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Importante para enviar cookies de sesión
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
      mostrarAlerta('Error', `No se pudo publicar el curso: ${error.message}`, 'error', '#f44336');
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
      confirmButtonColor: '#ff4d4d', 
      cancelButtonColor: '#6c757d'
    }).then(res => {
      if (res.isConfirmed) {
        resetForm();
        mostrarAlerta('Formulario limpiado', 'Se han eliminado los datos del formulario', 'success', '#ff4d4d');
      }
    });
  };

  // Renderizar campos de formulario
  const renderInput = (icon, label, name, type = 'text') => {
    const isReadOnly = name === 'nombreInstructor' || name === 'apellidoInstructor';
    return (
      <div className="form-group mb-3">
        <label className="form-label d-flex align-items-center">
          {icon} <span className="ms-2">{label}</span>
        </label>
        <input
          type={type} 
          name={name} 
          value={formData[name]} 
          onChange={handleChange} 
          onBlur={handleBlur}
          className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''} ${isReadOnly ? 'bg-light' : ''}`} 
          placeholder={label}
          readOnly={isReadOnly}
        />
        {errors[name] && touched[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    );
  };

  const renderTextarea = (icon, label, name, rows = 3) => (
    <div className="form-group mb-3">
      <label className="form-label d-flex align-items-center">
        {icon} <span className="ms-2">{label}</span>
      </label>
      <textarea
        name={name} 
        rows={rows} 
        value={formData[name]} 
        onChange={handleChange} 
        onBlur={handleBlur}
        className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''}`} 
        placeholder={label}
      />
      {errors[name] && touched[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  // Verificar si hay usuario autenticado
  if (!user || !user.id) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <h4>Acceso restringido</h4>
          <p>Debes iniciar sesión como instructor para publicar cursos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 formulario-curso">
      <h3 className="mb-4 d-flex align-items-center"><Book size={24} className="me-2" /> Crear Curso</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">{renderInput(<User size={16} />, 'Nombre del Instructor', 'nombreInstructor')}</div>
          <div className="col-md-6">{renderInput(<User size={16} />, 'Apellido del Instructor', 'apellidoInstructor')}</div>
        </div>

        {renderInput(<Book size={16} />, 'Nombre del Curso', 'nombreCurso')}
        {renderTextarea(<FileText size={16} />, 'Descripción del Curso', 'descripcionCurso', 4)}
        {renderTextarea(<Target size={16} />, 'Objetivos del Curso', 'objetivosCurso', 3)}
        {renderInput(<DollarSign size={16} />, 'Precio del Curso', 'precioCurso', 'number')}
        {renderInput(<ImagePlus size={16} />, 'Enlace de la Imagen del Curso', 'fotoCurso')}

        {previewUrl && (
          <div className="text-center mb-4">
            <img src={previewUrl} alt="Vista previa" className="img-thumbnail" style={{ maxHeight: '200px' }} />
          </div>
        )}

        <div className="d-flex justify-content-between gap-2">
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loading}>
            <Trash2 size={16} className="me-1" /> Limpiar
          </button>
          <button type="button" className="btn btn-warning" onClick={() => setMostrarModal(true)} disabled={loading}>
            <Edit size={16} className="me-1" /> Ver Cursos
          </button>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Publicando...
              </>
            ) : (
              <>
                <Save size={16} className="me-1" /> Publicar
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Modal para ver/editar/eliminar cursos */}
      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tus Cursos</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
              </div>

              <div className="modal-body">
                {cursosInstructor.length === 0 ? (
                  <p>No tienes cursos aún.</p>
                ) : (
                  <ul className="list-group">
                    {cursosInstructor.map((curso) => (
                      <li key={curso.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{curso.nombre}</strong> - ${curso.precio}
                        </div>
                        <div>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEditarCurso(curso)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleEliminarCurso(curso.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCurso;