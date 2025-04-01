import React, { useState } from "react";
import styles from "./FreeResources.module.css";
import { FaSearch } from "react-icons/fa";
// Importa tus imágenes (asegúrate de tenerlas en tu proyecto)
// import imgTecnicasPateo from "../assets/img/patada.jpg";
// import imgIntroKarate from "../assets/img/intro_karate.jpg";
// import imgDefensaPersonal from "../assets/img/DefensaPersonal.jpg";
// import imgCuerpoACuerpo from "../assets/img/CuerpoACuerpo.jpg";
// import imgArmaBlanca from "../assets/img/ArmaBlanca.jpg";
// import imgArmaFuego from "../assets/img/ArmaFuego.jpg";
// import imgTecnicasPuño from "../assets/img/puno.jpg";
// import imgArtesMarciales from "../assets/img/ArtesMarciales.jpg";

const categories = [
  "Todos",
  "Taekwondo",
  "Karate",
  "Videos",
  "Defensa básica",
  "Defensa intermedia",
  "Defensa avanzada",
];

const resources = [
  { 
    id: 1, 
    title: "5 Técnicas de pateo", 
    category: "Taekwondo", 
    duration: "30 minutos", 
    views: "166",
    image: "https://img.freepik.com/free-photo/front-view-teen-practicing-taekwondo_23-2150260458.jpg"
  },
  { 
    id: 2, 
    title: "Introducción al Karate", 
    category: "Karate", 
    duration: "15 minutos", 
    views: "24",
    image: "https://img.freepik.com/foto-gratis/gente-entrenando-juntos-al-aire-libre-taekwondo_23-2149908491.jpg"
  },
  { 
    id: 3, 
    title: "¿Qué es la Defensa personal?", 
    category: "Videos", 
    duration: "12 minutos", 
    views: "56",
    image: "https://img.freepik.com/foto-gratis/paciente-haciendo-rehabilitacion-fisica-ayudado-terapeutas_23-2149227855.jpg"
  },
  { 
    id: 4, 
    title: "Defensa cuerpo a cuerpo", 
    category: "Defensa básica", 
    duration: "18 minutos", 
    views: "93",
    image: "https://img.freepik.com/foto-gratis/hombre-mujer-tiro-completo-compitiendo_23-2149235404.jpg"
  },
  { 
    id: 5, 
    title: "Defensa contra arma blanca", 
    category: "Defensa intermedia", 
    duration: "8 minutos", 
    views: "17",
    image: "https://img.freepik.com/foto-gratis/vista-frontal-mujer-joven-camisa-roja-boca-atada-asustada-cuchillo-espacio-crema-pano-femenino-foto-violencia-domestica_140725-28702.jpg"
  },
  { 
    id: 6, 
    title: "Defensa contra arma de fuego", 
    category: "Defensa avanzada", 
    duration: "20 minutos", 
    views: "64",
    image: "https://img.freepik.com/foto-gratis/cliente-campo-tiro-esta-preparando-equipo-recargar-cargador-pistola_482257-117732.jpg"
  },
  { 
    id: 7, 
    title: "5 Técnicas de puño", 
    category: "Taekwondo", 
    duration: "25 minutos", 
    views: "78",
    image: "https://img.freepik.com/foto-gratis/gente-mostrando-gesto-manos-taekwondo_23-2149908497.jpg"
  },
  { 
    id: 8, 
    title: "Artes marciales en la vida diaria", 
    category: "Karate", 
    duration: "16 minutos", 
    views: "30",
    image: "https://img.freepik.com/foto-gratis/tiro-medio-personas-asiaticas-practicando-taekwondo_23-2150753761.jpg"
  },
];

const FreeResources = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrado combinado por categoría y búsqueda
  const filteredResources = resources
    .filter(resource => selectedCategory === "Todos" || resource.category === selectedCategory)
    .filter(resource => resource.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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

      {/* Categorías */}
      {/* <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div> */}

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
              <span className={styles.categoryLabel}>{resource.category}</span>
              <h3 className={styles.cardTitle}>{resource.title}</h3>
              <p className={styles.cardDetails}>
                ⏱ {resource.duration} &nbsp; 👁 {resource.views}
              </p>
              <button className={styles.viewButton}>Ver técnica →</button>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No se encontraron técnicas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeResources;