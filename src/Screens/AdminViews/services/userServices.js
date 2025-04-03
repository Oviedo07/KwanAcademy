import Axios from "axios";
import Swal from 'sweetalert2';

// Obtener lista de usuarios activos
export const getUsuariosActivos = async (setUsuariosLista) => {
  try {
    const response = await Axios.get("http://localhost:5000/api/usuariosActivos");
    setUsuariosLista(response.data);
  } catch (error) {
    console.error("Error al obtener usuarios activos:", error);
  }
};

// Obtener lista de usuarios inactivos
export const getUsuariosInactivos = async (setUsuariosLista) => {
  try {
    const response = await Axios.get("http://localhost:5000/api/usuariosInactivos");
    setUsuariosLista(response.data);
  } catch (error) {
    console.error("Error al obtener usuarios inactivos:", error);
  }
};

// Alternar entre usuarios activos e inactivos
export const cambiarUsuarios = (setMostrarActivos, getUsuariosActivos, getUsuariosInactivos) => {
  setMostrarActivos(prevState => {
    const nuevoEstado = !prevState;
    nuevoEstado ? getUsuariosActivos() : getUsuariosInactivos();
    return nuevoEstado;
  });
};

// Activar o desactivar usuario según su estado actual
export const desactivarUsuario = async (id, nombre, apellido, estadoActual, getUsuariosActivos) => {
  try {
    console.log("Cambiando estado del usuario con ID:", id);

    const nuevoEstado = estadoActual === "activo" ? "inactivo" : "activo";

    await Axios.put("http://localhost:5000/api/updateStatusUsuarios", {
      id,
      estado: nuevoEstado,
    });

    Swal.fire({
      title: nuevoEstado === "activo" ? "Activación Exitosa!" : "Desactivación Exitosa!",
      text: `El usuario ${nombre} ${apellido} ha sido ${nuevoEstado === "activo" ? "activado" : "desactivado"} correctamente.`,
      icon: "success",
      timer: 3000,
    });

    getUsuariosActivos(); // Recargar lista de usuarios activos
  } catch (err) {
    console.error("Error al actualizar estado del usuario:", err);
  }
};
