import React, { useState } from 'react'
import { Link } from 'react-scroll'
import logo from "../assets/images/logo.png"
import styles from "../components/Navbar.module.css"
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    const [NavbarOpen, SetNavbarOpen] = useState(false)
    const links = [
        {
            id: 1,
            link: "Home",
        },
        {
            id: 2,
            link: "Services",
        },
        {
            id: 3,
            link: "HowWeWork",
        },
        {
            id: 4,
            link: "Benefits",
        }
    ];

    return (
        <div className={styles.Navbar}>
            <img src={logo} alt="logo" />
            <p className='TNavbar'>‎ ‎ Kwan Academy </p>
            <IoMenu />
            {
                NavbarOpen && (
                    <ul>
                        {links.map((x) => (
                            <div>
                                <Link>{x.link === "HowWeWork" ? "How We Work" : x.link}</Link>
                            </div>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default Navbar