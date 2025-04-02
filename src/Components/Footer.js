import styles from "./Footer.module.css";
import logo from "../assets/images/logoka.png";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>Kwan Academy</span>
      </div>
      <p className={styles.rights}> © Kwan Academy. Todos los derechos reservados.</p>
      <div className={styles.social}>
        <a href="https://www.facebook.com/Cristiano" className={styles.icon}><FaFacebookF /></a>
        <a href="https://x.com/cristiano" className={styles.icon}><FaXTwitter /></a>
        <a href="https://instagram.com/cristiano" className={styles.icon}><FaInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
