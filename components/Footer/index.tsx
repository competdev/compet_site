import Link from "next/link"
import { useState } from "react"
import wSize from "../../util/windowSize"
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
                <div className={styles.containerTitle}>
                    <div className={styles.sectionTitle}>CEFET</div>
                    <div onClick={toggleArrow} className={styles.arrow}></div>
                </div>
            </div>
            <div className={styles.separator}>
                {" "}
                <hr></hr>
                <div className={styles.Links}>
                    {wSize().width > 1100 ? <LinksCEFET /> : toggleFooter ? <LinksCEFET /> : <></>}
                </div>
            </div>
        </div>
    )
}

const LinksCEFET = () => {
    return (
        <div className={styles.CEFETLinks}>
            <div className={styles.singleLink}>
                <Link href="https://www.cefetmg.br/home/">
                    <a>Site</a>
                </Link>
            </div>
            <div className={styles.singleLink}>
                <Link href="https://sig.cefetmg.br/sigaa/verTelaLogin.do">
                    <a>SIGAA</a>
                </Link>
            </div>
            <div className={styles.singleLink}>
                <Link href="https://ava.cefetmg.br/">
                    <a>AVA</a>
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
                <div className={styles.containerTitle}>
                    <div className={styles.sectionTitle}>DECOM</div>
                    <div onClick={toggleArrow} className={styles.arrow}></div>
                </div>
            </div>
            <div className={styles.separator}>
                {" "}
                <hr></hr>
                <div className={styles.Links}>
                    {wSize().width > 1100 ? <LinksDECOM /> : toggleFooter ? <LinksDECOM /> : <></>}
                </div>
            </div>
        </div>
    )
}

const LinksDECOM = () => {
    return (
        <div className={styles.LinksDECOM}>
            <div className={styles.singleLink}>
                <Link href="https://www.decom.cefetmg.br/">
                    <a>Site</a>
                </Link>
            </div>
            {/* <div className={styles.singleLink}>
                <Link href="https://www.decom.cefetmg.br/wp-content/uploads/sites/34/2017/03/matriz_curricular_engcomp.pdf">
                    <a>Grade Curricular</a>
                </Link>
            </div> */}
            {/* <div className={styles.singleLink}>
                <Link href={horarioAulas}>
                    <a>Horário de aulas</a>
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
                <div className={styles.containerTitle}>
                    <div className={styles.sectionTitle}>
                        CONHEÇA OUTROS GRUPOS PET DO CEFET-MG!
                    </div>
                    <div onClick={toggleArrow} className={styles.arrow}></div>
                </div>
            </div>
            <div className={styles.separator}>
                {" "}
                <hr></hr>
                {wSize().width > 1100 ? <LinksCOGPDC /> : toggleFooter ? <LinksCOGPDC /> : <></>}
            </div>
        </div>
    )
}

const LinksCOGPDC = () => {
    return (
        <div className={styles.containerLinks}>
            <div className={styles.Links}>
                <div className={styles.singleLink}>
                    <Link href="https://petadmcefetmg.wordpress.com/">
                        <a>ADM (BH)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.petconectte.cefetmg.br/">
                        <a>ConecTTE (BH)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.demat.cefetmg.br/pet-programa-ed/">
                        <a>Eng. Materiais (BH)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.instagram.com/pet.ambiental/?igshid=6d5vfzn2kufi">
                        <a>Ambiental (BH)</a>
                    </Link>
                </div>
            </div>

            <div className={styles.Links}>
                <div className={styles.singleLink}>
                    <Link href="https://trincabotz.com.br/">
                        <a>Eng. de Minas (Araxá)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="http://www.formulacefast.com/">
                        <a>EAI (Araxá)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh">
                        <a>Civil (Curvelo)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh">
                        <a>Eng. Mecatrônica (Divinópolis)</a>
                    </Link>
                </div>
            </div>

            <div className={styles.Links}>
                <div className={styles.singleLink}>
                    <Link href="https://www.peteenepomuceno.com.br/">
                        <a>Eng. Elétrica (Nepomuceno)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.ecofet.com.br/">
                        <a>Eng. de Controle e Automação (Leopoldina)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="">
                        <a>Interdisciplinar (Timóteo)</a>
                    </Link>
                </div>
                <div className={styles.singleLink}>
                    <Link href="https://www.ecofet.com.br/">
                        <a>Eng. Civil (Varginha)</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const LinksSocialNetwork = () => {
    return (
        <div className={styles.socialNetwork}>
            <Link href={"https://www.instagram.com/compet.cefet/"}>
                <a title="Instagram">
                    <img
                        className={styles.socialNetworkIcons}
                        src="https://i.ibb.co/61Y0dqL/instagram-icon.png"
                    />
                </a>
            </Link>
            <Link href={"https://www.linkedin.com/in/competcefetmg/"}>
                <a title="LinkedIn">
                    <img
                        className={styles.socialNetworkIcons}
                        src="https://i.ibb.co/cvRb3nZ/linkedin-icon.png"
                    />
                </a>
            </Link>
            <Link href={"https://www.facebook.com/competcefetmg"}>
                <a title="Facebook">
                    <img
                        className={styles.socialNetworkIcons}
                        src="https://i.ibb.co/mT4S0S9/facebook-icon.png"
                    />
                </a>
            </Link>
            <Link href={"https://twitter.com/compet_cefet"}>
                <a title="Twitter">
                    <img
                        className={styles.socialNetworkIcons}
                        src="https://i.ibb.co/Zfb5rRR/twitter-icon.png"
                    />
                </a>
            </Link>
        </div>
    )
}

const Credits = () => {
    return (
        <div className={styles.Credits}>
            <div className={styles.textCredits}>Desenvolvido por</div>
            <img
                className={styles.logoCOMPET}
                src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png"
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
