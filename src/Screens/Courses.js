import React, { useState } from "react";
import styles from "../screens/Courses.module.css";
import curso from "../assets/images/course.jpg";
import { FaSearch } from "react-icons/fa";

const courses = [
  {
    id: 1,
    name: "Curso Básico de Defensa Personal",
    price: 49.99,
    description: "Aprende las bases de la defensa personal en situaciones cotidianas.",
    instructor: "Carlos Martínez",
    duration: "8 semanas",
    students: 16,
    category: "Defensa Personal"
  },
  {
    id: 2,
    name: "Técnicas Avanzadas de Taekwondo",
    price: 79.99,
    description: "Mejora tu velocidad y precisión con técnicas avanzadas.",
    instructor: "Laura Sánchez",
    duration: "10 semanas",
    students: 34,
    category: "Taekwondo"
  },
  {
    id: 3,
    name: "Defensa Contra Agresiones Múltiples",
    price: 59.99,
    description: "Estrategias efectivas para enfrentarte a múltiples atacantes.",
    instructor: "Miguel Rodríguez",
    duration: "12 semanas",
    students: 21,
    category: "Defensa Personal"
  },
  {
    id: 4,
    name: "Curso de Autoprotección Urbana",
    price: 39.99,
    description: "Técnicas para defenderte en entornos urbanos y situaciones de riesgo.",
    instructor: "Ana López",
    duration: "6 semanas",
    students: 18,
    category: "Autoprotección"
  }
];

const categories = ["Categorías", "Defensa Personal", "Taekwondo", "Autoprotección"];
const sortOptions = ["Popularidad", "Precio: Bajo a Alto", "Precio: Alto a Bajo", "Duración"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categorías");
  const [selectedSort, setSelectedSort] = useState("Popularidad");
  // const [activeTab, setActiveTab] = useState("Todos los Cursos");

  // Filtrar cursos basados en la búsqueda y categoría
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Categorías" || 
                           course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Ordenar cursos
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (selectedSort === "Precio: Bajo a Alto") return a.price - b.price;
    if (selectedSort === "Precio: Alto a Bajo") return b.price - a.price;
    if (selectedSort === "Duración") {
      return parseInt(a.duration) - parseInt(b.duration);
    }
    // Por defecto, ordenar por popularidad (número de estudiantes)
    return b.students - a.students;
  });

  return (
    <section className={styles.coursesSection} id="1">
      <div className={styles.coursesContainer}>
        <h2 className={styles.sectionTitle}>Explora nuestros cursos.</h2>
        <p>Descubra una amplia gama de cursos para mejorar sus competencias</p> 
        <p>y avanzar en su aprendizaje.</p>
        <br/>
        
        {/* Barra de búsqueda y filtros */}
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="| Buscar cursos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterContainer}>
            <select 
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select 
              className={styles.filterSelect}
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            
          </div>
        </div>

       

        {/* Grid de cursos */}
        <div className={styles.coursesGrid}>
          {sortedCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseImageContainer}>
                <img src={curso} alt={course.name} className={styles.courseImage} />
              </div>
              <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.name}</h3>
                <p className={styles.instructorName}>Instructor: {course.instructor}</p>
                <p className={styles.courseDescription}>{course.description}</p>
                
                <div className={styles.courseDetails}>
                  <div className={styles.detailItem}>
                    <span>Duración: {course.duration}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Estudiantes: {course.students}</span>
                  </div>
                </div>
                
                <div className={styles.courseFooter}>
                  <span className={styles.price}>${course.price}</span>
                  <div className={styles.buttonGroup}>
                    <button className={styles.detailsButton}>Detalles</button>
                    <button className={styles.buyButton} onClick={() => alert("Comprado con exito")}>Comprar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default Courses;
