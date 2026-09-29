import Link from "next/link"
import styles from "./ContactInterPet.module.css"
import OptimizedImage from "../OptimizedImage"
import { IMAGE_ASSETS } from "../../util/imageAssets"

import SectionTitle from "../SectionTitle"

export default function ContactInterPet() {
    const sectionTitle = "Contato"
    return (
        <div className={styles.container}>
            <SectionTitle title={sectionTitle} />
            <div className={styles.card}>
                <div className={styles.title}>DIRGRAD</div>
                <div className={styles.cardContent}>
                    <div className={styles.containerContato}>{renderContato()}</div>
                    <div className={styles.addressCEFET}>
                        <p className={styles.addressText}>
                            Campus Nova Suíça - Avenida Amazonas, Nº 5253 - Bairro Nova Suíça
                        </p>
                        <p className={styles.addressEmail}>
                            <a href="mailto:dirgrad@cefetmg.br"> dirgrad@cefetmg.br</a> - (31)
                            3319-7033
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderContato = () => {
    return (
        <div>
            <div className={styles.text_links_container}>{renderSocialNetwork()}</div>
        </div>
    )
}

const renderSocialNetwork = () => {
    return (
        <div className={styles.socialNetwork}>
            <Link href={'https://www.instagram.com/cefetmg/'} title='Instagram'><OptimizedImage className={styles.socialNetworkIcons} src={IMAGE_ASSETS.iconInstagram} alt="Instagram" width={64} height={64} sizes="32px" /></Link>
            <Link href={'https://www.linkedin.com/school/centro-federal-de-educa%C3%A7%C3%A3o-tecnol%C3%B3gica-de-minas-gerais/mycompany/'} title='LinkedIn'><OptimizedImage className={styles.socialNetworkIcons} src={IMAGE_ASSETS.iconLinkedin} alt="LinkedIn" width={64} height={64} sizes="32px" /></Link>
            <Link href={'https://www.facebook.com/cefetmg'} title='Facebook'><OptimizedImage className={styles.socialNetworkIcons} src={IMAGE_ASSETS.iconFacebook} alt="Facebook" width={64} height={64} sizes="32px" /></Link>
            <Link href={'https://twitter.com/cefet_mg'} title='Twitter'><OptimizedImage className={styles.socialNetworkIcons} src={IMAGE_ASSETS.iconTwitter} alt="Twitter" width={64} height={64} sizes="32px" /></Link>
        </div>
    )
}
