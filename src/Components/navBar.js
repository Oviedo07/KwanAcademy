import { useState } from 'react';
import { Link } from "react-scroll";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";
import { HiMenuAlt3 } from "react-icons/hi";

const NavBar = () => {  // ✅ Corregido: Nombre del componente en mayúscula

    const [navBarOpen, setNavBarOpen] = useState(false);

    const links = [
        { id: 1, link: "Home" },
        { id: 2, link: "Services" },
        { id: 3, link: "HowWeWork" },
        { id: 4, link: "Benefits" }
    ];

    return (
        <div className={styles.navBar}>  {/* ✅ Corregido: className={styles.navBar} */}
            <img src={logo} alt="logo" className="logo" /> {/* ✅ Corregido: className dinámico */}
            <HiMenuAlt3 onClick={() => setNavBarOpen(!navBarOpen)} /> {/* ✅ Corregido: onClick={() => setNavBarOpen(!navBarOpen)} */}
            {
                navBarOpen && (
                    <ul className={styles.navLinks}>
                        {links.map(link => (
                            <li key={link.id}>
                                <Link activeClass="active" to={link.link} spy={true} smooth={true} offset={-70} duration={500}>
                                    {link.link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}

export default NavBar;
