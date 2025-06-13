// instructorService.js
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
      Swal.fire({
        icon: 'success',
        title: '¡Contraseña Asignada!',
        text: 'La contraseña temporal ha sido asignada correctamente al instructor',
        timer: 3000,
        showConfirmButton: false
      });
      return true;
    }
    return false;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al asignar contraseña',
      text: error.response?.data?.error || 'Hubo un problema al asignar la contraseña',
    });
    return false;
  }
};