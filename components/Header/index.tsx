import Link from "next/link"
import React, { useState } from "react"
import wSize from "../../util/windowSize"
import styles from "./Header.module.css"
import { pages } from '../../util/constants';

export default function Header() {
    const [toggleMenu, setToggleMenu] = useState(false)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <header className={styles.menu_body}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/" legacyBehavior>
                        <img src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" />
                    </Link>
                </div>
                {wSize().width > 1505 ? render_links() : toggleMenu ? render_links() : <></>}
                <div className={styles.mobile_menu} onClick={toggleNav}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>
        </header>
    );
}
const render_links = () => {
    return (
        <ul className={styles.nav_list}>
            {pages.map((page) => (
                <li key={page.title}>
                    <Link href={page.link} className={styles.link} legacyBehavior>{page.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
