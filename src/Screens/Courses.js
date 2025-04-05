
import { FaSearch, FaUserGraduate, FaClock, FaUsers, FaTag, FaTimes } from "react-icons/fa";
import styles from "./Courses.module.css"; // Importación correcta de CSS Modules
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from "../context/AuthContext";

const courses = [

  {
    id: 1,
    name: "Curso Básico de Defensa Personal",
    price: 49.99,
    description: "Aprende las bases de la defensa personal en situaciones cotidianas.",
    instructor: "Carlos Martínez",
    duration: "8 semanas",
    students: 16,
    category: "Defensa Personal",
    image: "https://img.freepik.com/foto-gratis/cliente-campo-tiro-esta-preparando-equipo-recargar-cargador-pistola_482257-117732.jpg"
  },
  {
    id: 2,
    name: "Técnicas Avanzadas de Taekwondo",
    price: 79.99,
    description: "Mejora tu velocidad y precisión con técnicas avanzadas.",
    instructor: "Laura Sánchez",
    duration: "10 semanas",
    students: 34,
    category: "Artes Marciales",
    image: "https://img.freepik.com/foto-gratis/tiro-medio-personas-asiaticas-practicando-taekwondo_23-2150753761.jpg"
  },
  {
    id: 3,
    name: "Defensa Contra Agresiones Múltiples",
    price: 59.99,
    description: "Estrategias efectivas para enfrentarte a múltiples atacantes.",
    instructor: "Miguel Rodríguez",
    duration: "12 semanas",
    students: 21,
    category: "Defensa Personal",
    image: "https://img.freepik.com/foto-gratis/gente-entrenando-juntos-al-aire-libre-taekwondo_23-2149908491.jpg"
  },
  {
    id: 4,
    name: "Curso de Defensa Personal Urbana",
    price: 39.99,
    description: "Técnicas para defenderte en entornos urbanos y situaciones de riesgo.",
    instructor: "Ana López",
    duration: "6 semanas",
    students: 18,
    category: "Autoprotección",
    image: "https://img.freepik.com/foto-gratis/hombre-mujer-tiro-completo-compitiendo_23-2149235404.jpg"
  },
  {
    id: 5,
    name: "Técnicas para principiantes en Karate",
    price: 29.99,
    description: "Técnicas para defenderte en entornos urbanos y situaciones de riesgo.",
    instructor: "Ana López",
    duration: "7 semanas",
    students: 13,
    category: "Artes Marciales",
    image: "https://img.freepik.com/foto-gratis/jugador-karate-realizando-postura-karate_107420-65076.jpg"
  }
];

const categories = ["Todas las Categorías", "Defensa Personal", "Artes Marciales", "Autoprotección"];
const sortOptions = ["Popularidad", "Precio: Bajo a Alto", "Precio: Alto a Bajo", "Duración"];

const Courses = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = () => {
    if (isAuthenticated) {
      Swal.fire({
        title: 'En desarrollo',
        text: 'Seguimos en desarrollo, vuelve pronto',
        icon: 'info',
        confirmButtonText: 'Entendido'
      });
    } else {
      Swal.fire({
        title: "Acceso denegado",
        text: "No has iniciado sesión, vuelve pronto",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        timer: 3000
      }).then(() => {
        navigate('/SignIn'); // Redirige a la página de inicio de sesión
      });
    }
    closeModal(); // Cierra el modal después de mostrar el mensaje
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las Categorías");
  const [selectedSort, setSelectedSort] = useState("Popularidad");
  const [animatedCourses, setAnimatedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCourses(getFilteredAndSortedCourses());
    }, 100);
    return () => clearTimeout(timer);
  }, );

  const getFilteredAndSortedCourses = () => {
    const filtered = courses.filter((course) => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        selectedCategory === "Todas las Categorías" || 
        course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (selectedSort === "Precio: Bajo a Alto") return a.price - b.price;
      if (selectedSort === "Precio: Alto a Bajo") return b.price - a.price;
      if (selectedSort === "Duración") {
        return parseInt(a.duration) - parseInt(b.duration);
      }
      return b.students - a.students;
    });
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll cuando modal está abierto
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Reactivar scroll
  };

  return (
    <section className={styles["courses-section"]} id="courses">
      <div className={styles["courses-container"]}>
        <div className={styles["courses-header"]}>
          <h2 className={styles["section-title"]}>Explora nuestros cursos</h2>
        </div>

        <div className={styles["search-filter-container"]}>
          <div className={styles["search-bar"]}>
            <FaSearch className={styles["search-icon"]} />
            <input
              type="text"
              placeholder="| Buscar cursos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles["search-input"]}
            />
          </div>

          <div className={styles["filter-container"]}>
            <select 
              className={styles["filter-select"]}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <select 
              className={styles["filter-select"]}
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles["courses-grid"]}>
          {animatedCourses.length > 0 ? (
            animatedCourses.map((course) => (
              <div key={course.id} className={styles["course-card"]}>
                <div className={styles["course-image-container"]}>
                  <img 
                    src={course.image} 
                    alt={course.name} 
                    className={styles["course-image"]} 
                  />
                </div>
                <div className={styles["course-content"]}>
                  <h3 className={styles["course-title"]}>{course.name}</h3>
                  <p className={styles["instructor-name"]}>
                    <FaUserGraduate className={styles["instructor-icon"]} />
                    {course.instructor}
                  </p>
                  <p className={styles["course-description"]}>{course.description}</p>
                  <div className={styles["course-meta"]}>
                    <span><FaClock /> {course.duration}</span>
                    <span><FaUsers /> {course.students} estudiantes</span>
                    <span><FaTag /> {course.category}</span>
                  </div>
                  <button 
                    className={styles["details-button"]}
                    onClick={() => openModal(course)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles["no-results"]}>
              <p>No se encontraron cursos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para detalles del curso */}
      {modalOpen && selectedCourse && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
            <button className={styles["close-modal"]} onClick={closeModal}>
              <FaTimes />
            </button>
            <div className={styles["modal-image-container"]}>
              <img 
                src={selectedCourse.image} 
                alt={selectedCourse.name} 
                className={styles["modal-image"]} 
              />
            </div>
            <div className={styles["modal-details"]}>
              <h2 className={styles["modal-title"]}>{selectedCourse.name}</h2>
              <p className={styles["modal-instructor"]}>
                <FaUserGraduate /> Instructor: {selectedCourse.instructor}
              </p>
              <p className={styles["modal-description"]}>{selectedCourse.description}</p>
              <div className={styles["modal-meta"]}>
                <span><FaClock /> Duración: {selectedCourse.duration}</span>
                <span><FaUsers /> {selectedCourse.students} estudiantes inscritos</span>
                <span><FaTag /> Categoría: {selectedCourse.category}</span>
              </div>
              <div className={styles["modal-price-section"]}>
                <p className={styles["modal-price"]}>${selectedCourse.price}</p>
                <button className={styles["buy-button"]} onClick={handlePurchase} >Comprar ahora</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;