const db = require("../config/db");
const signInAdmin = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "SELECT * FROM Administrador WHERE email = ? AND contrasena = ?";
    const [results] = await db.query(query, [email, contrasena]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const user = results[0];

    // Guardar datos en la sesión
    req.session.user = { id: user.id, email: user.email, role: "admin" };

    res.json({ message: "Autenticación exitosa", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Error en la consulta SQL:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 2. Verificar sesión de administradores (síncrono)
const sessionAdmin = (req, res) => {
  if (req.session.user) {
    res.json({ message: "Sesión activa", user: req.session.user });
  } else {
    res.status(401).json({ error: "No hay sesión activa" });
  }
};

// 3. Controlador para obtener los administradores
const getAdmin = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Administrador");
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 4. Controlador para registrar nuevos administradores
const registerAdmin = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono, rol } = req.body;
    const sql =
      "INSERT INTO Administrador (nombre, apellido, email, contrasena, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(sql, [nombre, apellido, email, contrasena, telefono, rol]);
    res.json({ message: "Empleado registrado con éxito" });
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error al registrar el empleado" });
  }
};

// 5. Controlador para editar datos de administradores
const updateAdmin = async (req, res) => {
  try {
    const { id, nombre, apellido, email, contrasena, telefono, rol } = req.body;
    const [result] = await db.query(
      "UPDATE Administrador SET nombre=?, apellido=?, email=?, contrasena=?, telefono=?, rol=? WHERE id=?",
      [nombre, apellido, email, contrasena, telefono, rol, id]
    );
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 6. Controlador para eliminar administradores
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM Administrador WHERE id = ?", [id]);
    res.json({ message: "Registro eliminado correctamente" });
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
    signInAdmin,
    sessionAdmin,
    getAdmin, 
    registerAdmin,
    updateAdmin,
    deleteAdmin
}