import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';
import logohome from '../assets/images/logohome.png';
// import videoFile from '../assets/videos/video.mp4';
import virtual from '../assets/images/virtual.png';
import presencial from '../assets/images/presencial.png';
import training from '../assets/images/training.png';
import certified from '../assets/images/certified.png';


const Home = () => {
  const scrollToSection = () => {
    document.getElementById('1').scrollIntoView({ behavior: 'smooth' });
  };

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('1');
      if (section) {
        const sectionTop = section.offsetTop;
        setShowScrollButton(window.scrollY > sectionTop);
      }
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
    { img: require('../assets/images/wkfcopia.png'), alt: 'Patrocinador 1' },
    { img: require('../assets/images/wtfcopia.png'), alt: 'Patrocinador 2' },
    { img: require('../assets/images/wjfcopia.png'), alt: 'Patrocinador 3' },
    { img: require('../assets/images/wjjfcopia.png'), alt: 'Patrocinador 4' },
  ];

  const testimonios = [
    { img: "https://imgur.com/qtQXR9j.jpg", name: '𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰 ', text: '"El curso fue claro, accesible y muy útil. Aprendí a reaccionar rápido y con precisión. Es una excelente inversión para mejorar tu seguridad personal."' },
    { img: "https://imgur.com/NeNEZQd.jpg", name: '𝘕𝘦𝘺𝘮𝘢𝘳 𝘑𝘳  ', text: '"Me encantó el curso, fue dinámico y fácil de seguir. Aprendí defensa personal de manera práctica y efectiva. Lo recomiendo para cualquier persona."' },
    { img: "https://imgur.com/vnUR4HS.jpg", name: '𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰 ', text: '"Siempre busco la excelencia, y estos cursos la tienen. Aprendí técnicas efectivas y mejoré mis reflejos y autoconfianza. Si quieres ser el mejor, este es el lugar."' },
    { img: "https://imgur.com/ui7B0SQ.jpg", name: '𝘓𝘪𝘰𝘯𝘦𝘭 𝘔𝘦𝘴𝘴𝘪 ', text: '"Kwan Academy me ayudó a mejorar mi rapidez y confianza. El entrenamiento es de alto nivel y muy práctico. Lo recomiendo a quienes buscan seguridad y disciplina."' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <div className={styles.videoContainer}>
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/G5RpJwCJDqc?autoplay=1&mute=1&loop=1&playlist=G5RpJwCJDqc&ontrols=0&showinfo=odestbranding=1&rel=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>


        <div className={styles.overlay}>
          <h1>¿Listo para tomar el control?</h1>
          <p>Convierte el conocimiento en poder. Aprende defensa </p>
          <p>personal de manera efectiva y segura, desarrollando habilidades</p>
          <p>que te brindarán confianza y control en cualquier situación con </p>
          <p>
            <span className={styles.kwan} onClick={scrollToSection}> Kwan Academy. </span>
          </p>
        </div>
      </div>

      <div className={styles.marquee} id='1'>
        <div className={styles.marqueeInner}>
          {patrocinadores.map((patrocinador, index) => (
            <div key={index} className={styles.logoSlide}>
              <img
                src={patrocinador.img}
                alt={patrocinador.alt}
                className={styles.patrocinadorLogo}
              />
            </div>
          ))}
          {/* Duplicamos los logos para garantizar el efecto continuo */}
          {patrocinadores.map((patrocinador, index) => (
            <div key={`duplicate-${index}`} className={styles.logoSlide}>
              <img
                src={patrocinador.img}
                alt={patrocinador.alt}
                className={styles.patrocinadorLogo}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contentSection} id="2">
        <h2>¿Qué ofrecemos?</h2>
        <br />
        <p>En Kwan Academy, transformamos el conocimiento en poder a través de la enseñanza efectiva de defensa personal.</p>
        <p>Nuestra metodología combina lo mejor del aprendizaje virtual y presencial, permitiéndote entrenar desde cualquier</p>
        <p>lugar o perfeccionar tus habilidades en sesiones en vivo con instructores expertos.</p>
        <br /><br />
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <img src={virtual} alt="Método Virtual" />
            <h3>Enseñanza Virtual</h3>
            <p>Aprende defensa personal desde cualquier lugar con clases en vivo y material exclusivo.</p>
          </div>
          <div className={styles.card}>
            <img src={presencial} alt="Método Presencial" />
            <h3>Entrenamiento Presencial</h3>
            <p>Clases prácticas en nuestros dojos con instructores certificados.</p>
          </div>
          <div className={styles.card}>
            <img src={training} alt="Método Híbrido" />
            <h3>Modelo Híbrido</h3>
            <p>Combina sesiones virtuales y presenciales para maximizar tu aprendizaje.</p>
          </div>
          <div className={styles.card}>
            <img src={certified} alt="Certificaciones" />
            <h3>Certificación Oficial</h3>
            <p>Obtén certificaciones avaladas y demuestra tus habilidades en defensa personal.</p>
          </div>
        </div>
      </div>
      <div className={styles.contentSection1} id="3">
        <h2>Valoración y testimonios.</h2>
        <br /><br />
        <p>En Kwan Academy, la satisfacción de nuestros estudiantes es nuestra mayor prioridad. Descubre lo que dicen</p>
        <p>quienes han transformado su confianza y seguridad con nuestra metodología. Sus experiencias reflejan</p>
        <p>el impacto real de nuestro entrenamiento en defensa personal.</p>
        <br /><br />
        <Slider {...settings} className={styles.slider}>
          {testimonios.map((testimonio, index) => (
            <div key={index} className={styles.testimonioSlide}>
              <img src={testimonio.img} alt="Testimonio" />
              <h5>- {testimonio.name}</h5>
              <p>{testimonio.text}</p>
              <p>⭐️⭐️⭐️⭐️</p>
            </div>
          ))}
        </Slider>
      </div>


      <div className={styles.contentSection} id="5">
        <h2>Nuestra Filosofía</h2>
        <br />
        <p>En <span className={styles.kwan}>Kwan Academy</span>, creemos que la seguridad es un derecho, no un privilegio.</p>
        <p>Nos dedicamos a brindar formación de defensa personal accesible, efectiva y de calidad.</p>
        <p>Queremos empoderarte para que puedas moverte por el mundo con confianza y determinación.</p>
        <br />
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <img src={training} alt="Disciplina" />
            <h3>Disciplina</h3>
            <p>El aprendizaje constante y la práctica nos llevan a la excelencia.</p>
          </div>
          <div className={styles.card}>
            <img src={certified} alt="Compromiso" />
            <h3>Compromiso</h3>
            <p>Nuestra misión es ofrecer la mejor formación en defensa personal.</p>
          </div>
          <div className={styles.card}>
            <img src={virtual} alt="Innovación" />
            <h3>Innovación</h3>
            <p>Usamos tecnología avanzada para un aprendizaje más dinámico.</p>
          </div>
        </div>
      </div>
      <div className={styles.contactSection} id="5">
        <div className={styles.contactContainer}>
          {/* Formulario de contacto */}
          <div className={styles.contactForm}>
            <h2>Contacto</h2>
            <form>
              <input type="text" placeholder="Nombre" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Teléfono" required />
              <textarea placeholder="Comentarios" required></textarea>
              <button type="submit">ENVIAR</button>
            </form>
          </div>
          {/* Mapa de Google */}
          <div className={styles.contactMap}>
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.71030466833!2d-75.5832477!3d6.2403122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429b1cb5ec27b%3A0x9677451e86adabb8!2sAcademia%20De%20Defensa%20Personal!5e0!3m2!1ses-419!2sco!4v1741732110084!5m2!1ses-419!2sco"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />

          </div>
        </div>
      </div>
      {showScrollButton && (
        <img src={logohome} alt="Home logo" className={styles.scrollToTop} onClick={scrollToTop} />

      )}

    </div>
  );
};
export default Home;
