import React from 'react';
import styles from './Home.module.css';
import videoFile from '../assets/videos/video.mp4';
import virtual from '../assets//images/virtual.png';
import presencial from '../assets//images/presencial.png';
import training from '../assets//images/training.png';
import certified from '../assets//images/certified.png';
import testimonio1 from '../assets/images/testimonio1.png';
import testimonio2 from '../assets/images/testimonio2.jpeg';
import testimonio3 from '../assets/images/testimonio3.jpeg';
import testimonio4 from '../assets/images/testimonio4.jpeg';

const Home = () => {
  const scrollToSection = () => {
    document.getElementById('1').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={styles.videoContainer}>
        <video className={styles.video} autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}>
          <h1>¿Listo para tomar el control?</h1>
          <p>Convierte el conocimiento en poder. Aprende defensa personal</p>
          <p>de manera efectiva y segura, desarrollando habilidades</p>
          <p>que te brindarán confianza y control en cualquier situación con </p>
          <p>
            <span className={styles.kwan} onClick={scrollToSection}>
              Kwan Academy.
            </span>
          </p>
        </div>
      </div>
      <div className={styles.contentSection} id="1">
        <h2>¿Qué ofrecemos?</h2>
        <p>En Kwan Academy, transformamos el conocimiento en poder a través de la enseñanza efectiva de defensa personal. </p>
        <p>Nuestra metodología combina lo mejor del aprendizaje virtual y presencial, permitiéndote entrenar desde cualquier </p>
        <p>lugar o perfeccionar tus habilidades en sesiones en vivo con instructores expertos.</p>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <img src= { virtual } alt="Método Virtual" />
            <h3>Enseñanza Virtual</h3>
            <p>Aprende defensa personal desde cualquier lugar con clases en vivo y material exclusivo.</p>
          </div>
          <div className={styles.card}>
            <img src= {presencial} alt="Método Presencial" />
            <h3>Entrenamiento Presencial</h3>
            <p>Clases prácticas en nuestros dojos con instructores certificados.</p>
          </div>
          <div className={styles.card}>
            <img src= {training} alt="Método Híbrido" />
            <h3>Modelo Híbrido</h3>
            <p>Combina sesiones virtuales y presenciales para maximizar tu aprendizaje.</p>
          </div>
          <div className={styles.card}>
            <img src= {certified} alt="Certificaciones" />
            <h3>Certificación Oficial</h3>
            <p>Obtén certificaciones avaladas y demuestra tus habilidades en defensa personal.</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection1} id="2">
        <h2>Valoración y testimonios.</h2>
        
        <div className={styles.cardsContainer1}>
          <div className={styles.card1}>
          <img src= {testimonio1} alt="testimonios" />
          <h5>- 𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰 </h5>
          <p>"El curso fue claro, accesible y muy útil. Aprendí a reaccionar rápido y con precisión. Es una excelente inversión para mejorar tu seguridad personal."</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
            
          </div>
          <div className={styles.card1}>
          <img src= {testimonio2} alt="testimonios" />
          <h5>- 𝘕𝘦𝘺𝘮𝘢𝘳 𝘑𝘳 </h5>
          <p>"Me encantó el curso, fue dinámico y fácil de seguir. Aprendí defensa personal de manera práctica y efectiva. Lo recomiendo para cualquier persona."</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
            
          </div>
          <div className={styles.card1}>
          <img src= {testimonio3} alt="testimonios" />
          <h5>- 𝘓𝘪𝘰𝘯𝘦𝘭 𝘔𝘦𝘴𝘴𝘪 </h5>
          <p>"Academia Kwan me ayudó a mejorar mi rapidez y confianza. El entrenamiento es de alto nivel y muy práctico. Lo recomiendo a quienes buscan seguridad y disciplina."</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
           
          </div>
          <div className={styles.card1}>
          <img src= {testimonio4} alt="testimonios" />
          <h5>- 𝘊𝘳𝘪𝘴𝘵𝘪𝘢𝘯𝘰 𝘙𝘰𝘯𝘢𝘭𝘥𝘰 </h5>
          <p>"Siempre busco la excelencia, y estos cursos la tienen. Aprendí técnicas efectivas y mejoré mis reflejos y autoconfianza. Si quieres ser el mejor, este es el lugar."</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
