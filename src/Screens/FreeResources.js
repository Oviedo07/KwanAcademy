import React, { useState } from "react";
import styles from "./FreeResources.module.css";
import { FaTimes, FaSearch } from "react-icons/fa";
import { Link } from "react-scroll";

// Agregando categorías de recursos
const categories = [
  "Todos",
  "Taekwondo",
  "Karate",
  "Videos",
  "Defensa básica",
  "Defensa intermedia",
  "Defensa avanzada",
];

// Agregando descripciones a los recursos
const resources = [
  {
    id: 1,
    title: "5 Técnicas de pateo",
    category: "Taekwondo",
    duration: "30 minutos",
    views: "166",
    image: "https://img.freepik.com/foto-gratis/hombre-asiatico-tiro-completo-practicando-taekwondo_23-2150260495.jpg",
    description: "Aprende las 5 técnicas fundamentales de pateo en Taekwondo que mejorarán tu técnica y te darán mayor potencia en tus movimientos. Este curso está diseñado tanto para principiantes como para practicantes experimentados.",
    link: "https://gamma.app/docs/Maestria-del-Pateo-en-Taekwondo-ym6zlvlthmxzefn"
  },
  {
    id: 2,
    title: "¿Qué es la Defensa personal?",
    category: "Videos",
    duration: "12 minutos",
    views: "56",
    image: "https://img.freepik.com/foto-gratis/paciente-haciendo-rehabilitacion-fisica-ayudado-terapeutas_23-2149227855.jpg",
    description: "Una introducción completa al concepto de defensa personal y su importancia en el mundo actual. Aprende los principios básicos que te ayudarán a mantenerte seguro en situaciones de riesgo.",
    link: "https://www.youtube.com/watch?v=6Rxz_x8MNsc"
  },
  {
    id: 3,
    title: "Introducción a la defensa personal",
    category: "Defensa básica",
    duration: "18 minutos",
    views: "93",
    image: "https://img.freepik.com/foto-gratis/hombre-mujer-tiro-completo-compitiendo_23-2149235404.jpg",
    description: "Técnicas efectivas para defenderte en situaciones de confrontación directa. Este curso te enseñará movimientos prácticos para protegerte y escapar de agresiones físicas.",
    link: "https://gamma.app/docs/Introduccion-a-la-Defensa-Personal-Protege-tu-Espacio-4kskrqy8kg3oiyq"
  },
  {
    id: 4,
    title: "Defensa contra arma de fuego",
    category: "Defensa avanzada",
    duration: "20 minutos",
    views: "64",
    image: "https://img.freepik.com/foto-gratis/cliente-campo-tiro-esta-preparando-equipo-recargar-cargador-pistola_482257-117732.jpg",
    description: "Curso especializado en técnicas de supervivencia frente a amenazas con armas de fuego. Aprenderás protocolos de seguridad y respuestas tácticas para situaciones extremas.",
    link:"https://gamma.app/docs/Defensa-Personal-Contra-Ataques-con-Armas-de-Fuego-shm5zr0h6ntfk2u"
  }
];

const FreeResources = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Filtrado combinado por categoría y búsqueda
  const filteredResources = resources
    .filter(resource => selectedCategory === "Todos" || resource.category === selectedCategory)
    .filter(resource => resource.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Función para abrir el modal con el recurso seleccionado
  const openModal = (resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.FreeResourcesSection}>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>Técnicas Gratuitas</h2>
        </div>

        <p className={styles.subtitle}>
          Recursos educativos gratuitos para ayudarte a comenzar tu viaje de aprendizaje.
        </p>

        {/* Barra de búsqueda */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>
              <FaSearch className={styles.searchIcon} />
            </span>
            <input
              type="text"
              placeholder="| Buscar técnicas"
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
              <option value="Todos">Categorías</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de recursos */}
        <div className={styles.grid}>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className={styles.cardImage}
                  />
                </div>
                <button className={styles.categoryLabel}>{resource.category}</button>
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardDetails}>
                  ⏱ {resource.duration} &nbsp; 👁 {resource.views}
                </p>
                <div className={styles.cardButtons}>
                  {/* <button className={styles.viewButton}>Ver técnica →</button> */}
                  <button
                    className={styles.detailsButton}
                    onClick={() => openModal(resource)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron cursos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {modalOpen && selectedResource && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={closeModal}><FaTimes /></button>
              <div className={styles.modalContent}>
                <div className={styles.modalImageContainer}>
                  <img
                    src={selectedResource.image}
                    alt={selectedResource.title}
                    className={styles.modalImage}
                  />
                </div>
                <div className={styles.modalInfo}>
                  <span className={styles.modalCategory}>{selectedResource.category}</span>
                  <h2 className={styles.modalTitle}>{selectedResource.title}</h2>
                  <p className={styles.modalDuration}>⏱ Duración: {selectedResource.duration}</p>
                  <p className={styles.modalDescription}>{selectedResource.description}</p>
                  <button
                    className={styles.buyButton}
                    onClick={() => {
                      if (selectedResource.link) {
                        window.open(selectedResource.link, "_blank");
                      } else {
                        alert("Este curso aún no tiene un enlace disponible.");
                      }
                    }}
                  >
                    Ir al Curso
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeResources;