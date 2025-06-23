// config/emailConfig.js
const nodemailer = require('nodemailer');

// Configuración del transportador de correo
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // o puedes usar 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // email de Kwan Academy
      pass: process.env.EMAIL_PASSWORD // contraseña de aplicación
    },
    // Configuración adicional para Gmail
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Función para enviar correo de contraseña temporal
const sendPasswordEmail = async (instructorData, tempPassword) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: {
      name: 'Kwan Academy',
      address: process.env.EMAIL_USER
    },
    to: instructorData.email,
    subject: '🔑 Bienvenido a Kwan Academy - Contraseña Temporal',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Kwan Academy</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 10px;
          }
          .welcome-title {
            color: #28a745;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .password-box {
            background-color: #f8f9fa;
            border: 2px dashed #007bff;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .password {
            font-size: 20px;
            font-weight: bold;
            color: #007bff;
            font-family: monospace;
            letter-spacing: 2px;
          }
          .security-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
          }
          .security-icon {
            color: #856404;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
          }
          ul {
            text-align: left;
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎓 Kwan Academy</div>
            <h1 class="welcome-title">¡Bienvenido a nuestra plataforma!</h1>
          </div>
          
          <p>Estimado/a <strong>${instructorData.primer_nombre} ${instructorData.primer_apellido}</strong>,</p>
          
          <p>¡Felicitaciones! Tu solicitud para ser instructor en Kwan Academy ha sido <strong>aprobada</strong>. Estamos emocionados de tenerte en nuestro equipo de educadores.</p>
          
          <div class="password-box">
            <p><strong>Tu contraseña temporal es:</strong></p>
            <div class="password">${tempPassword}</div>
          </div>
          
          <div class="security-notice">
            <p class="security-icon">🔒 IMPORTANTE - SEGURIDAD</p>
            <p><strong>Por tu seguridad, es obligatorio cambiar esta contraseña temporal en tu primer acceso.</strong></p>
            <ul>
              <li>Esta contraseña es temporal y debe ser cambiada inmediatamente</li>
              <li>No compartas esta información con nadie</li>
              <li>Elige una contraseña segura que incluya mayúsculas, minúsculas, números y símbolos</li>
              <li>Tu nueva contraseña debe tener al menos 8 caracteres</li>
            </ul>
          </div>
          
          <h3>Próximos pasos:</h3>
          <ol>
            <li><strong>Inicia sesión</strong> en la plataforma con tu email y contraseña temporal</li>
            <li><strong>Cambia tu contraseña</strong> inmediatamente por una permanente</li>
            <li><strong>Completa tu perfil</strong> de instructor</li>
            <li><strong>Comienza a crear</strong> tus primeros cursos</li>
          </ol>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="btn">
              Iniciar Sesión Ahora
            </a>
          </div>
          
          <div class="footer">
            <p><strong>Datos de tu cuenta:</strong></p>
            <p>Email: ${instructorData.email}</p>
            <p>Fecha de registro: ${new Date(instructorData.fecha_registro).toLocaleDateString('es-ES')}</p>
            
            <hr style="margin: 20px 0;">
            
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
            <p><strong>Equipo de Kwan Academy</strong></p>
            <p>📧 soporte@kwanacademy.com | 📞 (+57) 123-456-7890</p>
            
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              Este correo fue enviado automáticamente. Por favor, no respondas a este mensaje.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPasswordEmail
};