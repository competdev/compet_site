import Link from 'next/link';
import styles from './ContactInterPet.module.css';

import SectionTitle from '../SectionTitle';

export default function ContactInterPet() {
    const sectionTitle = "Contato"
    return (
        <section className={styles.container}>
            <SectionTitle title={sectionTitle} />
            <div className={styles.card}>
                <div className={styles.title}>DIRGRAD</div>
                <div className={styles.cardContent}>
                    <div className={styles.containerContato}>{renderContato()}</div>
                    <div className={styles.addressCEFET}>
                        <address className={styles.addressText}>
                            Campus Nova Suíça - Avenida Amazonas, Nº 5253 - Bairro Nova Suíça
                        </address>
                        <ul className={styles.contact}>
                            <li>    
                                <p> Email :<a href="mailto:dirgrad@cefetmg.br"> dirgrad@cefetmg.br</a></p>
                            </li>
                            <li>
                                <p>Telefone :<a href="tel:+553133197033"> (31) 3319-7033</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

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
            <Link href={'https://www.instagram.com/cefetmg/'}><a title='Instagram'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/61Y0dqL/instagram-icon.png" /></a></Link>
            <Link href={'https://www.linkedin.com/school/centro-federal-de-educa%C3%A7%C3%A3o-tecnol%C3%B3gica-de-minas-gerais/mycompany/'}><a title='LinkedIn'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/cvRb3nZ/linkedin-icon.png" /></a></Link>
            <Link href={'https://www.facebook.com/cefetmg'}><a title='Facebook'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/mT4S0S9/facebook-icon.png" /></a></Link>
            <Link href={'https://twitter.com/cefet_mg'}><a title='Twitter'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/Zfb5rRR/twitter-icon.png" /></a></Link>
        </div>
    )
}