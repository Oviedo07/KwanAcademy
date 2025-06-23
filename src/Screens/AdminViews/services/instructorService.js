// services/instructorService.js
import Axios from "axios";
import Swal from 'sweetalert2';

// ------------------------------------ OBTENER RESUMEN DE INSTRUCTORES -------------------------------------------
export const getSummaryInstructor = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/getSummaryInstructor");
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener instructores',
      text: error.response?.data?.error || 'Hubo un problema al obtener los datos',
    });
    return [];
  }
};

// ------------------------------------ OBTENER INSTRUCTORES PENDIENTES -------------------------------------------
export const getPendingInstructors = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/getPendingInstructors");
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener solicitudes pendientes',
      text: error.response?.data?.error || 'Hubo un problema al obtener los datos',
    });
    return [];
  }
};

// ------------------------------------ ASIGNAR CONTRASEÑA TEMPORAL -------------------------------------------
export const assignPasswordToInstructor = async (instructorId, tempPassword) => {
  try {
    const response = await Axios.post("http://localhost:5000/api/assignPasswordToInstructor", {
      id: instructorId,
      tempPassword: tempPassword
    });
    
    if (response.data.success) {
      // Verificar si el correo se envió correctamente
      if (response.data.emailSent) {
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña Asignada y Correo Enviado!',
          html: `
            <div style="text-align: left;">
              <p><strong>✅ Contraseña temporal asignada correctamente</strong></p>
              <p><strong>📧 Correo de notificación enviado</strong></p>
              <br>
              <p class="text-muted">El instructor recibirá un correo con:</p>
              <ul style="text-align: left; margin-left: 20px;">
                <li>Su contraseña temporal</li>
                <li>Instrucciones de seguridad</li>
                <li>Pasos para cambiar la contraseña</li>
                <li>Enlace para iniciar sesión</li>
              </ul>
            </div>
          `,
          timer: 5000,
          showConfirmButton: true,
          confirmButtonText: 'Entendido'
        });
      } else {
        // Contraseña asignada pero correo falló
        Swal.fire({
          icon: 'warning',
          title: 'Contraseña Asignada - Problema con el Correo',
          html: `
            <div style="text-align: left;">
              <p><strong>✅ Contraseña temporal asignada correctamente</strong></p>
              <p><strong>⚠️ No se pudo enviar el correo de notificación</strong></p>
              <br>
              <p><strong>Acción requerida:</strong></p>
              <p>Debes contactar manualmente al instructor para informarle su contraseña temporal.</p>
              <br>
              <p class="text-muted"><strong>Razón:</strong> ${response.data.emailError || 'Error desconocido'}</p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ffc107'
        });
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error completo:', error);
    
    // Manejo de errores más específico
    let errorMessage = 'Hubo un problema al asignar la contraseña';
    let errorDetails = '';
    
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.message) {
      errorDetails = error.message;
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Error al asignar contraseña',
      html: `
        <div style="text-align: left;">
          <p><strong>Error:</strong> ${errorMessage}</p>
          ${errorDetails ? `<p class="text-muted"><strong>Detalles:</strong> ${errorDetails}</p>` : ''}
          <br>
          <p><strong>Posibles causas:</strong></p>
          <ul style="text-align: left; margin-left: 20px;">
            <li>Problema de conexión con el servidor</li>
            <li>El instructor ya tiene una contraseña asignada</li>
            <li>Error en la configuración del correo electrónico</li>
            <li>Problema con la base de datos</li>
          </ul>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Entendido'
    });
    return false;
  }
};