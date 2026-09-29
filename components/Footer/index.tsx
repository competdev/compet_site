import Link from "next/link"
import { useState } from "react"
import OptimizedImage from "../OptimizedImage"
import { IMAGE_ASSETS } from "../../util/imageAssets"
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <FooterLinks />
            </div>
            <AddressCEFET />
            <Credits />
        </footer>
    )
}

const FooterLinks = () => {
    return (
        <div>
            <div className={styles.text_links_container}>
                <InfoCEFET />
                <InfoDECOM />
                <InfoExtra />
                <LinksSocialNetwork />
            </div>
        </div>
    )
}

const InfoCEFET = () => {
    const [toggleFooter, setToggleFooter] = useState(false)

    const toggleArrow = () => {
        setToggleFooter(!toggleFooter)
    }

    return (
        <div className={styles.CEFETinfo}>
            <div>
                <div className={styles.containerTitle} onClick={toggleArrow}>
                    <div className={styles.sectionTitle}>CEFET</div>
                    <div className={styles.arrow}></div>
                </div>
            </div>
            <div className={styles.separator}>
                {" "}
                <hr></hr>
                <div className={`${styles.Links} ${toggleFooter ? styles.linksExpanded : ""}`}>
                    <LinksCEFET />
                </div>
            </div>
        </div>
    )
}

const LinksCEFET = () => {
    return (
        <div className={styles.CEFETLinks}>
            <div className={styles.singleLink}>
                <Link href="https://www.cefetmg.br/home/" target="_blank">
                    Site
                </Link>
            </div>
            <div className={styles.singleLink}>
                <Link href="https://sig.cefetmg.br/sigaa/verTelaLogin.do" target="_blank">
                    SIGAA
                </Link>
            </div>
            <div className={styles.singleLink}>
                <Link href="https://ava.cefetmg.br/" target="_blank">
                    AVA
                </Link>
            </div>
        </div>
    )
}

const InfoDECOM = () => {
    const [toggleFooter, setToggleFooter] = useState(false)

    const toggleArrow = () => {
        setToggleFooter(!toggleFooter)
    }

    return (
        <div className={styles.DECOMinfo}>
            <div>
                <div className={styles.containerTitle} onClick={toggleArrow}>
                    <div className={styles.sectionTitle}>DECOM</div>
                    <div className={styles.arrow}></div>
                </div>
            </div>
            <div className={styles.separator}>
                {" "}
                <hr></hr>
                <div className={`${styles.Links} ${toggleFooter ? styles.linksExpanded : ""}`}>
                    <LinksDECOM />
                </div>
            </div>
        </div>
    )
}

const LinksDECOM = () => {
    return (
        <div className={styles.LinksDECOM}>
            <div className={styles.singleLink}>
                <Link href="https://www.decom.cefetmg.br/" target="_blank">
                    Site
                </Link>
            </div>
            {/* <div className={styles.singleLink}>
                <Link href="https://www.decom.cefetmg.br/wp-content/uploads/sites/34/2017/03/matriz_curricular_engcomp.pdf" target="_blank">
                    Grade Curricular
                </Link>
            </div> */}
            {/* <div className={styles.singleLink}>
                <Link href={horarioAulas} target="_blank">
                    Horário de aulas
                </Link>
            </div> */}
        </div>
    )
}

const InfoExtra = () => {
    const [toggleFooter, setToggleFooter] = useState(false)

    const toggleArrow = () => {
        setToggleFooter(!toggleFooter)
    }

    return (
        <div className={styles.extraInfo}>
            <div>
                <div className={styles.containerTitle} onClick={toggleArrow}>
                    <div className={styles.sectionTitle}>
                        CONHEÇA OUTROS GRUPOS PET DO CEFET-MG!
                    </div>
                    <div className={styles.arrow}></div>
                </div>
            </div>
            <div className={`${styles.separator} ${toggleFooter ? styles.linksExpanded : ""}`}>
                <div className={`${styles.Links} ${toggleFooter ? styles.linksExpanded : ""}`}>
                    <LinksCOGPDC />
                </div>
            </div>
        </div>
    )
}

