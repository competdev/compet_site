import axios from 'axios';
import { useState } from 'react'
import styles from '../styles/Equipe.module.css'
import Menu from '../components/menu'
import MemberCard from '../components/memberCard'
import Footer from '../components/footer'

const socialNetworks = true;

Equipe.getInitialProps = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/membros'
  );

  const membrosAtuais = response.data.filter(data => {
    return (data.membro_ativo == true && data.scrum_master == false && data.tutor == false);
  });

  const scrumMaster = response.data.filter(data => {
    return (data.membro_ativo == true && data.scrum_master == true);
  });

  const tutores = response.data.filter(data => {
    return (data.membro_ativo == true && data.tutor == true);
  })

  function byName(member1, member2) {
    if (member1.nome < member2.nome)
      return -1;
    if (member1.nome > member2.nome)
      return 1;
    return 0;
  }

  membrosAtuais.sort(byName)
  tutores.sort(byName);
  return { membros: membrosAtuais, scrumMaster: scrumMaster, tutores: tutores, totalMembrosAtivos: membrosAtuais.length }
};

export default function Equipe({ membros, scrumMaster, tutores, totalMembrosAtivos }) {
  const [membersPage, setMembersPage] = useState(8);
  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Membros atuais</title>
      <Menu />
      {renderCabecalho()}
      <div className={styles.containerMembers}>
        <div className={styles.scrumTutor}>
          {renderTutores(tutores)}
          {renderScrumMaster(scrumMaster)}
        </div>
      </div>
      {renderMembros(membros, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalMembrosAtivos)}
      <Footer />
    </div>
  )
}

const renderCabecalho = () => {
  return (
    <div>
      <div className={styles.mainHeader}>
        <div>
          {renderTitleImage()}
        </div>
        <div className={styles.subtitleSpace}>
          {renderSubtitleTop()}
        </div>
      </div>
    </div>
  )
}

const renderTitleImage = () => {
  return (
    <div>
      <div> <img src="https://i.ibb.co/ZGZdZ9b/title.png" /> </div>
    </div>
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

const renderScrumMaster = (scrumMaster) => {
  return (
    <div>
      <div className={styles.titleBody}><strong>Scrum Master</strong></div>
      <div className={styles.bodyGroup}>
        <MemberCard dados={scrumMaster} membersPage={scrumMaster.length} socialNetworks={socialNetworks} />
      </div>
    </div>
  )
}

const renderTutores = (tutores) => {
  return (
    <div>
      <div className={styles.titleBody}><strong>Tutores</strong></div>
      <div className={styles.bodyGroup}>
        <MemberCard dados={tutores} membersPage={tutores.length} socialNetworks={socialNetworks} />
      </div>
    </div>
  )
}

const renderMembros = (membros, membersPage) => {
  return (
    <div>
      <div className={styles.titleBodyMembers}><strong>Membros</strong></div>
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersArea}>
            <MemberCard dados={membros} membersPage={membersPage} socialNetworks={socialNetworks} />
          </div>
        </div>

      </div>
    </div>
  )
}

const renderVerMais = (membersPage, setMembersPage, totalMembrosAtivos) => {
  return (
    <div>
      <div className={styles.loadArea}>
        {membersPage < totalMembrosAtivos ?
          <div onClick={() => setMembersPage(membersPage + 8)}
            className={styles.loadMore}>
            <strong>Ver mais<hr className={styles.line}></hr></strong>
          </div>
          : <div onClick={() => setMembersPage(8)} className={styles.loadMore}><strong>Recolher<hr className={styles.lineRecolher}></hr></strong></div>
        }
      </div>
    </div>
  )
}