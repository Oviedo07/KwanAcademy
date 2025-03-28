import React from "react";
import { useEffect } from "react";
import "./css/Home.css";
// Importación de logica
import { colors, features, values} from "./utils/FunctionsHomeAdmin";
import { Home as Mail, Phone } from 'lucide-react';
// Importaciones de imágenes
import ciberseguridad from "./img/ciberseguridad.jpg";
import karate from "./img/karate.jpg";
import workteam from "./img/workteam.jpg";
import { Link } from "react-router-dom";


const HomeAdmin = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza al usuario al inicio de la página
  }, []);
  return (
    <div className="home-body" style={{ backgroundColor: colors.cream }}>
      <header className="hero" style={{ 
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${workteam})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-content">
          <h1>Ama lo que haces y mejora tu sitio</h1>
          <p>Administra tu plataforma KwanAcademy con confianza y facilidad</p>
          <Link to="/AdminViews/LoginAdmin" className="cta-button" style={{ backgroundColor: colors.red }}>
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
            <div key={index} className="feature-card" style={{borderColor: feature.color}}>
              <feature.icon 
                color={feature.color} 
                size={50} 
                strokeWidth={1.5}
                className="feature-icon"
              />
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
                <value.icon 
                  color={colors.red} 
                  size={40} 
                  strokeWidth={1.5}
                  className="value-icon"
                />
                <h5>{value.title}</h5>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
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