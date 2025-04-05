import React, { useEffect } from "react";
import "./css/Home.css";
// Importación de iconos
import { 
  Shield, 
  Clock, 
  Users, 
  BarChart, 
  Award, 
  Heart, 
  Lock, 
  BookOpen,
  Monitor,
  UserCheck,
  Layers,
  Award as CertificateIcon
} from 'lucide-react';
// Importaciones de imágenes
import ciberseguridad from "./img/ciberseguridad.jpg";
import karate from "./img/karate.jpg";
import workteam from "./img/workteam.jpg";
import { Link } from "react-router-dom";

// Definición de colores y datos
const colors = {
  red: "#E70014",
  redLight: "#FF3341",
  redDark: "#C60012",
  black: "#1A1A1A",
  grayDark: "#333333",
  grayMedium: "#666666",
  grayLight: "#EBEBEB",
  white: "#FFFFFF"
};

const features = [
  {
    icon: Shield,
    title: "Seguridad Avanzada",
    description: "Protección robusta para todos los usuarios y datos de la plataforma.",
    color: colors.red
  },
  {
    icon: Clock,
    title: "Gestión Eficiente",
    description: "Optimiza tu tiempo con herramientas de administración intuitivas.",
    color: colors.red
  },
  {
    icon: Users,
    title: "Control de Usuarios",
    description: "Administra fácilmente estudiantes, instructores y personal.",
    color: colors.red
  },
  {
    icon: BarChart,
    title: "Análisis Detallado",
    description: "Estadísticas completas para mejorar el rendimiento de tu plataforma.",
    color: colors.red
  }
];

const values = [
  {
    icon: Award,
    title: "Excelencia",
    description: "Comprometidos con los más altos estándares de calidad educativa."
  },
  {
    icon: Heart,
    title: "Pasión",
    description: "Amor por la enseñanza y el crecimiento personal de nuestros estudiantes."
  },
  {
    icon: Lock,
    title: "Confianza",
    description: "Base fundamental en todas nuestras relaciones e interacciones."
  },
  {
    icon: BookOpen,
    title: "Innovación",
    description: "Mejora continua de nuestras metodologías y tecnologías."
  }
];

const servicios = [
  {
    icon: Monitor,
    title: "Enseñanza Virtual",
    description: "Aprende defensa personal desde cualquier lugar con clases en vivo y material exclusivo."
  },
  {
    icon: UserCheck,
    title: "Entrenamiento Presencial",
    description: "Clases prácticas en nuestros dojos con instructores certificados y experiencia."
  },
  {
    icon: Layers,
    title: "Modelo Híbrido",
    description: "Combina sesiones virtuales y presenciales para maximizar tu aprendizaje y desarrollo."
  },
  {
    icon: CertificateIcon,
    title: "Certificación Oficial",
    description: "Obtén certificaciones avaladas y demuestra tus habilidades en defensa personal."
  }
];

const HomeAdmin = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza al usuario al inicio de la página
  }, []);

  return (
    <div className="home-body">
      <header className="hero" style={{ 
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${workteam})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-content">
          <h1>Ama lo que haces y mejora tu sitio</h1>
          <p>Administra tu plataforma Kwan Academy con confianza y facilidad</p>
          <Link to="/AdminViews/LoginAdmin" className="cta-button">
            Empieza ahora
          </Link>
        </div>
      </header>

      <section id="quienes-somos" className="quienes-somos-container">
        <div className="section-header">
          <h2>¿Quiénes Somos?</h2>
          <p>En KwanAcademy, transformamos la gestión de plataformas educativas</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon 
                  color={feature.color} 
                  size={40} 
                  strokeWidth={1.5}
                />
              </div>
              <h4 style={{color: feature.color}}>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="values-section">
          <h3>Nuestros Valores</h3>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon 
                    color={colors.red} 
                    size={32} 
                    strokeWidth={1.5}
                  />
                </div>
                <h5>{value.title}</h5>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="servicios-section">
        <div className="section-header">
          <h2>Nuestros Servicios</h2>
          <p>En KwanAcademy, transformamos el conocimiento en poder a través de la enseñanza 
          efectiva de defensa personal. Nuestra metodología combina lo mejor del aprendizaje 
          virtual y presencial.</p>
        </div>

        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <div key={index} className="servicio-card">
              <div className="feature-icon">
                <servicio.icon 
                  color={colors.red} 
                  size={40} 
                  strokeWidth={1.5}
                />
              </div>
              <h3>{servicio.title}</h3>
              <p>{servicio.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="beneficios" className="benefits-section">
        <h2>Lo que puedes hacer</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <img src={workteam} alt="Equipo de trabajo" />
            <div className="benefit-content">
              <h5>Expande tu equipo</h5>
              <p>Añade administradores para mejorar la supervisión del sitio.</p>
            </div>
          </div>
          <div className="benefit-card">
            <img src={karate} alt="Calidad" />
            <div className="benefit-content">
              <h5>Garantiza calidad</h5>
              <p>Supervisa los cursos y asegura su confiabilidad.</p>
            </div>
          </div>
          <div className="benefit-card">
            <img src={ciberseguridad} alt="Seguridad" />
            <div className="benefit-content">
              <h5>Protege a tus usuarios</h5>
              <p>Evita riesgos con medidas de ciberseguridad.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAdmin;