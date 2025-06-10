import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General",
      questions: [
        { question: "¿Qué es Kwan Academy?", answer: "Kwan Academy es una plataforma de aprendizaje especializada en cursos de defensa personal, tanto en modalidad virtual como presencial. Nuestro objetivo es brindarte conocimientos prácticos y efectivos para mejorar tu seguridad y confianza." },
        { question: "¿Cómo creo una cuenta?", answer: "Puedes crear una cuenta haciendo clic en el botón de 'Registro' en la parte superior derecha de esta página." },
        { question: "¿Está disponible Kwan Academy a nivel mundial?", answer: "Sí, nuestra plataforma está disponible a nivel mundial. Sin embargo, los cursos presenciales solo están disponibles en ubicaciones específicas." }
      ]
    },
    {
      category: "Cursos",
      questions: [
        { question: "¿Qué tipos de cursos ofrecen?", answer: "Ofrecemos cursos de defensa personal adaptados a diferentes niveles, desde principiantes hasta avanzados. Cubrimos disciplinas como Taekwondo, técnicas de combate urbano, manejo de situaciones de riesgo y más." },
        { question: "¿Cuánto tiempo tengo acceso a un curso después de la compra?", answer: "Una vez que compras un curso, tienes acceso de por vida a su contenido, incluyendo futuras actualizaciones." },
        { question: "¿Hay requisitos previos para tomar los cursos?", answer: "No. Nuestros cursos están diseñados para todos los niveles, aunque algunos cursos avanzados pueden recomendar conocimientos previos." },
        { question: "¿Puedo obtener un certificado después de completar un curso?", answer: "Sí, al finalizar cada curso recibirás un certificado digital verificable que puedes agregar a tu CV o perfil profesional." }
      ]
    },
    {
      category: "Pagos",
      questions: [
        { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias en países seleccionados." },
        { question: "¿Ofrecen reembolsos?", answer: "Sí, ofrecemos reembolsos dentro de los primeros 7 días después de la compra si el curso no ha sido completado en más del 20%." },
        { question: "¿Existen descuentos disponibles?", answer: "Sí, periódicamente ofrecemos descuentos y promociones. También contamos con precios especiales para estudiantes y grupos." }
      ]
    },
    {
      category: "Técnico",
      questions: [
        { question: "¿Cuáles son los requisitos técnicos para los cursos en línea?", answer: "Solo necesitas una conexión a Internet estable y un dispositivo compatible (PC, tablet o smartphone)." },
        { question: "¿Puedo descargar los videos del curso para verlos sin conexión?", answer: "No. Actualmente, el acceso es solo en línea para proteger los derechos de autor de nuestros instructores." },
        { question: "¿Cómo reporto problemas técnicos?", answer: "Si tienes problemas técnicos, puedes contactar a nuestro equipo de soporte mediante el formulario de contacto en nuestra web o enviando un correo a support@kwanacademy.com." }
      ]
    }
  ];

  const filteredFaqs = faqs.map((section) => ({
    ...section,
    questions: section.questions.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className={styles.container}>
      <div className={styles.faqWrapper}>
        <div className={styles.containerTitle}>
          <h2 className={styles.Title}>Preguntas frecuentes</h2>
        </div>

        <p className={styles.subtitle}>Encuentra la respuesta a esas preguntas sobre Kwan Academy</p>

        {/* Barra de búsqueda */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="| Buscar cursos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredFaqs.map(
          (section, sectionIndex) =>
            section.questions.length > 0 && (
              <div key={sectionIndex} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.category}</h3>
                {section.questions.map((faq, index) => (
                  <div
                    key={index}
                    className={`${styles.faqItem} ${openIndex === `${sectionIndex}-${index}` ? styles.open : ""}`}
                  >
                    <button
                      onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                      className={styles.faqButton}
                    >
                      {faq.question}
                    </button>
                    <div className={styles.faqAnswerContainer}>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}
        <p className={styles.footer}>
          ¿Aún tienes preguntas? Contáctanos:
          <a href="mailto:kwanacademy@support.com"> kwanacademy@support.com</a>
        </p>
      </div>  
    </div>
  );
};

export default FAQ;
