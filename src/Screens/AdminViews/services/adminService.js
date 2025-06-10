import Axios from "axios";
import Swal from 'sweetalert2';


// ------------------------------------ INICIO DE SESION ADMINISTRADORES -------------------------------------------
export const signInAdministradores = async (email, contrasena) => {
  try {
    const response = await Axios.post(
      "http://localhost:5000/api/signInAdmin",
      { email, contrasena },
      { withCredentials: true } // 🔹 necesario para manejar cookies/sesiones
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al iniciar sesión");
  }
};

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

//--------------------------------------Encasillar En Inputs Datos De Administradores------------------------------------------

export const encasillarAdministrador = (admin, setEditar, setNombre, setApellido, setEmail, setContrasena, setTelefono, setRol, setId) => {
  setEditar(true);

  setNombre(admin.nombre);
  setApellido(admin.apellido);
  setEmail(admin.email);
  setContrasena(admin.contrasena);
  setTelefono(admin.telefono);
  setRol(admin.rol);
  setId(admin.id);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 

// ------------------------------------------Editar Administradores-----------------------------------------------

export const updateAdministrador = async (e, adminData, setters, setAdministradores, administradores) => {
  e.preventDefault();
  const { id, nombre, apellido, email, contrasena, telefono, rol } = adminData;
  const { setError, getAdministradores, setEditar, limpiarCampos } = setters;

  if (!nombre.trim() || !apellido.trim() || !email.trim() || !contrasena.trim() || !telefono.trim() || !rol.trim()) {
    Swal.fire({
      title: "Error",
      text: "Todos los campos son obligatorios",
      icon: "warning",
    });
    return;
  }

  try {
    setError(null);
    await Axios.put("http://localhost:5000/api/updateAdmin", {
      id,
      nombre,
      apellido,
      email,
      contrasena,
      telefono,
      rol,
    });

    // Actualizar manualmente el estado
    setAdministradores(administradores.map(admin => 
      admin.id === id ? { id, nombre, apellido, email, contrasena, telefono, rol } : admin
    ));

    setEditar(false);
    limpiarCampos(); 

    Swal.fire({
      title: "¡Actualización Exitosa!",
      html: `<i>El administrador ${nombre} ${apellido} fue actualizado con éxito</i>`,
      icon: "success",
      draggable: true,
      timer: 3000,
    });

  } catch (err) {
    console.error("Error al actualizar:", err);
    setError("Error al actualizar administrador. Inténtalo de nuevo.");
  }
};


//---------------------------------ELIMINAR ADMINISTRADORES-----------------------------

// src/services/adminService.js
export const Delete = async (val, setAdministradores, getAdministradores) => {
  try {
    const result = await Swal.fire({
      title: "Eliminar!",
      html: `<i>¿Desea eliminar a este administrador: <strong>${val.nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:5000/api/deleteAdmin/${val.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "Eliminado!",
          text: "El administrador ha sido eliminado.",
          icon: "success",
        });

        // Actualizar la lista después de eliminar
        setAdministradores((prev) => prev.filter((admin) => admin.id !== val.id));

        // Obtener la nueva lista de administradores
        getAdministradores();
      } else {
        const data = await response.json();
        alert("Error al eliminar: " + data.error);
      }
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};
