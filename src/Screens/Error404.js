import React from 'react';
import styles from './Error404.module.css';

// Imagenes desde la web
// const errorImage = "https://imgur.com/6jpYZcf.png";
// const goBack = "https://imgur.com/N9o65oU.png"

// Imagenes locales
const errorImage = "/Error404.png";
const goBack = "/regresar.png"

const Error404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.errorImage}>
            <img
              src={errorImage}
              alt="Ilustración de error 404"
              className={styles.errorImage}
            />
          </div>

          {/* Botón con imagen para redirigir a la página principal */}
          <a href="/" className={styles.backButton}>
            <img
              src={goBack}
              alt="Volver al inicio"
              className={styles.buttonImage}
            />
          </a>
        </div>
      </div>

      <div className={styles.graphics}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
        <div className={styles.triangle}></div>
        <div className={styles.ellipse}></div>
        <div className={styles.cross}></div>
        <div className={styles.rectangle}></div>
        <div className={styles.star}></div>
        <div className={styles.hexagon}></div>
        <div className={styles.diagonalLine}></div>
        <div className={styles.pentagon}></div>
        <div className={styles.ring}></div>
        <div className={styles.dots}></div>
      </div>

    </div>
  );
};

export default Error404;