import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, ImagePlus, Save, Edit, Trash2 } from 'lucide-react';
import './FormularioCurso.module.css';
import { useAuth } from '../context/AuthContext';
const MySwal = withReactContent(Swal);

const FormularioCurso = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombreInstructor: user.firstName || '',
        apellidoInstructor: user.lastName || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (formData.fotoCurso && formData.fotoCurso.startsWith('http')) {
      setPreviewUrl(formData.fotoCurso);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.fotoCurso]);

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

      const response = await fetch('http://localhost:5000/api/registerCurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear el curso: ${response.status} ${response.statusText}\n${errorText}`);
      }

      await response.json();
      mostrarAlerta('¡Éxito!', 'Curso publicado correctamente', 'success');
      resetForm();
    } catch (error) {
      console.error('Error al publicar el curso:', error);
      mostrarAlerta('Error', `No se pudo publicar el curso: ${error.message}`, 'error', '#f44336');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreInstructor: user?.firstName || '',
      apellidoInstructor: user?.lastName || '',
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

  const handleEdit = () => {
    MySwal.fire({ 
      title: 'Editando curso', 
      text: 'Campos habilitados para edición', 
      icon: 'info', 
      confirmButtonColor: '#ffa726', 
      timer: 2000 
    });
  };

  const handleDelete = () => {
    MySwal.fire({
      title: '¿Eliminar curso?', 
      text: 'Esta acción no se puede deshacer.', 
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Eliminar', 
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4d4d', 
      cancelButtonColor: '#6c757d'
    }).then(res => {
      if (res.isConfirmed) {
        resetForm();
        mostrarAlerta('Curso eliminado', 'Se ha eliminado correctamente', 'success', '#ff4d4d');
      }
    });
  };

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
            <Trash2 size={16} className="me-1" /> Eliminar
          </button>
          <button type="button" className="btn btn-warning" onClick={handleEdit} disabled={loading}>
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
    </div>
  );
};

export default FormularioCurso;
