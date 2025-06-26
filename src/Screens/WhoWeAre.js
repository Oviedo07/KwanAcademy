import React from "react";
import styles from "./WhoWeAre.module.css";
import teamImage from "../assets/images/course.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Juan Pablo Oviedo",
    role: "Instructor Principal",
    image: "https://i.imgur.com/5vc8liT.png"
  },
  {
    id: 2,
    name: "Esneider Florez Vergara",
    role: "Instructor de Defensa Personal",
    image: "https://i.imgur.com/btRfYn5.png"
  },
  {
    id: 3,
    name: "Eddie Alejandro Arenas",
    role: "Entrenador de Competición",
    image: "https://i.imgur.com/Fprtwg8.png"
  },
  {
    id: 4,
    name: "Jhon Jairo Moguea",
    role: "Instructor de Artes Marciales",
    image: "https://i.imgur.com/muRGzXC.png"
  }
];

const WhoWeAre = () => {
  return (
    <section className={styles.WhoWeAreSection}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>¿Quiénes Somos?</h2>
            <p>
              En <strong>Kwan Academy</strong>, somos una comunidad apasionada por la defensa personal. Nos dedicamos a brindar una formación integral que no solo desarrolla habilidades físicas, sino también valores fundamentales como la disciplina, el respeto y la perseverancia.
            </p>
            
            <p>
              En Kwan Academy, creemos que el aprendizaje es un viaje continuo y que cada estudiante tiene el potencial de superarse a sí mismo. Nos enfocamos en proporcionar herramientas efectivas para el desarrollo personal y la autodefensa en un mundo en constante cambio.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img src={teamImage} alt="Nuestro Equipo" className={styles.image} />
          </div>
        </div>

        {/* Sección de tarjetas del equipo en disposición 2x2 */}
        <div className={styles.teamSection}>
          <h3>Nuestro Equipo</h3>
          <div className={styles.teamGrid}>
            {/* Primera fila */}
            <div className={styles.teamRow}>
              {teamMembers.slice(0, 2).map((member) => (
                <div key={member.id} className={styles.teamCard}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.profileImage}
                  />
                  <h4>{member.name}</h4>
                  <p className={styles.role}>{member.role}</p>
                </div>
              ))}
            </div>
            {/* Segunda fila */}
            <div className={styles.teamRow}>
              {teamMembers.slice(2, 4).map((member) => (
                <div key={member.id} className={styles.teamCard}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.profileImage}
                  />
                  <h4>{member.name}</h4>
                  <p className={styles.role}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default WhoWeAre;