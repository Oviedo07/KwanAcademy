import React, { useState } from "react";
import styles from "./FreeResources.module.css";

const categories = [
  "Todos",
  "Educación",
  "Programación",
  "Marketing",
  "Diseño",
  "Productividad",
  "Tecnología",
  "Fotografía",
  "Finanzas",
];

const resources = [
  { id: 1, title: "5 Técnicas de Estudio", category: "Educación", duration: "10 minutos", views: "12.500" },
  { id: 2, title: "Introducción a la Programación", category: "Programación", duration: "15 minutos", views: "9.800" },
  { id: 3, title: "Fundamentos de Marketing", category: "Marketing", duration: "12 minutos", views: "8.300" },
  { id: 4, title: "Principios de Diseño", category: "Diseño", duration: "18 minutos", views: "7.200" },
  { id: 5, title: "Gestión Eficiente del Tiempo", category: "Productividad", duration: "8 minutos", views: "10.500" },
  { id: 6, title: "Introducción a la IA", category: "Tecnología", duration: "20 minutos", views: "6.800" },
  { id: 7, title: "Fotografía Básica con Teléfono", category: "Fotografía", duration: "14 minutos", views: "9.100" },
  { id: 8, title: "Principios de Finanzas", category: "Finanzas", duration: "16 minutos", views: "8.700" },
];

const FreeResources = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredResources = selectedCategory === "Todos"
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Técnicas Gratuitas</h2>
      <p className={styles.subtitle}>
        Recursos educativos gratuitos para ayudarte a comenzar tu viaje de aprendizaje.
      </p>

      {/* Categorías */}
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de recursos */}
      <div className={styles.grid}>
        {filteredResources.map((resource) => (
          <div key={resource.id} className={styles.card}>
            <div className={styles.imagePlaceholder}></div>
            <span className={styles.categoryLabel}>{resource.category}</span>
            <h3 className={styles.cardTitle}>{resource.title}</h3>
            <p className={styles.cardDetails}>
              ⏱ {resource.duration} &nbsp; 👁 {resource.views}
            </p>
            <button className={styles.viewButton}>Ver técnica →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeResources;
