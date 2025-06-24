import React from "react";
import styles from "./MissionVission.module.css";
import missionImage from "../assets/images/fondo.jpg";
import vissionImage from "../assets/images/fondo1.jpg";

const OurMission = () => {
  return (
    <section className={styles.MissionVissionSection}>
      <div className={styles.missionContainer}>
        <div className={styles.missionContent}>
          <h2>Nuestra Misión</h2>
          <p>
            En <strong>Kwan Academy</strong>, nuestra misión es brindar a cada persona las habilidades necesarias para defenderse con confianza y seguridad, ofreciendo formación de alta calidad en defensa personal y artes marciales, basada en la disciplina, el respeto y el autocontrol.
          </p>
          <p>
            Creemos en el poder del conocimiento aplicado y en el desarrollo del potencial individual a través del entrenamiento, fomentando una actitud determinada ante los desafíos.
          </p>
          <p>
            Nos comprometemos a formar una comunidad sólida, donde los estudiantes crezcan física y mentalmente, fortaleciendo su confianza y habilidades más allá del tatami.
          </p>

        </div>
        <div className={styles.missionImageContainer}>
          <img
            src={missionImage}
            alt="Nuestra Misión"
            className={styles.missionImage}
          />
        </div>

        <div className={styles.missionImageContainer}>
          <img
            src={vissionImage}
            alt="Nuestra Visión"
            className={styles.missionImage}
          />
        </div>
        <div className={styles.missionContent}>
          <h2>Nuestra Visión</h2>
          <p>
            En <strong>Kwan Academy</strong>, aspiramos a convertirnos en la academia de referencia en formación en defensa personal y artes marciales, destacándonos por nuestra excelencia, innovación y compromiso con el crecimiento integral de nuestros estudiantes.
          </p>
          <p>
            Nuestra visión es impactar positivamente en la sociedad a través de la enseñanza de valores como la disciplina, la perseverancia y el respeto. Queremos expandir nuestra comunidad, ofreciendo oportunidades de aprendizaje accesibles y efectivas para todas las edades y niveles.
          </p>
          <p>
            Apostamos por la mejora continua y la adaptación a nuevas metodologías, para que cada estudiante alcance su máximo potencial y se convierta en una mejor versión de sí mismo.
          </p>

        </div>

      </div>
    </section>

  );
};

export default OurMission;