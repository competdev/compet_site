import axios from "axios";
import styles from "../styles/Certificados.module.css";
import Link from "next/link";

export default function Certificados(dados) {
  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Certificados</title>

      <div className={styles.navBar}>
        {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/menuLogo-Horizontal.png */}
        <div><Link href="http://google.com"><a>
          <img className={styles.menuLogo} src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" />
        </a></Link>
        </div>
        <div className={styles.groupPage}>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Certificados</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Blog</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Sobre nós</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Contato</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Equipe</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Ex-membros</a></Link></div>
        </div>
      </div>      



      {console.log(dados)}



    </div>
  );
}

Certificados.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/certificados");

  return { dados: response.data };
};
