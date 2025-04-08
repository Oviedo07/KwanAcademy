import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import logo from "../assets/images/logoka.png";
import styles from "./Footer.module.css";
import { FaWhatsapp } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerContainer}>
          <div className={`${styles.footerColumn} ${styles.logoColumn}`}>
            <div className={styles.footerLogo}>
              <img src={logo} alt="Kwan Academy Logo" className={styles.logoImage} />
              <h2 className={styles.logoText}>Kwan Academy</h2>
            </div>
            <p className={styles.footerDescription}>
              Academia líder en artes marciales y defensa personal. Formando campeones dentro y fuera del tatami.
            </p>
            <div className={styles.socialIcons}>
              <a
                href="https://www.facebook.com/KwanAcademy"
                className={`${styles.socialIcon} ${styles.facebook}`}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://youtube.com/KwanAcademy"
                className={`${styles.socialIcon} ${styles.youtube}`}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://instagram.com/KwanAcademy"
                className={`${styles.socialIcon} ${styles.instagram}`}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <div className={styles.footerLine}></div>
            <ul className={styles.contactInfo}>
              <li className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Cra. 65 #32C-31, Medellín, Belén, Antioquia</span>
              </li>
              <li className={styles.contactItem}>
                <FaPhoneAlt className={styles.contactIcon} />
                <a className={styles.contactNumber} href="https://wa.me/+573145036324">+57 314 503 63 24</a>
              </li>
              <li className={styles.contactItem}>
                <IoMdMail className={styles.contactIcon} />
                <span>kwanacademy@support.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`${styles.footerContainer} ${styles.footerBottomContent}`}>
          <p className={styles.copyright}>
            {currentYear} © Kwan Academy. Todos los derechos reservados.
          </p>

          {/* <button 
            className={styles.adminButton}
            onClick={() => navigate("./AdminViews/HomeAdmin")}
          >
            <RiAdminLine className={styles.adminIcon} />
            <span>Acceso administrador</span>
          </button> */}
          <a
            href="https://wa.me/573146975509"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.adminButton}
          >
            <FaWhatsapp className={styles.adminIcon} />
            <span>Contacta un asesor</span>
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;