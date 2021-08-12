import styles from '../styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.container}>
          {renderTextLinks()}
          {renderSocialNetwork()}
          {renderLogos()}
        </div>
        {renderAdressCEFET()}
      </div>
    </div>
  )
}

const renderTextLinks = () => {
  return (
    <div className={styles.container}>
      {renderCEFETInfo()}
      {renderDECOMInfo()}
      {renderExtraInfo()}
    </div>
  )
}


const renderCEFETInfo = () => {
  return (
    <div className={styles.CEFETinfo}>
      <div className={styles.sectionTitle}>CEFET</div>
      <div className={styles.Links}>
        <div>Site</div>
        <div>SIGAA</div>
        <div>AVA</div>
      </div>
    </div>
  )
}

const renderDECOMInfo = () => {
  return (
    <div className={styles.DECOMinfo}>
      <div className={styles.sectionTitle}>DECOM</div>
      <div className={styles.Links}>
        <div>Site</div>
        <div>Grade Curricular</div>
        <div>Horário de aulas</div>
      </div>
    </div>
  )

}

const renderExtraInfo = () => {
  return (
    <div className={styles.extraInfo}>
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

  )
}

const renderSocialNetwork = () => {
  return (
    <div className={styles.socialNetwork}>
      <Link href={'https://www.instagram.com/compet.cefet/'}><a title='Instagram'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/8s5rzXB/instagram-icon.png" /></a></Link>
      <Link href={'https://www.linkedin.com/in/competcefetmg/'}><a title='LinkedIn'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/4jY3pbg/linkedin-icon.png" /></a></Link>
      <Link href={'https://www.facebook.com/competcefetmg'}><a title='Facebook'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/Y7KDkXh/facebook-icon.png" /></a></Link>
      <Link href={'https://twitter.com/compet_cefet'}><a title='Twitter'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/DMLw3nV/twitter-icon.png" /></a></Link>
    </div>
  )
}

const renderLogos = () => {
  return (
    <div>
      {renderDTILogo()}
    </div>
  )
}

const renderDTILogo = () => {
  return (
    <div className={styles.dtiInfo}>
      <div className={styles.sectionTitle}>WEBSITE FEITO EM PARCERIA COM:</div>
      <Link href={'https://www.dtidigital.com.br/'}><a title='DTI Digital'><img className={styles.logosExterna} src="https://i.ibb.co/RNCfgLN/dti-logo.png" /></a></Link>
    </div>
  )
}

const renderAdressCEFET = () => {
  return (
    <div className={styles.adressCEFET}>
      Av. Amazonas 7675, Nova Gameleira. Belo Horizonte - MG - Brasil | CEP: 30510-000
      Telefone: +55 (31) 3319-6870
    </div>
  )
}