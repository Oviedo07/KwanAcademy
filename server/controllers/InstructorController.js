const db = require("../config/db");

// Controlador signIn.js en el backend
const signInInstructor = (req, res) => {
    // Extraemos los datos de la solicitud
    const { email, contrasena } = req.body;
    
    console.log("Datos recibidos del formulario:", req.body);
    console.log(`Intentando login con: email=${email}, contraseña=${contrasena?.substring(0, 3)}***`);
    
    // Consulta a la base de datos con depuración
    const query = "SELECT * FROM Instructor WHERE email = ?";
    
    // Primero verificamos si el instructor existe por email
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error en consulta SQL:", err);
        return res.status(500).json({ error: "Error en el servidor", details: err.message });
      }
      
      console.log(`Instructores encontrados con ese email: ${results.length}`);
      
      if (results.length === 0) {
        return res.status(401).json({ error: "No existe un instructor con ese email" });
      }
      
      // Si encontramos el email, verificamos la contraseña
      const instructor = results[0];
      console.log("Instructor encontrado en DB:", {
        id: instructor.id,
        email: instructor.email,
        contraseñaCorrecta: instructor.contrasena === contrasena
      });
      
      if (instructor.contrasena !== contrasena) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
      
      // Formatear la respuesta usando los campos correctos
      const userData = {
        id: instructor.id,
        nombre: instructor.primer_nombre || instructor.nombre,
        apellido: instructor.primer_apellido || instructor.apellido,
        email: instructor.email,
        role: 'instructor',
        token: "token123456" // Aquí generarías un JWT real
      };
      
      // Guardar datos en sesión si estás usando gestión de sesiones
      if (req.session) {
        req.session.user = userData;
      }
      
      res.json({
        message: "Autenticación exitosa",
        user: userData
      });
    });
  };
  
  // Verificar sesion de instructor
  const sessionInstructor = (req, res) => {
      if (req.session && req.session.user && req.session.user.role === 'instructor') {
          res.json({ message: "Sesión de instructor activa", user: req.session.user });
      } else {
          res.status(401).json({ error: "No hay sesión de instructor activa" });
      }
  };
  
  module.exports = {
      signInInstructor,
      sessionInstructor
  };


// Controlador para registrar usuario
const registerInstructor = (req, res) => {
    console.log("📥 Datos recibidos en el backend (instructor):", req.body);

    const {
        tipo_documento,
        numero_identificacion,
        primer_nombre,
        segundo_nombre = null,
        primer_apellido,
        segundo_apellido = null,
        genero,
        numero_telefonico,
        ocupacion,
        descripcion_perfil,
        email,
        contrasena
    } = req.body;

    // Validar campos obligatorios
    if (
        !tipo_documento || !numero_identificacion || !primer_nombre || !primer_apellido ||
        !genero || !numero_telefonico || !ocupacion || !descripcion_perfil || !email || !contrasena
    ) {
        console.error("⚠️ Faltan datos obligatorios en el registro de instructor.");
        return res.status(400).json({ error: "Todos los campos obligatorios deben ser llenados" });
    }

    const id_rol = 4; // Rol fijo para instructores

    const query = `
        INSERT INTO Instructor (
            tipo_documento,
            numero_identificacion,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            numero_telefonico,
            ocupacion,
            descripcion_perfil,
            email,
            contrasena,
            id_rol
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        tipo_documento,
        numero_identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        numero_telefonico,
        ocupacion,
        descripcion_perfil,
        email,
        contrasena,
        id_rol
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("❌ Error al registrar instructor:", err);
            return res.status(500).json({ error: "Error en la base de datos", details: err.message });
        }

        console.log("✅ Instructor registrado correctamente");
        res.status(201).json({ message: "Instructor registrado con éxito" });
    });
};



module.exports = {
    signInInstructor,
    registerInstructor,
    sessionInstructor
}