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
