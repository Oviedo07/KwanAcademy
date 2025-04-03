import React, { useState } from "react";
import styles from "./FreeResources.module.css";
import { FaSearch } from "react-icons/fa";

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
    image: "https://img.freepik.com/free-photo/front-view-teen-practicing-taekwondo_23-2150260458.jpg",
    description: "Aprende las 5 técnicas fundamentales de pateo en Taekwondo que mejorarán tu técnica y te darán mayor potencia en tus movimientos. Este curso está diseñado tanto para principiantes como para practicantes experimentados."
  },
  { 
    id: 2, 
    title: "Introducción al Karate", 
    category: "Karate", 
    duration: "15 minutos", 
    views: "24",
    image: "https://img.freepik.com/foto-gratis/gente-entrenando-juntos-al-aire-libre-taekwondo_23-2149908491.jpg",
    description: "Descubre los fundamentos del Karate, su historia y filosofía. Este curso introductorio te guiará a través de las posturas básicas y los primeros movimientos para iniciar tu camino en este arte marcial."
  },
  { 
    id: 3, 
    title: "¿Qué es la Defensa personal?", 
    category: "Videos", 
    duration: "12 minutos", 
    views: "56",
    image: "https://img.freepik.com/foto-gratis/paciente-haciendo-rehabilitacion-fisica-ayudado-terapeutas_23-2149227855.jpg",
    description: "Una introducción completa al concepto de defensa personal y su importancia en el mundo actual. Aprende los principios básicos que te ayudarán a mantenerte seguro en situaciones de riesgo."
  },
  { 
    id: 4, 
    title: "Defensa cuerpo a cuerpo", 
    category: "Defensa básica", 
    duration: "18 minutos", 
    views: "93",
    image: "https://img.freepik.com/foto-gratis/hombre-mujer-tiro-completo-compitiendo_23-2149235404.jpg",
    description: "Técnicas efectivas para defenderte en situaciones de confrontación directa. Este curso te enseñará movimientos prácticos para protegerte y escapar de agresiones físicas."
  },
  { 
    id: 5, 
    title: "Defensa contra arma blanca", 
    category: "Defensa intermedia", 
    duration: "8 minutos", 
    views: "17",
    image: "https://img.freepik.com/foto-gratis/vista-frontal-mujer-joven-camisa-roja-boca-atada-asustada-cuchillo-espacio-crema-pano-femenino-foto-violencia-domestica_140725-28702.jpg",
    description: "Aprende técnicas avanzadas para protegerte contra amenazas con armas blancas. Este curso incluye estrategias de evasión, bloqueo y contraataque en situaciones de alto riesgo."
  },
  { 
    id: 6, 
    title: "Defensa contra arma de fuego", 
    category: "Defensa avanzada", 
    duration: "20 minutos", 
    views: "64",
    image: "https://img.freepik.com/foto-gratis/cliente-campo-tiro-esta-preparando-equipo-recargar-cargador-pistola_482257-117732.jpg",
    description: "Curso especializado en técnicas de supervivencia frente a amenazas con armas de fuego. Aprenderás protocolos de seguridad y respuestas tácticas para situaciones extremas."
  },
  { 
    id: 7, 
    title: "5 Técnicas de puño", 
    category: "Taekwondo", 
    duration: "25 minutos", 
    views: "78",
    image: "https://img.freepik.com/foto-gratis/gente-mostrando-gesto-manos-taekwondo_23-2149908497.jpg",
    description: "Domina las técnicas fundamentales de golpeo con puño en Taekwondo. Este curso te enseñará la forma correcta de ejecutar golpes potentes mientras mantienes una técnica depurada."
  },
  { 
    id: 8, 
    title: "Artes marciales en la vida diaria", 
    category: "Karate", 
    duration: "16 minutos", 
    views: "30",
    image: "https://img.freepik.com/foto-gratis/tiro-medio-personas-asiaticas-practicando-taekwondo_23-2150753761.jpg",
    description: "Descubre cómo aplicar los principios de las artes marciales en tu vida cotidiana. Este curso te muestra cómo la disciplina y filosofía del Karate pueden mejorar tu bienestar físico y mental."
  },
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
    <div className={styles.container}>
      <h2 className={styles.title}>Técnicas Gratuitas</h2>
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
                <button className={styles.viewButton}>Ver técnica →</button>
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
            <p>No se encontraron técnicas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedResource && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
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
                <button className={styles.buyButton}>Ir al Curso</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeResources;