import axios from 'axios';
import { useState } from 'react'
import styles from './Equipe.module.css'

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader';
import SectionTitle from '../../components/SectionTitle'
import MemberCard from '../../components/MembersCard'
import Footer from '../../components/Footer'

const socialNetworks = true;

Equipe.getInitialProps = async () => {
  const response = await axios.get('http://localhost:3000/api/membros');

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
  const header_img_url = "https://i.ibb.co/5K58j8k/equipe.png"

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Membros atuais</title>
      <Header />
      <PageHeader url={header_img_url} caption={true} />
      {renderTutores(tutores)}
      {renderScrumMaster(scrumMaster)}
      {renderMembros(membros, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalMembrosAtivos)}
      <Footer />
    </div>
  )
}

const renderScrumMaster = (scrumMaster) => {
  const scrumMasterSection = "Scrum Master"
  return (
    <div>
      <SectionTitle title={scrumMasterSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersArea}>
            <MemberCard dados={scrumMaster} membersPage={scrumMaster.length} socialNetworks={socialNetworks} />
          </div>
        </div>
      </div>
    </div>
  )
}

const renderTutores = (tutores) => {
  const tutorSection = "Tutores"
  return (
    <div>
      <SectionTitle title={tutorSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersArea}>
            <MemberCard dados={tutores} membersPage={tutores.length} socialNetworks={socialNetworks} />
          </div>
        </div>
      </div>
    </div>
  )
}

const renderMembros = (membros, membersPage) => {
  const memberSection = "Membros"
  return (
    <div>
      <SectionTitle title={memberSection} />
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