import styles from "../styles/Menu.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Usage
function App() {
  const size = useWindowSize();

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default function menu() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className={styles.menu_body}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href='../'>
            <a>
              <img src='https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png' />
            </a>
          </Link>
        </div>
        {useWindowSize().width > 1300 ? (
          render_links()
        ) : toggleMenu ? (
          render_links()
        ) : (
          <></>
        )}
        <div className={styles.mobile_menu} onClick={toggleNav}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
}

const render_links = () => {
  return (
    <ul className={styles.nav_list}>
      <li>
        <Link href='/certificados'>
          <a className={styles.link}>Certificados</a>
        </Link>
      </li>
      <li>
        <Link href='/blog'>
          <a className={styles.link}>Blog</a>
        </Link>
      </li>
      <li>
        <Link href='/sobre'>
          <a className={styles.link}>Sobre</a>
        </Link>
      </li>
      <li>
        <Link href='/contato'>
          <a className={styles.link}>Contato</a>
        </Link>
      </li>
      <li>
        <Link href='/equipe'>
          <a className={styles.link}>Equipe</a>
        </Link>
      </li>
      <li>
        <Link href='/exmembros'>
          <a className={styles.link}>Ex-membros</a>
        </Link>
      </li>
    </ul>
  );
};
