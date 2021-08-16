import styles from '../styles/Footer.module.css'
import Link from 'next/link'

const horarioAulas = 'https://www.decom.cefetmg.br/horarios-2020/';

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
        <div className={styles.singleLink}><Link href="https://www.cefetmg.br/home/"><a>Site</a></Link></div>
        <div className={styles.singleLink}><Link href="https://sig.cefetmg.br/sigaa/verTelaLogin.do"><a>SIGAA</a></Link></div>
        <div className={styles.singleLink}><Link href="https://ava.cefetmg.br/"><a>AVA</a></Link></div>
      </div>
    </div>
  )
}

const renderDECOMInfo = () => {
  return (
    <div className={styles.DECOMinfo}>
      <div className={styles.sectionTitle}>DECOM</div>
      <div className={styles.Links}>
        <div className={styles.singleLink}><Link href="https://www.decom.cefetmg.br/"><a>Site</a></Link></div>
        <div className={styles.singleLink}><Link href="https://www.decom.cefetmg.br/wp-content/uploads/sites/34/2017/03/matriz_curricular_engcomp.pdf"><a>Grade Curricular</a></Link></div>
        <div className={styles.singleLink}><Link href={horarioAulas}><a>Horário de aulas</a></Link></div>
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
          <div className={styles.singleLink}><Link href="https://commitjr.com/"><a>Commit Jr.</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.enxurradadebits.cefetmg.br/"><a>Enxurrada de Bits</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.cefastaerospace.com/"><a>CEFAST AeroSpace</a></Link></div>
        </div>

        <div className={styles.Links}>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/cefastaerodesign/?hl=pt-br"><a>CEFAST AeroDesign</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/cefastbaja/?hl=pt-br"><a>CEFAST Baja</a></Link></div>
          <div className={styles.singleLink}><Link href="http://www.formulacefast.com/"><a>Fórmula CEFAST</a></Link></div>
        </div>

        <div className={styles.Links}>
          <div className={styles.singleLink}><Link href="https://trincabotz.com.br/"><a>TrincaBotz</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/pacificbotz/"><a>Pacific Botz</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.ecofet.com.br/"><a>Ecofet</a></Link></div>
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
    </div>
  )
}