import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, Camera, Upload, Save, Edit, Trash2, X } from 'lucide-react';
import styles from './FormularioCurso.module.css';
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

  const mostrarAlerta = (titulo, texto, icono, color = '#E70014') => {
    MySwal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      confirmButtonColor: color,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm'
      }
    });
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
      title: '¿Publicar curso?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E70014',
      cancelButtonColor: '#414141',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm',
        cancelButton: 'swal-custom-cancel'
      }
    }).then(result => {
      if (result.isConfirmed) mostrarAlerta('¡Éxito!', 'Curso publicado correctamente', 'success');
    });
  };

  const handleEdit = () => {
    MySwal.fire({
      title: 'Editando curso',
      text: 'Campos habilitados para edición',
      icon: 'info',
      confirmButtonColor: '#E70014',
      timer: 2000,
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm'
      }
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
      confirmButtonColor: '#E70014',
      cancelButtonColor: '#414141',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm',
        cancelButton: 'swal-custom-cancel'
      }
    }).then(res => {
      if (res.isConfirmed) {
        setFormData({ nombreCurso: '', descripcionCurso: '', objetivosCurso: '', precioCurso: '', fotoCurso: null });
        previewUrl && URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setErrors({}); setTouched({});
        mostrarAlerta('Curso eliminado', 'Se ha eliminado correctamente', 'success', '#E70014');
      }
    });
  };

  const renderInput = (icon, label, name, type = 'text') => {
    const isReadOnly = name === 'nombreInstructor' || name === 'apellidoInstructor';

    return (
      <section className={styles.containerSection}>
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
            className={`form-control ${styles.input} ${errors[name] && touched[name] ? styles.inputError : ''} ${isReadOnly ? styles.readOnlyField : ''}`}
            placeholder={label}
            readOnly={isReadOnly}
          />
          {errors[name] && touched[name] && <div className={styles.errorText}>{errors[name]}</div>}
        </div>
      </section>

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
        className={`form-control ${styles.input} ${errors[name] && touched[name] ? styles.inputError : ''}`}
        placeholder={label}
      />
      {errors[name] && touched[name] && <div className={styles.errorText}>{errors[name]}</div>}
    </div>
  );

  return (
    <section className={styles.containerSection}>
      <div className={styles.container}>
        <h3 className={styles.header}>
          <Book size={28} className={styles.headerIcon} />
          Crear Curso
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">{renderInput(<User size={16} />, 'Nombre del Instructor', 'nombreInstructor')}</div>
            <div className="col-md-6">{renderInput(<User size={16} />, 'Apellido del Instructor', 'apellidoInstructor')}</div>
          </div>

          {renderInput(<Book size={16} />, 'Nombre del Curso', 'nombreCurso')}
          {renderTextarea(<FileText size={16} />, 'Descripción del Curso', 'descripcionCurso', 4)}
          {renderTextarea(<Target size={16} />, 'Objetivos del Curso', 'objetivosCurso', 3)}
          {renderInput(<DollarSign size={16} />, 'Precio del Curso', 'precioCurso', 'number')}

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span className={styles.iconWrapper}>
                <Camera size={16} color="#E70014" />
              </span>
              <span>Imagen del Curso</span>
            </label>
            {previewUrl ? (
              <div className={styles.imageContainer}>
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={removeImage}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={styles.uploadButton}
                onClick={() => document.getElementById('fotoCurso').click()}
              >
                <Upload size={32} color="#E70014" className={styles.uploadIcon} />
                <div className={styles.uploadText}>Seleccionar imagen</div>
                <div className={styles.uploadHint}>Arrastra o haz clic aquí</div>
              </div>
            )}
            <input type="file" id="fotoCurso" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.buttonEliminar}
              onClick={handleDelete}
            >
              <Trash2 size={16} className={styles.buttonIcon} /> Eliminar
            </button>
            <button
              type="button"
              className={styles.buttonEditar}
              onClick={handleEdit}
            >
              <Edit size={16} className={styles.buttonIcon} /> Editar
            </button>
            <button
              type="submit"
              className={styles.buttonPublicar}
            >
              <Save size={16} className={styles.buttonIcon} /> Publicar
            </button>
          </div>
        </form>
      </div>
    </section>

  );
};

export default FormularioCurso;