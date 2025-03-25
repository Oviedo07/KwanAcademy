import React from "react";
import styles from "./Data.module.css";
import profile from "../assets/images/testimonio4.jpeg";
import { FaEnvelope, FaInstagram, FaTwitter, FaGithub, FaCalendar } from "react-icons/fa"; // Importa iconos

const Profile = ({ user }) => {
  const socialLinks = [
    { platform: "Email", value: "oviedo.herrera.07@gmail.com", icon: <FaEnvelope /> },
    { platform: "Instagram", value: "https://www.instagram.com/_oviedo_/", icon: <FaInstagram /> },
    { platform: "Twitter", value: "_oviedo_", icon: <FaTwitter /> },
    { platform: "GitHub", value: "juanpablo.oviedoherrera", icon: <FaGithub /> },
    { platform: "Member since", value: "Joined last month", icon: <FaCalendar /> }
  ];

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <img src={profile} alt="Profile" className={styles.profileImage} />
        <h1 className={styles.profileName}>Juan Pablo</h1>
        <p className={styles.profileUsername}>Oviedo07 · he/him</p>
      </div>

      <button className={styles.editButton}>Edit profile</button>

      <div className={styles.socialLinks}>
        {socialLinks.map((link, index) => (
          <div key={index} className={styles.socialLink}>
            <span className={styles.socialIcon}>{link.icon}</span>
            <span className={styles.socialText}>{link.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
