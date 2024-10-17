import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { pages } from '../../util/constants';

const Header: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);

    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('mainNav');
            if (navbar) {
                if (window.scrollY > 0) {
                    navbar.classList.add(styles.navbarShrink);
                } else {
                    navbar.classList.remove(styles.navbarShrink);
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.menu_body} ${toggleMenu ? styles.menu_active : ''}`}>
            <nav className={styles.navbar} id="mainNav">
                <div className={styles.logo}>
                    <Link href="/">
                        <img src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" alt="Logo" />
                    </Link>
                </div>

                {/* icone de 3 barrinhas para o menu */}
                <button className={styles.navbarToggler} type="button" onClick={toggleNav} aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="30" height="30" className={styles.burgerIcon}>
                        <rect width="100" height="10" fill="#004266"></rect>
                        <rect y="30" width="100" height="10" fill="#004266"></rect>
                        <rect y="60" width="100" height="10" fill="#004266"></rect>
                    </svg>
                </button>

                <div className={`${styles.navbarCollapse} ${toggleMenu ? styles.menu_active : ''}`}>
                    <ul className={styles.navList}>
                        {pages.map((page) => (
                            <li key={page.title} className={styles.navItem}>
                                <Link href={page.link} className={styles.navLink}>
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
