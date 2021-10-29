import styles from '../styles/Footer.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const horarioAulas = 'https://www.decom.cefetmg.br/horarios-2020/';


// Usage
function App() {
  const size = useWindowSize();

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default function Footer() {
  return (
    <div className={styles.footer}>
      {useWindowSize().width < 1100 ? <div>{renderExtraInfo()}</div> : <></>}
      <div className={styles.container}>
        {renderTextLinks()}
        {renderSocialNetwork()}
        {useWindowSize().width > 1100 ? <div>{renderExtraInfo()}</div> : <></>}
      </div>
      {renderAdressCEFET()}
    </div>
  )
}

const renderTextLinks = () => {
  return (
    <div className={styles.container}>
      {renderCEFETInfo()}
      {renderDECOMInfo()}
    </div>
  )
}


const renderCEFETInfo = () => {
  return (
    <div className={styles.CEFETinfo}>
      <div className={styles.sectionTitle}>CEFET-MG</div>
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
      <div className={styles.sectionTitle}>CONHEÇA OUTROS GRUPOS PET DO CEFET-MG!</div>
      <div className={styles.containerLinks}>
        <div className={styles.Links}>
          <div className={styles.singleLink}><Link href="https://petadmcefetmg.wordpress.com/"><a>ADM (BH)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.petconectte.cefetmg.br/"><a>ConecTTE (BH)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.demat.cefetmg.br/pet-programa-ed/"><a>Eng. Materiais (BH)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/pet.ambiental/?igshid=6d5vfzn2kufi"><a>Ambiental (BH)</a></Link></div>
        </div>

        <div className={styles.Links}>
          <div className={styles.singleLink}><Link href="https://trincabotz.com.br/"><a>Eng. de Minas (Araxá)</a></Link></div>
          <div className={styles.singleLink}><Link href="http://www.formulacefast.com/"><a>EAI (Araxá)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh"><a>Civil (Curvelo)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.instagram.com/petcivilcefet/?igshid=1h4de5azc9tvh"><a>Eng. Mecatrônica (Divinópolis)</a></Link></div>
        </div>

        <div className={styles.Links}>
          <div className={styles.singleLink}><Link href="https://www.peteenepomuceno.com.br/"><a>Eng. Elétrica (Nepomuceno)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.ecofet.com.br/"><a>Eng. de Controle e Automação (Leopoldina)</a></Link></div>
          <div className={styles.singleLink}><Link href=""><a>Interdisciplinar (Timóteo)</a></Link></div>
          <div className={styles.singleLink}><Link href="https://www.ecofet.com.br/"><a>Eng. Civil (Varginha)</a></Link></div>
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

const renderAdressCEFET = () => {
  return (
    <div className={styles.adressCEFET}>
      Av. Amazonas 7675, Nova Gameleira. Belo Horizonte - MG - Brasil | CEP: 30510-000
    </div>
  )
}