import Link from 'next/link'
import React, { useState } from 'react'
import wSize from '../../util/windowSize'
import styles from './Footer.module.css'

const horarioAulas = 'https://www.decom.cefetmg.br/horarios-2020/';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      
        <div className={styles.container}>
          {renderTextLinks()}
        </div>
        {renderAddressCEFET()}
        {renderCredits()}
      
    </footer>
  )
}

const renderTextLinks = () => {
  return (
    <div>
      <div className={styles.text_links_container}>
        {renderCEFETInfo()}
        {renderDECOMInfo()}
        {renderExtraInfo()}
        {renderSocialNetwork()}
      </div>
    </div>

  )
}

const renderCEFETInfo = () => {
  const [toggleFooter, setToggleFooter] = useState(false)

  const toggleArrow = () => {
    setToggleFooter(!toggleFooter)
  }
  return (
    <div className={styles.CEFETinfo}>
      <div><div className={styles.containerTitle}><div className={styles.sectionTitle}>CEFET</div><div onClick={toggleArrow} className={styles.arrow}></div></div></div>
      <div className={styles.separator}> <hr></hr>
        <div className={styles.Links}>
          {wSize().width > 1100 ? renderLinksCEFET() : (toggleFooter ? renderLinksCEFET() : <></>)}
        </div>
      </div>
    </div>
  )
}

const renderLinksCEFET = () => {
  return (
    <div className={styles.CEFETLinks}>
      <div className={styles.singleLink}><Link href="https://www.cefetmg.br/home/">Site</Link></div>
      <div className={styles.singleLink}><Link href="https://sig.cefetmg.br/sigaa/verTelaLogin.do">SIGAA</Link></div>
      <div className={styles.singleLink}><Link href="https://ava.cefetmg.br/">AVA</Link></div>
    </div>
  )
}

const renderDECOMInfo = () => {
  const [toggleFooter, setToggleFooter] = useState(false)

  const toggleArrow = () => {
    setToggleFooter(!toggleFooter)
  }
  return (
    <div className={styles.DECOMinfo}>
      <div><div className={styles.containerTitle}><div className={styles.sectionTitle}>DECOM</div><div onClick={toggleArrow} className={styles.arrow}></div></div></div>
      <div className={styles.separator}> <hr></hr>
        <div className={styles.Links}>
          {wSize().width > 1100 ? renderLinksDECOM() : (toggleFooter ? renderLinksDECOM() : <></>)}
        </div>
      </div>
    </div>
  )
}

const renderLinksDECOM = () => {
  return (
    <div className={styles.LinksDECOM}>
      <div className={styles.singleLink}><Link href="https://www.decom.cefetmg.br/">Site</Link></div>
      <div className={styles.singleLink}><Link href="https://www.decom.cefetmg.br/wp-content/uploads/sites/34/2017/03/matriz_curricular_engcomp.pdf">Grade Curricular</Link></div>
      <div className={styles.singleLink}><Link href={horarioAulas}>Horário de aulas</Link></div>
    </div>
  )
}

const renderExtraInfo = () => {
  const [toggleFooter, setToggleFooter] = useState(false)

  const toggleArrow = () => {
    setToggleFooter(!toggleFooter)
  }
  return (
    <div className={styles.extraInfo}>
      <div><div className={styles.containerTitle}><div className={styles.sectionTitle}>CONHEÇA OUTROS GRUPOS PET DO CEFET-MG!</div><div onClick={toggleArrow} className={styles.arrow}></div></div></div>
      <div className={styles.separator}> <hr></hr>
        {wSize().width > 1100 ? renderLinksCOGPDC() : (toggleFooter ? renderLinksCOGPDC() : <></>)}
      </div>
    </div>
  )
}

const renderLinksCOGPDC = () => {
  return (
    <div className={styles.containerLinks}>
      <div className={styles.Links}>
        <div className={styles.singleLink}><Link href="https://petadmcefetmg.wordpress.com/">ADM (BH)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.petconectte.cefetmg.br/">ConecTTE (BH)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.demat.cefetmg.br/pet-programa-ed/">Eng. Materiais (BH)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.instagram.com/pet.ambiental/?igshid=6d5vfzn2kufi">Ambiental (BH)</Link></div>
      </div>

      <div className={styles.Links}>
        <div className={styles.singleLink}><Link href="https://trincabotz.com.br/">Eng. de Minas (Araxá)</Link></div>
        <div className={styles.singleLink}><Link href="http://www.formulacefast.com/">EAI (Araxá)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh">Civil (Curvelo)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh">Eng. Mecatrônica (Divinópolis)</Link></div>
      </div>

      <div className={styles.Links}>
        <div className={styles.singleLink}><Link href="https://www.peteenepomuceno.com.br/">Eng. Elétrica (Nepomuceno)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.ecofet.com.br/">Eng. de Controle e Automação (Leopoldina)</Link></div>
        <div className={styles.singleLink}><Link href="">Interdisciplinar (Timóteo)</Link></div>
        <div className={styles.singleLink}><Link href="https://www.ecofet.com.br/">Eng. Civil (Varginha)</Link></div>
      </div>
    </div>
  )
}

const renderSocialNetwork = () => {
  return (
    <div className={styles.socialNetwork}>
      <Link href={'https://www.instagram.com/compet.cefet/'}title='Instagram'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/61Y0dqL/instagram-icon.png" /></Link>
      <Link href={'https://www.linkedin.com/in/competcefetmg/'}title='LinkedIn'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/cvRb3nZ/linkedin-icon.png" /></Link>
      <Link href={'https://www.facebook.com/competcefetmg'}title='Facebook'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/mT4S0S9/facebook-icon.png" /></Link>
      <Link href={'https://twitter.com/compet_cefet'}title='Twitter'><img className={styles.socialNetworkIcons} src="https://i.ibb.co/Zfb5rRR/twitter-icon.png" /></Link>
    </div>
  )
}

const renderCredits = () => {
  return (
    <div className={styles.Credits}>
      <div className={styles.textCredits}>Desenvolvido por</div>
      <img className={styles.logoCOMPET} src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" />
    </div>
  )
}

const renderAddressCEFET = () => {
  return (
    <address className={styles.addressCEFET}>
      Av. Amazonas 7675, Nova Gameleira. Belo Horizonte - MG - Brasil | CEP: 30510-000
    </address>
  )
}