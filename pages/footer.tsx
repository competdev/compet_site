import styles from '../styles/Footer.module.css'
import Link from 'next/link'

export default function menu() {

  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.COMPETinfo}>
            <div className={styles.sectionTitle}>COMPET</div>
            <div className={styles.Links}>
              <div>Contato</div>
              <div>Sobre</div>
              <div>Equipe</div>
              <div></div>
            </div>
          </div>
          <div className={styles.CEFETinfo}>
            <div className={styles.sectionTitle}>CEFET</div>
            <div className={styles.Links}>
              <div>Site</div>
              <div>SIGAA</div>
              <div>AVA</div>
              <div></div>
            </div>
          </div>
          <div className={styles.DECOMinfo}>
            <div className={styles.sectionTitle}>DECOM</div>
            <div className={styles.Links}>
              <div>Site</div>
              <div>Grade Curricular</div>
              <div>Horário de aulas</div>
            </div>
          </div>
          <div className={styles.EXTRAinfo}>
            <div className={styles.sectionTitle}>CONHEÇA TAMBÉM!</div>

            <div className={styles.containerLinks}>
              <div className={styles.Links}>
                <div>Commit Jr.</div>
                <div>Enxurrada de Bits</div>
                <div>CEFAST AeroSpace</div>
              </div>

              <div className={styles.Links}>
                <div>CEFAST AeroDesign</div>
                <div>CEFAST Baja</div>
                <div>Fórmula CEFAST</div>
              </div>

              <div className={styles.Links}>
                <div>TrincaBotz</div>
                <div>Pacific Botz</div>
                <div>Ecofet</div>
              </div>
            </div>
          </div>

          <div className={styles.socialNetwork}>
            <img className={styles.socialNetworkIcons} src="https://i.ibb.co/8s5rzXB/instagram-icon.png" />
            <img className={styles.socialNetworkIcons} src="https://i.ibb.co/4jY3pbg/linkedin-icon.png" />
            <img className={styles.socialNetworkIcons} src="https://i.ibb.co/Y7KDkXh/facebook-icon.png" />
            <img className={styles.socialNetworkIcons} src="https://i.ibb.co/DMLw3nV/twitter-icon.png" />

          </div>

        </div>
        <div className={styles.ENDERECOcefet}>
          Av. Amazonas 7675, Nova Gameleira. Belo Horizonte - MG - Brasil | CEP: 30510-000
          Telefone: +55 (31) 3319-6870
        </div>
      </div>
    </div>
  )
}