import React from "react";
import styles from "./MissionVission.module.css";
import missionImage from "../assets/images/course.jpg";

const OurMission = () => {
  return (
    <section className={styles.MissionVissionSection}>
      <div className={styles.missionContainer}>
        <div className={styles.missionContent}>
          <h2>Nuestra Misión</h2>
          <p>
            En <strong>Kwan Academy</strong>, nuestra misión es proporcionar a cada persona las habilidades necesarias para defenderse con confianza y seguridad en cualquier situación. Nos comprometemos a brindar formación de alta calidad en defensa personal y artes marciales, combinando técnicas efectivas con principios de disciplina, respeto y autocontrol.
          </p>
          <p>
            Creemos en el poder del conocimiento aplicado y en la capacidad de cada individuo para desarrollar su máximo potencial a través del entrenamiento. Nuestra academia no solo enseña técnicas, sino que también fomenta la mentalidad y la actitud necesarias para enfrentar desafíos con determinación.
          </p>
          <p>
            Nos esforzamos por crear una comunidad fuerte, donde cada estudiante pueda crecer física y mentalmente, construyendo confianza y habilidades que trascienden más allá del tatami.
          </p>
        </div>
        <div className={styles.missionImageContainer}>
          <img
            src={missionImage}
            alt="Nuestra Misión"
            className={styles.missionImage}
          />
        </div>
        <div className={styles.missionContent}>
          <h2>Nuestra Visión</h2>
          <p>
            En <strong>Kwan Academy</strong>, aspiramos a ser la academia de referencia en formación en defensa personal y artes marciales, destacándonos por nuestra excelencia, innovación y compromiso con el desarrollo integral de nuestros estudiantes.
          </p>
          <p>
            Nuestra visión es transformar vidas a través de la enseñanza, creando un impacto positivo en la sociedad mediante valores como la disciplina, la perseverancia y el respeto. Buscamos expandir nuestra comunidad y brindar oportunidades de aprendizaje accesibles y efectivas para personas de todas las edades y niveles de experiencia.
          </p>
          <p>
            Con un enfoque en la mejora continua y la adaptación a nuevas metodologías de enseñanza, nos proponemos marcar la diferencia en la educación en defensa personal, permitiendo que cada estudiante alcance su máximo potencial y se convierta en una mejor versión de sí mismo.
          </p>
        </div>
        <div className={styles.missionImageContainer}>
          <img
            src={missionImage}
            alt="Nuestra Visión"
            className={styles.missionImage}
          />
        </div>
      </div>
    </section>

  );
};

export default OurMission;