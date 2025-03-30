import React, { useState } from "react";
import styles from "./Data.module.css";
import profile from "../assets/images/testimonio4.jpeg";
import { FaEnvelope, FaInstagram, FaTwitter, FaGithub, FaCalendar, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Data = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Juan Pablo",
    lastName: "Oviedo07",
    pronouns: "he/him",
    email: "CR7@goat.com",
    instagram: "https://www.instagram.com/cristiano/",
    twitter: "@Cristiano",
    github: "Cristiano.07.goat",
    joinDate: "Joined last week"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías agregar lógica para guardar los datos en una API
  };

  const socialLinks = [
    { 
      platform: "Email", 
      name: "email",
      value: userData.email, 
      icon: <FaEnvelope />,
      type: "email"
    },
    { 
      platform: "Instagram", 
      name: "instagram",
      value: userData.instagram, 
      icon: <FaInstagram />,
      type: "url"
    },
    { 
      platform: "Twitter", 
      name: "twitter",
      value: userData.twitter, 
      icon: <FaTwitter />,
      type: "text"
    },
    { 
      platform: "GitHub", 
      name: "github",
      value: userData.github, 
      icon: <FaGithub />,
      type: "text"
    },
    { 
      platform: "Member since", 
      value: userData.joinDate, 
      icon: <FaCalendar />,
      readOnly: true
    }
  ];

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <img src={profile} alt="Profile" className={styles.profileImage} />
        {isEditing ? (
          <div className={styles.editFields}>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className={styles.input}
            />
            <div className={styles.nameRow}>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className={styles.input}
                style={{width: '45%'}}
              />
              <span> · </span>
              <input
                type="text"
                name="pronouns"
                value={userData.pronouns}
                onChange={handleInputChange}
                className={styles.input}
                style={{width: '45%'}}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.profileName}>{userData.firstName}</h1>
            <p className={styles.profileUsername}>{userData.lastName} · {userData.pronouns}</p>
          </>
        )}
      </div>

      <div className={styles.buttonContainer}>
        {isEditing ? (
          <>
            <button onClick={handleSave} className={styles.saveButton}>
              <FaSave /> Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className={styles.cancelButton}
            >
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className={styles.editButton}
          >
            <FaEdit /> Edit profile
          </button>
        )}
      </div>

      <div className={styles.socialLinks}>
        {socialLinks.map((link, index) => (
          <div key={index} className={styles.socialLink}>
            <span className={styles.socialIcon}>{link.icon}</span>
            {isEditing && !link.readOnly ? (
              <input
                type={link.type || "text"}
                name={link.name}
                value={link.value}
                onChange={handleInputChange}
                className={styles.socialInput}
              />
            ) : link.platform === "Instagram" ? (
              <a 
                href={link.value} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialText}
              >
                {link.value}
              </a>
            ) : (
              <span className={styles.socialText}>{link.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;