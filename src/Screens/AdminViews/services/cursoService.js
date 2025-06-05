import Axios from "axios";
import Swal from 'sweetalert2';

// Obtener los cursos más vendidos
export const coursesSold = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/coursesSold");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos más vendidos:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los cursos más vendidos.',
    });
    return [];
  }
};
