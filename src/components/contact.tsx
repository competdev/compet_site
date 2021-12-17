import SectionTitle from './sectionTitle';
import styles from '../styles/Contact.module.css';
import Link from 'next/link';

export default function Contact() {
    const sectionTitle = "Contato"

    return (
        <div className={styles.container}>
            <SectionTitle title={sectionTitle} />
            <div className={styles.card}>
                
            <div className={styles.infoCard}>
                <div className={styles.title}>DIRGRAD</div>
                
                <div className={styles.containerContato}>{renderContato()}</div>
                <div className={styles.adressCEFET}>
                    <p className={styles.adressText}>Campus Nova Suíça - Avenida Amazonas, Nº 5253 - Bairro Nova Suíça</p>
                    <p className={styles.adressEmail}>dirgrad@cefetmg.br - (31) 3319-7033</p></div>
            </div>
            </div>
        </div>
        
    )
}

const renderContato = () => {
    return (
        <div>
            <div className={styles.text_links_container}>
                {renderSocialNetwork()}
            </div>
        </div>
      )
}

const renderSocialNetwork = () => {
    return (
      <div className={styles.socialNetwork}>
        <Link href={'https://www.instagram.com/compet.cefet/'}><a title='Instagram'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/61Y0dqL/instagram-icon.png" /></a></Link>
        <Link href={'https://www.linkedin.com/in/competcefetmg/'}><a title='LinkedIn'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/cvRb3nZ/linkedin-icon.png" /></a></Link>
        <Link href={'https://www.facebook.com/competcefetmg'}><a title='Facebook'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/mT4S0S9/facebook-icon.png" /></a></Link>
        <Link href={'https://twitter.com/compet_cefet'}><a title='Twitter'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/Zfb5rRR/twitter-icon.png" /></a></Link>
      </div>
    )
  }