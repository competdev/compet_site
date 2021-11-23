import axios from 'axios';
import { useState } from 'react'
import styles from '../styles/ExMembros.module.css'
import Menu from '../components/menu'
import MemberCard from '../components/memberCard'
import Footer from '../components/footer'

const socialNetworks = false;

// Função para acessar a API:
ExMembros.getInitialProps = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/membros'
  );

  const exMembros = response.data.filter(data => {
    return (data.membro_ativo == false && data.tutor == false);
  });

  const tutores = response.data.filter(data => {
    return (data.membro_ativo == false && data.tutor == true);
  })

  function byName(member1, member2) {
    if (member1.nome < member2.nome)
      return -1;
    if (member1.nome > member2.nome)
      return 1;
    return 0;
  }

  exMembros.sort(byName);
  tutores.sort(byName);
  return { dados: exMembros, tutores: tutores, totalExMembros: exMembros.length }
};

// Função principal exportando o html da pag.
export default function ExMembros({ dados, tutores, totalExMembros }) {
  let [membersPage, setMembersPage] = useState(8);

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <Menu />
      {renderCabecalho()}
      {renderBodyPage(dados, tutores, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalExMembros)}
      <Footer />
    </div >
  )
}

const renderCabecalho = () => {
  return (
      <div className={styles.mainHeader}>
       
          {renderTitleImage()}
        
        <div className={styles.subtitleSpace}>
          {renderSubtitleTop()}
        </div>
      </div>
    
  )
}

const renderTitleImage = () => {
  return (
    
     <img className={styles.holder} src="https://i.ibb.co/GMSCqJP/title.png" />
    
  )
  
}

const renderSubtitleTop = () => {
  return (
    <div>
      <div className={styles.alignSubtitle}>
        <div className={styles.infoScrum}></div>
        <div className={styles.scrumMasterStr}><strong>Scrum Master</strong></div>
      </div>

      <div className={styles.alignSubtitle}>
        <div className={styles.infoIntercamb}></div>
        <div className={styles.intercambioStr}><strong>Intercâmbio</strong></div>
      </div>
    </div>
  )
}

const renderBodyPage = (dados, tutores, membersPage) => {
  return (
    <div>
      {renderTutores(tutores)}
      <div className={styles.titleBody}><strong>Ex-membros</strong></div>
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersArea}>
            {renderMemberArea(dados, membersPage)}
          </div>
        </div>
      </div>
    </div>
  )
}

const renderTutores = (tutores) => {
  return (
    <div>
      
      <div className={styles.titleBody}><strong>Ex-Tutores</strong></div>
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <MemberCard dados={tutores} membersPage={tutores.length} socialNetworks={socialNetworks} />
        </div>
      </div>
    </div>
  )
}

const renderMemberArea = (dados, membersPage) => {
  return (
    <div>
      <MemberCard dados={dados} membersPage={membersPage} socialNetworks={socialNetworks} />
    </div>
  )
}

const renderVerMais = (membersPage, setMembersPage, totalExMembros) => {
  return (
    <div>
      <div className={styles.loadArea}>
        {membersPage < totalExMembros ?
          <div onClick={() => setMembersPage(membersPage + 8)}
            className={styles.loadMore}>
            <strong>Ver mais<hr className={styles.line}></hr></strong>
          </div>
          :
          <div onClick={() => setMembersPage(8)} className={styles.loadMore}>
            <strong>Recolher<hr className={styles.lineRecolher}></hr></strong>
          </div>
        }
      </div>
    </div>
  )
}







