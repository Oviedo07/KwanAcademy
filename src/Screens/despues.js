import React from 'react';
import styles from './despues.module.css';

// Imagenes desde la web
// const errorImage = "https://imgur.com/6jpYZcf.png";
// const goBack = "https://imgur.com/N9o65oU.png"

// Imagenes locales
const Image = "/despues.png";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.errorImage}>
            <img
              src={Image}
              alt=""
              className={styles.errorImage}
            />
          </div>
        </div>
      </div>

    

    </div>
  );
};

export default Error404;