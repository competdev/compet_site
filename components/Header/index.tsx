import Link from 'next/link'
import React, { useState } from 'react'
import wSize from '../../util/windowSize'
import styles from './Header.module.css'

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className={styles.menu_body}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href='/'>
            <img src='https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png' />
          </Link>
        </div>
        {wSize().width > 1505 ? render_links() : (toggleMenu ? render_links() : <></>)}
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
      <li><Link href="/certificados"><a className={styles.link}>Certificados</a></Link></li>
      {/* <li><Link href="/blog"><a className={styles.link}>Blog</a></Link></li> */}
      <li><Link href="/equipe"><a className={styles.link}>Equipe</a></Link></li>
      <li><Link href="/exmembros"><a className={styles.link}>Ex-membros</a></Link></li>
      <li><Link href="/sobre"><a className={styles.link}>Sobre</a></Link></li>
      <li><Link href="/interpet"><a className={styles.link}>InterPet</a></Link></li>
      <li><Link href="/contato"><a className={styles.link}>Contato</a></Link></li>
      <li><Link href="http://compet.decom.cefetmg.br/moodle/"><a className={styles.link}>Moodle</a></Link></li>
    </ul>
  );
};
