import React from "react";
import styles from "./Backgroundvideo.module.css"; // Asegúrate de que el nombre coincida con el archivo CSS
import videoFile from "../assets/videos/video.mp4"; // Ruta correcta del video local

const Backgroundvideo = () => {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.video}>
        <source src={videoFile} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className={styles.overlay}></div> {/* Capa para oscurecer el video */}

    </div>
  );
};

export default Backgroundvideo;
