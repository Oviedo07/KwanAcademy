import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { User, Book, FileText, Target, DollarSign, Camera, Upload, Save, Edit, Trash2, X } from 'lucide-react';
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
      fotoCurso: null,
      urlImagenCurso: '', // ✅ Nuevo campo para URL de imagen
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      return () => previewUrl && URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);
  
    useEffect(() => {
      if (user) {
        setFormData(prev => ({
          ...prev,
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
  
      if (name === 'urlImagenCurso') {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(value.trim() || null);
        setFormData(prev => ({ ...prev, fotoCurso: null }));
      }
  
      if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
      }
    };
  
    const handleBlur = e => {
      const { name, value } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };
  
    const handleFileChange = e => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({ ...prev, fotoCurso: file, urlImagenCurso: '' }));
        previewUrl && URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };
  
    const removeImage = () => {
      if (previewUrl && formData.fotoCurso) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setFormData(prev => ({ ...prev, fotoCurso: null, urlImagenCurso: '' }));
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
  
      const campos = Object.keys(formData).filter(f => !['fotoCurso', 'urlImagenCurso'].includes(f));
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
        const formDataToSend = new FormData();
        formDataToSend.append('id_instructor', user.id);
        formDataToSend.append('nombre', formData.nombreCurso);
        formDataToSend.append('descripcion', formData.descripcionCurso);
        formDataToSend.append('objetivos', formData.objetivosCurso);
        formDataToSend.append('precio', formData.precioCurso);
        if (formData.fotoCurso) {
          formDataToSend.append('imagen', formData.fotoCurso);
        } else if (formData.urlImagenCurso) {
          formDataToSend.append('urlImagen', formData.urlImagenCurso); // 🔗 Asegúrate de que tu backend soporte este campo
        }
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/registerCurso`, {
          method: 'POST',
          body: formDataToSend
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Respuesta de error completa:", errorText);
          throw new Error(`Error al crear el curso: ${response.status} ${response.statusText}`);
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
        fotoCurso: null,
        urlImagenCurso: '',
      });
      previewUrl && URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setErrors({});
      setTouched({});
    };
  
    // ... (handleEdit, handleDelete, renderInput, renderTextarea igual que antes)
  
    return (
      <div className="container mt-4 formulario-curso">
        <h3 className="mb-4 d-flex align-items-center"><Book size={24} className="me-2" /> Crear Curso</h3>
        <form onSubmit={handleSubmit}>
          {/* ...campos anteriores */}
  
          {/* Imagen desde archivo o enlace */}
          <div className="form-group mb-4">
            <label className="form-label d-flex align-items-center">
              <Camera size={16} /> <span className="ms-2">Imagen del Curso</span>
            </label>
  
            {previewUrl ? (
              <div className="position-relative">
                <img src={previewUrl} alt="Vista previa" className="img-thumbnail mb-2" style={{ maxHeight: '200px' }} />
                <button 
                  type="button" 
                  className="btn btn-sm btn-danger position-absolute top-0 end-0" 
                  onClick={removeImage}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="btn btn-outline-secondary mb-2" onClick={() => document.getElementById('fotoCurso').click()}>
                  <Upload size={16} className="me-2" /> Seleccionar imagen
                </div>
                <input type="file" id="fotoCurso" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
  
                <input
                  type="text"
                  name="urlImagenCurso"
                  placeholder="...o pegar enlace de imagen"
                  className="form-control mt-2"
                  value={formData.urlImagenCurso}
                  onChange={handleChange}
                />
              </>
            )}
          </div>
  
          {/* ...botones guardar, editar, eliminar */}
        </form>
      </div>
    );
  };
  
  export default FormularioCurso;