const linksGruposPET = [
    {
        label: "ADM (BH)",
        href: "https://petadmcefetmg.wordpress.com/",
    },
    {
        label: "Eng. Mecatrônica (Divinópolis)",
        href: "https://i3dpet.wixsite.com/pet-eng-mecatronica",
    },
    {
        label: "Civil (Curvelo)",
        href: "https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh",
    },
    {
        label: "ConecTTE (BH)",
        href: "https://www.petconectte.cefetmg.br/",
    },
    {
        label: "Eng. de Controle e Automação (Leopoldina)",
        href: "https://www.petencaut.cefetmg.br/",
    },
    {
        label: "EAI (Araxá)",
        href: "https://linklist.bio/PETcefetmg-araxa",
    },
    {
        label: "Eng. Materiais (BH)",
        href: "https://www.demat.cefetmg.br/pet-programa-ed/",
    },
    {
        label: "Interdisciplinar (Timóteo)",
        href: "https://cefet-petit.github.io/",
    },
    {
        label: "Eng. de Minas (Araxá)",
        href: "https://www.instagram.com/petminasaraxa?igsh=MW5jaGR6dnp5aWgydA==",
    },
    {
        label: "Ambiental (BH)",
        href: "https://tr.ee/uAydA65j4s",
    },
    {
        label: "Eng. Elétrica (Nepomuceno)",
        href: "https://www.instagram.com/peteecefetnepomuceno?igsh=MnV5M3MxcDlnMms1",
    },
    {
        label: "Eng. Civil (Varginha)",
        href: "https://petcivilvarginha.wordpress.com/",
    },
]

const LinksCOGPDC = () => {
    return (
        <div className={styles.containerLinksCOGPDC}>
            {linksGruposPET.map(grupo => (
                <span key={`${grupo.label}-${grupo.href}`} className={styles.singleLink}>
                    <Link href={grupo.href} target="_blank">{grupo.label}</Link>
                </span>
            ))}
        </div>
    )
}

const LinksSocialNetwork = () => {
    return (
        <div className={styles.socialNetwork}>
            <Link href={"https://www.instagram.com/compet.cefet/"} target="_blank" title="Instagram">
                    <OptimizedImage
                        className={styles.socialNetworkIcons}
                        src={IMAGE_ASSETS.iconInstagram}
                        alt="Instagram"
                        width={48}
                        height={48}
                        sizes="27px"
                    />
            </Link>
            <Link href={"https://www.linkedin.com/in/competcefetmg/"} target="_blank" title="LinkedIn">
                <OptimizedImage
                    className={styles.socialNetworkIcons}
                    src={IMAGE_ASSETS.iconLinkedin}
                    alt="LinkedIn"
                    width={48}
                    height={48}
                    sizes="27px"
                />
            </Link>
            <Link href={"https://www.facebook.com/competcefetmg"} target="_blank" title="Facebook">
                <OptimizedImage
                    className={styles.socialNetworkIcons}
                    src={IMAGE_ASSETS.iconFacebook}
                    alt="Facebook"
                    width={48}
                    height={48}
                    sizes="27px"
                />
            </Link>
            <Link href={"https://twitter.com/compet_cefet"} target="_blank" title="Twitter">
                <OptimizedImage
                    className={styles.socialNetworkIcons}
                    src={IMAGE_ASSETS.iconTwitter}
                    alt="Twitter"
                    width={48}
                    height={48}
                    sizes="27px"
                />
            </Link>
        </div>
    )
}

const Credits = () => {
    return (
        <div className={styles.Credits}>
            <div className={styles.textCredits}>Desenvolvido por</div>
            <OptimizedImage
                className={styles.logoCOMPET}
                src={IMAGE_ASSETS.logoHorizontal}
                alt="COMPET"
                width={102}
                height={40}
                sizes="102px"
            />
        </div>
    )
}

const AddressCEFET = () => {
    return (
        <address className={styles.addressCEFET}>
            Av. Amazonas 7675, Nova Gameleira. Belo Horizonte - MG - Brasil | CEP: 30510-000
        </address>
    )
}
