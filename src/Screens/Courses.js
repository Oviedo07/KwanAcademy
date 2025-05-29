import { FaSearch, FaUserGraduate, FaClock, FaUsers, FaTag, FaTimes, FaCalendar } from "react-icons/fa";
import styles from "./Courses.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from "../context/AuthContext";
import api from "../axios.js"; // Importamos la instancia configurada de axios
import PayPalButton from "../Components/PayPalButton";


const sortOptions = ["Popularidad", "Precio: Bajo a Alto", "Precio: Alto a Bajo", "Fecha: Más reciente"];

const Courses = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las Categorías");
  const [selectedSort, setSelectedSort] = useState("Popularidad");
  const [animatedCourses, setAnimatedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useStaticData, setUseStaticData] = useState(true); // Bandera para usar datos estáticos

  // Función para cargar los cursos desde la API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Intentamos cargar desde la API
      const response = await api.get('/api/getAllcursos');

      if (response.data && response.data.length > 0) {
        // Si hay datos, actualizamos el estado
        const coursesWithDetails = response.data.map(course => ({
          ...course,
          // Asignamos valores por defecto para campos que podrían faltar
          duration: course.duration || `${Math.floor(Math.random() * 5) + 8} semanas`,
          students: course.students || Math.floor(Math.random() * 50) + 10,
          category: course.category || "General"
        }));

        setCourses(coursesWithDetails);
        setUseStaticData(false);
      } else {
        // Si no hay datos, usamos los estáticos
        console.log("No se recibieron datos de la API, usando datos estáticos");
        setUseStaticData(true);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar los cursos:", err);
      console.log("Usando datos estáticos debido al error");
      setUseStaticData(true);
      setLoading(false);
    }
  };

  // Función para cargar las categorías
  // const fetchCategories = async () => {
  //   try {
  //     // Solo intentamos si estamos usando datos de la API
  //     if (!useStaticData) {
  //       const response = await api.get('api/getCategorias/todas');
  //       if (response.data && response.data.length > 0) {
  //         setCategories(["Todas las Categorías", ...response.data]);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error al cargar las categorías:", err);
  //     // Si hay error, mantenemos las categorías estáticas
  //   }
  // };

  useEffect(() => {
    // Cargar datos al montar el componente
    fetchCourses();
  }, []);

  // useEffect(() => {
  //   // Cargar categorías después de decidir si usamos datos estáticos o de API asdwasd
  //   fetchCategories();
  // }, [useStaticData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCourses(getFilteredAndSortedCourses());
    }, 100);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedSort, courses]);

  const getFilteredAndSortedCourses = () => {
    if (!courses.length) return [];

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
      if (selectedSort === "Fecha: Más reciente") {
        // Verificamos si existe la fecha de creación
        if (a.fecha_creacion && b.fecha_creacion) {
          return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
        }
        return 0;
      }
      // Por defecto, ordenar por popularidad (número de estudiantes)
      return b.students - a.students;
    });
  };

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

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll cuando modal está abierto
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Reactivar scroll
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return "Fecha no válida";
    }
  };

  if (loading) {
    return (
      <section className={styles["courses-section"]} id="courses">
        <div className={styles["courses-container"]}>
          <div className={styles["courses-header"]}>
            <h2 className={styles["section-title"]}>Cargando cursos...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles["courses-section"]} id="courses">
      <div className={styles["courses-container"]}>
        <div className={styles["courses-header"]}>
          <h2 className={styles["section-title"]}>Explora nuestros cursos</h2>
        </div>
        <p className={styles.subtitle}>
          Con nuestros cursos premium podrás transformar y afianzar tu aprendizaje en resultados reales.
        </p>
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

              {selectedCourse.objetivos && (
                <div className={styles["modal-objectives"]}>
                  <h3>Objetivos del curso:</h3>
                  <p>{selectedCourse.objetivos}</p>
                </div>
              )}  

              <div className={styles["modal-meta"]}>
                <span><FaClock /> Duración: {selectedCourse.duration}</span>
                <span><FaUsers /> {selectedCourse.students} estudiantes inscritos</span>
                <span><FaTag /> Categoría: {selectedCourse.category}</span>
                {selectedCourse.fecha_creacion && (
                  <span><FaCalendar /> Creado: {formatDate(selectedCourse.fecha_creacion)}</span>
                )}
              </div>
              <div className={styles["modal-price-section"]}>
                <p className={styles["modal-price"]}> {selectedCourse.price}</p>
                {/* Botón de PayPal */}
              <PayPalButton 
                price={selectedCourse.price} 
                courseId={selectedCourse.id}
                courseName={selectedCourse.name}
                courseInstructor={selectedCourse.instructor}
              />  
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;