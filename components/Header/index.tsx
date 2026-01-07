import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.css";
import { pages } from '../../util/constants';

const Header: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const isFluxoMaterias = router.pathname === '/fluxo_materias';

    const toggleNav = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (isFluxoMaterias) {
            e.preventDefault();
            window.location.href = href;
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navbarContainer}>
                    <Link 
                        href="/" 
                        className={styles.logoLink}
                        onClick={(e) => isFluxoMaterias && handleLinkClick(e, '/')}
                    >
                        <Image
                            src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png"
                            alt="COMPET Logo"
                            width={220}
                            height={75}
                            className={styles.logo}
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className={styles.desktopMenu}>
                        {pages.map((page) => (
                            <li key={page.title} className={styles.navItem}>
                                <Link 
                                    href={page.link} 
                                    className={styles.navLink}
                                    onClick={(e) => handleLinkClick(e, page.link)}
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile/Tablet Menu Button */}
                    <button
                        className={styles.menuButton}
                        type="button"
                        onClick={toggleNav}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 80"
                            width="40"
                            height="40"
                            className={styles.burgerIcon}
                        >
                            <rect width="100" height="10" fill="#004266" />
                            <rect y="30" width="100" height="10" fill="#004266" />
                            <rect y="60" width="100" height="10" fill="#004266" />
                        </svg>
                    </button>
                </div>

                {/* Mobile/Tablet Menu */}
                {isMenuOpen && (
                    <ul className={styles.mobileMenu}>
                        {pages.map((page) => (
                            <li key={page.title}>
                                <Link
                                    href={page.link}
                                    className={styles.mobileLink}
                                    onClick={(e) => {
                                        setIsMenuOpen(false);
                                        if (isFluxoMaterias) {
                                            handleLinkClick(e, page.link);
                                        }
                                    }}
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
