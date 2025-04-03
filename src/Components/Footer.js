import styles from "./Footer.module.css";
import logo from "../assets/images/logoka.png";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>Kwan Academy</span>
      </div>
      <p className={styles.rights}> © Kwan Academy. Todos los derechos reservados.</p>
      <div className={styles.social}>
        <button className={styles.ProfileButton} onClick={() => navigate("/")}>
        <RiAdminLine className={styles.AdminIcon} />
          ¿Eres admin?
        </button>
        <a href="https://www.facebook.com/KwanAcademy" className={styles.icon}><FaFacebookF /></a>
        <a href="https://youtube.com/KwanAcademy" className={styles.icon}><FaYoutube /></a>
        <a href="https://instagram.com/KwanAcademy" className={styles.icon}><FaInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
