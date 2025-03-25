import React from "react";
import styles from "../screens/Courses.module.css";
import curso from "../assets/images/course.jpg";

const courses = [
  {
    id: 1,
    name: "Curso Básico de Defensa Personal",
    price: "$49.99",
    description: "Aprende las bases de la defensa personal en situaciones cotidianas."
  },
  {
    id: 2,
    name: "Técnicas Avanzadas de Taekwondo",
    price: "$79.99",
    description: "Mejora tu velocidad y precisión con técnicas avanzadas."
  },
  {
    id: 3,
    name: "Defensa Contra Agresiones Múltiples",
    price: "$59.99",
    description: "Estrategias efectivas para enfrentarte a múltiples atacantes."
  },
  {
    id: 4,
    name: "Curso de Autoprotección Urbana",
    price: "$39.99",
    description: "Técnicas para defenderte en entornos urbanos y situaciones de riesgo."
  }
];

const Courses = () => {
  return (
    <section id="1">
      <div className={styles.coursesContainer}>
        <h2 className={styles.sectionTitle}>Tienda de Cursos</h2>
        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <img src={curso} alt="foto" className={styles.imgCompra} />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <span className={styles.price}>${course.price}</span>
              <button className={styles.buyButton} onClick={() => alert("Comprado con exito")}>Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default Courses;
