import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import styles from './FAQ.module.css';
import { IoFootball } from "react-icons/io5";
import { GiGoat } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [hintStep, setHintStep] = useState(0);
  const [easterEggFound, setEasterEggFound] = useState(false);

  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearchKeyPress = (e) => {

    if (e.key === 'Enter') {
      if (searchQuery.toLowerCase().trim() === 'cristiano ronaldo') {
        navigate('/thanks');
      }
    }
  };


  // Mostrar pistas si coincide con términos relacionados al easter egg
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const pista1 = ['futbol', 'fut', 'soccer', 'goat', 'portugal', 'port'];
    const pista2 = ['cr7', 'madrid', 'juventus', 'cristiano', 'cris'];
    const pistaFinal = 'cristiano ronaldo';

    if (query === '') {
      setHintStep(0);
      setShowHints(false);
    } else if (query === pistaFinal) {
      setHintStep(2);
      setShowHints(true);
    } else if (pista2.some(p => query.includes(p))) {
      setHintStep(2);
      setShowHints(true);
    } else if (pista1.some(p => query.includes(p))) {
      setHintStep(1);
      setShowHints(true);
    } else {
      setHintStep(0);
      setShowHints(false);
    }
  }, [searchQuery]);

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
        { question: "¿Hay requisitos previos para tomar los cursos?", answer: "No. Nuestros cursos están diseñados para todos los niveles, aunque algunos cursos avanzados pueden recomendar conocimientos previos." }
      ]
    },
    {
      category: "Pagos",
      questions: [
        { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias en países seleccionados." },
        { question: "¿Existen descuentos disponibles?", answer: "Sí, varia dependiendo del instructor y del curso. También contamos con precios especiales para estudiantes y grupos." }
      ]
    },
    {
      category: "Técnico",
      questions: [
        { question: "¿Cuáles son los requisitos técnicos para los cursos en línea?", answer: "Solo necesitas una conexión a Internet estable y un dispositivo compatible (PC, tablet o smartphone)." },
        { question: "¿Puedo descargar los videos del curso para verlos sin conexión?", answer: "No. Actualmente, el acceso es solo en línea para proteger los derechos de autor de nuestros instructores." },
        { question: "¿Cómo reporto problemas técnicos?", answer: "Si tienes problemas técnicos, puedes contactar a nuestro equipo de soporte mediante el formulario de contacto en nuestra web o enviando un correo a academykwan@gmail.com." }
      ]
    }
  ];

  const filteredFaqs = faqs.map((section) => ({
    ...section,
    questions: section.questions.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  if (easterEggFound) {
    return (
      <div className={styles.easterEggContainer}>
        <div className={styles.easterEggCard}>
          <div className={styles.easterEggTrophy}>🏆</div>
          <h1 className={styles.easterEggTitle}>
            ¡Easter Egg Encontrado!
          </h1>
          <p className={styles.easterEggMessage}>
            ¡Felicidades! Has encontrado el secreto de Cristiano Ronaldo 🐐
          </p>
          <div className={styles.easterEggEmojis}>⚽️ 🇵🇹 👑</div>
          <p className={styles.easterEggSubtext}>
            Aquí normalmente se cargaría la página especial de CR7
          </p>
          <button
            onClick={() => setEasterEggFound(false)}
            className={styles.easterEggButton}
          >
            Volver a FAQs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.faqWrapper}>
        {/* Header */}
        <div className={styles.containerTitle}>
          <h2 className={styles.Title}>
            Preguntas frecuentes
          </h2>
          <p className={styles.subtitle}>
            Encuentra la respuesta a esas preguntas sobre Kwan Academy
          </p>
        </div>

        {/* Barra de búsqueda con Easter egg y pistas */}
        <div className={styles.searchContainer}>
          <div className={`${styles.searchBar} ${showHints ? styles.searchBarActive : ''}`}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="| Buscar cursos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => { }}
              onBlur={() => { }}
            />

            <div className={`${styles.hintsContainer} ${showHints ? styles.hintsActive : styles.hintsInactive}`}>
              <div
                className={`${styles.hintIcon} ${hintStep >= 1 ? styles.hintIconActive : ''}`}
                title="Hay algo especial aquí..."
              >
                <IoFootball />
              </div>
              <div
                className={`${styles.hintIcon} ${hintStep >= 2 ? styles.hintIconGoat : ''}`}
                title="¿El más grande de todos los tiempos?"
              >
                <GiGoat />
              </div>
            </div>
          </div>

          {showHints && (
            <div className={styles.hintsPanel}>
              <div className={styles.hintLine}>
                <span className={styles.hintEmoji}></span>
                Pista: Busca al GOAT del fútbol...
              </div>

              {hintStep >= 1 && (
                <div className={`${styles.hintLine} ${styles.hintLineOrange}`}>
                  <span className={styles.hintEmoji}></span>
                  Más cerca... Piensa en Portugal, CR7...
                </div>
              )}

              {hintStep >= 2 && (
                <div className={`${styles.hintLine} ${styles.hintLineRed}`}>
                  <span className={styles.hintEmoji}></span>
                  ¡Muy cerca! Escribe su nombre completo...
                </div>
              )}
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className={styles.faqsContainer}>
          {filteredFaqs.map(
            (section, sectionIndex) =>
              section.questions.length > 0 && (
                <div key={sectionIndex} className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    {section.category}
                  </h3>
                  {section.questions.map((faq, index) => (
                    <div
                      key={index}
                      className={`${styles.faqItem} ${openIndex === `${sectionIndex}-${index}` ? styles.faqItemOpen : ''}`}
                    >
                      <button
                        onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                        className={styles.faqButton}
                      >
                        <span>{faq.question}</span>
                        <span className={`${styles.faqButtonIcon} ${openIndex === `${sectionIndex}-${index}` ? styles.faqButtonIconOpen : ''}`}>
                          +
                        </span>
                      </button>
                      <div className={styles.faqAnswerContainer}>
                        <p className={styles.faqAnswer}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            ¿Aún tienes preguntas? Contáctanos:{' '}
            <a href="mailto:academykwan@gmail.com" className={styles.footerLink}>
              academykwan@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
