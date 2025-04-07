import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, Camera, Upload, Save, Edit, Trash2, X } from 'lucide-react';
import './FormularioCurso.css';
import { useAuth } from '../context/AuthContext';
const MySwal = withReactContent(Swal);

const FormularioCurso = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombreInstructor: '', apellidoInstructor: '', nombreCurso: '',
    descripcionCurso: '', objetivosCurso: '', precioCurso: '', fotoCurso: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (user) {
      console.log("Cargando datos del usuario en el formulario:", user);
      setFormData(prevData => ({
        ...prevData,
        nombreInstructor: user.firstName || '',
        apellidoInstructor: user.lastName || ''
      }));
    }
  }, [user]);


  const validate = (field, value) => {
    const validations = {
      nombreInstructor: v => v.trim() ? '' : 'Campo obligatorio',
      apellidoInstructor: v => v.trim() ? '' : 'Campo obligatorio',
      nombreCurso: v => v.trim() ? '' : 'Agrega un título',
      descripcionCurso: v => v.trim().length >= 20 ? '' : 'Mínimo 20 caracteres',
      objetivosCurso: v => v.trim().length >= 10 ? '' : 'Mínimo 10 caracteres',
      precioCurso: v => v && !isNaN(v) && v > 0 ? '' : 'Precio inválido',
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

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, fotoCurso: file }));
      previewUrl && URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, fotoCurso: null }));
  };

  const mostrarAlerta = (titulo, texto, icono, color = '#4caf50') => {
    MySwal.fire({ title: titulo, text: texto, icon: icono, confirmButtonColor: color, timer: 2000, timerProgressBar: true });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const campos = Object.keys(formData).filter(f => f !== 'fotoCurso');
    const nuevosErrores = {};
    campos.forEach(f => { nuevosErrores[f] = validate(f, formData[f]); });
    setErrors(nuevosErrores);
    setTouched(Object.fromEntries(campos.map(f => [f, true])));
    if (Object.values(nuevosErrores).some(err => err)) return;

    MySwal.fire({
      title: '¿Publicar curso?', icon: 'question', showCancelButton: true,
      confirmButtonText: 'Sí, publicar', cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4caf50', cancelButtonColor: '#6c757d',
    }).then(result => {
      if (result.isConfirmed) mostrarAlerta('¡Éxito!', 'Curso publicado correctamente', 'success');
    });
  };

  const handleEdit = () => {
    MySwal.fire({ title: 'Editando curso', text: 'Campos habilitados para edición', icon: 'info', confirmButtonColor: '#ffa726', timer: 2000 });
  };

  const handleDelete = () => {
    MySwal.fire({
      title: '¿Eliminar curso?', text: 'Esta acción no se puede deshacer.', icon: 'warning',
      showCancelButton: true, confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4d4d', cancelButtonColor: '#6c757d'
    }).then(res => {
      if (res.isConfirmed) {
        setFormData({ nombreCurso: '', descripcionCurso: '', objetivosCurso: '', precioCurso: '', fotoCurso: null });
        previewUrl && URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setErrors({}); setTouched({});
        mostrarAlerta('Curso eliminado', 'Se ha eliminado correctamente', 'success', '#ff4d4d');
      }
    });
  };

  const renderInput = (icon, label, name, type = 'text') => {
    // Determinar si el campo debe ser de solo lectura
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
        name={name} rows={rows} value={formData[name]} onChange={handleChange} onBlur={handleBlur}
        className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''}`} placeholder={label}
      />
      {errors[name] && touched[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );


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

        <div className="form-group mb-4">
          <label className="form-label d-flex align-items-center">
            <Camera size={16} /> <span className="ms-2">Imagen del Curso</span>
          </label>
          {previewUrl ? (
            <div className="position-relative">
              <img src={previewUrl} alt="Vista previa" className="img-thumbnail mb-2" style={{ maxHeight: '200px' }} />
              <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={removeImage}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="btn btn-outline-secondary" onClick={() => document.getElementById('fotoCurso').click()}>
              <Upload size={16} className="me-2" /> Seleccionar imagen
            </div>
          )}
          <input type="file" id="fotoCurso" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>

        <div className="d-flex justify-content-between gap-2">
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} className="me-1" /> Eliminar
          </button>
          <button type="button" className="btn btn-warning" onClick={handleEdit}>
            <Edit size={16} className="me-1" /> Editar
          </button>
          <button type="submit" className="btn btn-success">
            <Save size={16} className="me-1" /> Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCurso;
