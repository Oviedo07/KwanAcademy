import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
import {  FaDumbbell, FaHandshake, FaLightbulb } from 'react-icons/fa';
// Importaciones de imágenes
import logohome from '../assets/images/logohome.png';
import virtual from '../assets/images/virtual.png';
import presencial from '../assets/images/presencial.png';
import training from '../assets/images/training.png';
import certified from '../assets/images/certified.png';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isVisible, setIsVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false
  });

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Control del botón de scroll
      const section = document.getElementById('1');
      if (section) {
        const sectionTop = section.offsetTop;
        setShowScrollButton(scrollY > sectionTop);
      }
      
      // Control de animaciones por sección
      const sections = ['1', '2', '3', '5'];
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const position = element.getBoundingClientRect();
          if (position.top < window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [`section${index + 1}`]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const patrocinadores = [
    { img: require('../assets/images/wkfcopia.png'), alt: 'Patrocinador 1' },
    { img: require('../assets/images/wtfcopia.png'), alt: 'Patrocinador 2' },
    { img: require('../assets/images/wjfcopia.png'), alt: 'Patrocinador 3' },
    { img: require('../assets/images/wjjfcopia.png'), alt: 'Patrocinador 4' },
    { img: require('../assets/images/wkfcopia.png'), alt: 'Patrocinador 5' },
    { img: require('../assets/images/wtfcopia.png'), alt: 'Patrocinador 6' },
    { img: require('../assets/images/wjfcopia.png'), alt: 'Patrocinador 7' },
    { img: require('../assets/images/wjjfcopia.png'), alt: 'Patrocinador 8' },
  ];

  const testimonios = [
    { img: "https://imgur.com/qtQXR9j.jpg", name: '𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰', text: '"El curso fue claro, accesible y muy útil. Aprendí a reaccionar rápido y con precisión. Es una excelente inversión para mejorar tu seguridad personal."' },
    { img: "https://imgur.com/NeNEZQd.jpg", name: '𝘕𝘦𝘺𝘮𝘢𝘳 𝘑𝘳', text: '"Me encantó el curso, fue dinámico y fácil de seguir. Aprendí defensa personal de manera práctica y efectiva. Lo recomiendo para cualquier persona."' },
    { img: "https://imgur.com/vnUR4HS.jpg", name: '𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰', text: '"Siempre busco la excelencia, y estos cursos la tienen. Aprendí técnicas efectivas y mejoré mis reflejos y autoconfianza. Si quieres ser el mejor, este es el lugar."' },
    { img: "https://imgur.com/ui7B0SQ.jpg", name: '𝘓𝘪𝘰𝘯𝘦𝘭 𝘔𝘦𝘴𝘴𝘪', text: '"Kwan Academy me ayudó a mejorar mi rapidez y confianza. El entrenamiento es de alto nivel y muy práctico. Lo recomiendo a quienes buscan seguridad y disciplina."' }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    className: styles.testimonialSlider,
    dotsClass: `slick-dots ${styles.customDots}`,
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/G5RpJwCJDqc?autoplay=1&mute=1&loop=1&playlist=G5RpJwCJDqc&controls=0&showinfo=0&modestbranding=1&rel=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
          <div className={styles.heroContent}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className={styles.heroTitle}>¿LISTO PARA TOMAR <span>EL CONTROL?</span></h1>
              <div className={styles.heroText}>
                <p>Convierte el conocimiento en poder. Aprende defensa personal de manera 
                efectiva y segura, desarrollando habilidades que te brindarán confianza 
                y control en cualquier situación.</p>
              </div>
              <button 
                className={styles.ctaButton}
                onClick={() => scrollToSection('2')}
              >
                DESCUBRE KWAN ACADEMY
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className={styles.partnersSection} id="1">
        <h2 className={styles.sectionTitle}>RESPALDADOS POR</h2>
        <div className={styles.marquee}>
          <div className={styles.marqueeInner}>
            {patrocinadores.concat(patrocinadores).map((patrocinador, index) => (
              <div key={index} className={styles.logoSlide}>
                <img
                  src={patrocinador.img}
                  alt={patrocinador.alt}
                  className={styles.patrocinadorLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <motion.div 
        className={styles.servicesSection} 
        id="2"
        initial="hidden"
        animate={isVisible.section2 ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>NUESTROS SERVICIOS</h2>
          <div className={styles.sectionSubtitle}>
            <p>En Kwan Academy, transformamos el conocimiento en poder a través de la enseñanza efectiva de defensa personal.
            Nuestra metodología combina lo mejor del aprendizaje virtual y presencial, permitiéndote entrenar desde cualquier
            lugar o perfeccionar tus habilidades en sesiones en vivo con instructores expertos.</p>
          </div>
          
          <div className={styles.cardsGrid}>
            <motion.div className={styles.serviceCard} whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(231, 0, 20, 0.2)' }}>
              <div className={styles.cardIcon}>
                <img src={virtual} alt="Método Virtual" />
              </div>
              <h3>Enseñanza Virtual</h3>
              <p>Aprende defensa personal desde cualquier lugar con clases en vivo y material exclusivo.</p>
            </motion.div>
            
            <motion.div className={styles.serviceCard} whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(231, 0, 20, 0.2)' }}>
              <div className={styles.cardIcon}>
                <img src={presencial} alt="Método Presencial" />
              </div>
              <h3>Entrenamiento Presencial</h3>
              <p>Clases prácticas en nuestros dojos con instructores certificados y experiencia.</p>
            </motion.div>
            
            <motion.div className={styles.serviceCard} whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(231, 0, 20, 0.2)' }}>
              <div className={styles.cardIcon}>
                <img src={training} alt="Método Híbrido" />
              </div>
              <h3>Modelo Híbrido</h3>
              <p>Combina sesiones virtuales y presenciales para maximizar tu aprendizaje y desarrollo.</p>
            </motion.div>
            
            <motion.div className={styles.serviceCard} whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(231, 0, 20, 0.2)' }}>
              <div className={styles.cardIcon}>
                <img src={certified} alt="Certificaciones" />
              </div>
              <h3>Certificación Oficial</h3>
              <p>Obtén certificaciones avaladas y demuestra tus habilidades en defensa personal.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className={styles.testimonialsSection} 
        id="3"
        initial="hidden"
        animate={isVisible.section3 ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>TESTIMONIOS</h2>
          <div className={styles.sectionSubtitle}>
            <p>En Kwan Academy, la satisfacción de nuestros estudiantes es nuestra mayor prioridad. Descubre lo que dicen
            quienes han transformado su confianza y seguridad con nuestra metodología.</p>
          </div>
          
          <Slider {...sliderSettings}>
            {testimonios.map((testimonio, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>{testimonio.text}</p>
                  <div className={styles.testimonialRating}>⭐️⭐️⭐️⭐️⭐️</div>
                </div>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonio.img} alt={testimonio.name} className={styles.testimonialImage} />
                  <h4>{testimonio.name}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div 
        className={styles.philosophySection} 
        id="5"
        initial="hidden"
        animate={isVisible.section4 ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>NUESTRA FILOSOFÍA</h2>
          <div className={styles.sectionSubtitle}>
            <p>En <span className={styles.kwanHighlight}>Kwan Academy</span>, creemos que la seguridad es un derecho, no un privilegio.
            Nos dedicamos a brindar formación de defensa personal accesible, efectiva y de calidad.
            Queremos empoderarte para que puedas moverte por el mundo con confianza y determinación.</p>
          </div>
          
          <div className={styles.valuesGrid}>
            <motion.div className={styles.valueCard} whileHover={{ scale: 1.05 }}>
              <div className={styles.valueIcon}>
                <FaDumbbell className={styles.icon} />
              </div>
              <h3>Disciplina</h3>
              <p>El aprendizaje constante y la práctica nos llevan a la excelencia en todo lo que hacemos.</p>
            </motion.div>
            
            <motion.div className={styles.valueCard} whileHover={{ scale: 1.05 }}>
              <div className={styles.valueIcon}>
                <FaHandshake className={styles.icon} />
              </div>
              <h3>Compromiso</h3>
              <p>Nuestra misión es ofrecer la mejor formación en defensa personal para todos.</p>
            </motion.div>
            
            <motion.div className={styles.valueCard} whileHover={{ scale: 1.05 }}>
              <div className={styles.valueIcon}>
                <FaLightbulb className={styles.icon} />
              </div>
              <h3>Innovación</h3>
              <p>Usamos tecnología avanzada para un aprendizaje más dinámico y efectivo.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactFormWrapper}>
            <h2 className={styles.contactTitle}>CONTÁCTANOS</h2>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Nombre completo" required />
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Correo electrónico" required />
              </div>
              <div className={styles.formGroup}>
                <input type="tel" placeholder="Teléfono" required />
              </div>
              <div className={styles.formGroup}>
                <textarea placeholder="¿En qué podemos ayudarte?" rows="4" required></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>ENVIAR MENSAJE</button>
            </form>
          </div>
          
          <div className={styles.contactMap}>
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.71030466833!2d-75.5832477!3d6.2403122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429b1cb5ec27b%3A0x9677451e86adabb8!2sAcademia%20De%20Defensa%20Personal!5e0!3m2!1ses-419!2sco!4v1741732110084!5m2!1ses-419!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <motion.div 
          className={styles.scrollToTopButton}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
        >
          {showScrollButton && (
        <img src={logohome} alt="Home logo" className={styles.ScrollImg} onClick={scrollToTop} />

      )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;