import styles from '../styles/Menu.module.css'
import Link from 'next/link'

export default function menu() {

  return (
    <div>
      <div className={styles.navBar}>
        {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/menuLogo-Horizontal.png */}
        <div><Link href="../"><a>
          <img className={styles.menuLogo} src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" />
        </a></Link>
        </div>
        <div className={styles.groupPage}>
          <div className={styles.singlePage}><Link href="../certificados"><a>Certificados</a></Link></div>
          <div className={styles.singlePage}><Link href="../blog"><a>Blog</a></Link></div>
          <div className={styles.singlePage}><Link href="../sobre"><a>Sobre nós</a></Link></div>
          <div className={styles.singlePage}><Link href="../contato"><a>Contato</a></Link></div>
          <div className={styles.singlePage}><Link href="../equipe"><a>Equipe</a></Link></div>
          <div className={styles.singlePage}><Link href="../exmembros"><a>Ex-membros</a></Link></div>
        </div>

      </div>
    </div>
  )
}