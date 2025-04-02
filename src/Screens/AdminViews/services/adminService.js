import Axios from "axios";
import Swal from 'sweetalert2';

// ----------------------------------- OBTENER ADMINISTRADORES -----------------------------------------------------
export const getAdministradores = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/getAdmin");
    return response.data; // Retornamos los datos en lugar de usar setState aquí
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    return []; // Lanza el error para que quien lo use lo maneje
  }
};


// ------------------------------- AGREGAR ADMINISTRADORES -----------------------------------------------
export const addAdministrador = async (
    nombre,
    apellido,
    email,
    contrasena,
    telefono,
    rol,
    setError,
    getAdministradores
  ) => {
    if (!nombre.trim() || !apellido.trim() || !email.trim() || !contrasena.trim() || !telefono.trim() || !rol.trim()) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return; // Detener la ejecución si hay campos vacíos
    }
  
    try {
      setError(null);
      await Axios.post("http://localhost:5000/api/registerAdmin", {
        nombre,
        apellido,
        email,
        contrasena,
        telefono,
        rol,
      });
  
      getAdministradores(); // Actualizar la lista de administradores
  
      Swal.fire({
        title: "Registro Exitoso!",
        html: "<i>El administrador " + nombre + " " + apellido + " fue registrado con éxito</i>",
        icon: "success",
        draggable: true,
        timer: 3000
      });
  
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error al registrar el empleado. Inténtalo de nuevo.");
    }
  };