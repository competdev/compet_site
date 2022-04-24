import axios from 'axios';

import { useState } from 'react'
import styles from './ExMembros.module.css'

import Header from '../../components/Header'
import PageHeader from '../../components/PageHeader'
import SectionTitle from '../../components/SectionTitle'
import MemberCard from '../../components/MembersCard'
import Footer from '../../components/Footer'
import Az from '../../components/OrderExmembros'
import Za from '../../components/OrderExmembros'

const socialNetworks = false;
const vercelURL = "https://compet.vercel.app"
const localURL = "http://localhost:3000"
const cefetURL = "http://compet.decom.cefetmg.br"

const ativo = 0

ExMembros.getInitialProps = async () => {
  const response = await axios.get(localURL + "/api/membros");

  const exMembros = response.data.filter(data => {
    return (data.membro_ativo == false && data.tutor == false);
  });

  const tutores = response.data.filter(data => {
    return (data.membro_ativo == false && data.tutor == true);
  })

  const comp = (lhs, rhs) => {
    const lhsAnoFim = (new Date(lhs.data_fim)).getFullYear();
    const rhsAnoFim = (new Date(rhs.data_fim)).getFullYear();
    if (lhsAnoFim != rhsAnoFim) return (lhsAnoFim < rhsAnoFim) ? 1 : -1;

    const lhsAnoInicio = (new Date(lhs.data_inicio)).getFullYear();
    const rhsAnoInicio = (new Date(rhs.data_inicio)).getFullYear();
    if (lhsAnoInicio != rhsAnoInicio) return (lhsAnoInicio < rhsAnoInicio) ? 1 : -1;

    if (lhs.nome != rhs.nome) return (lhs.nome < rhs.nome) ? 1 : -1;
    return 0;
  }
  exMembros.sort(Az);
  tutores.sort(Az);
  return { dados: exMembros, tutores: tutores, totalExMembros: exMembros.length }
};

// Função principal exportando o html da pag.
export default function ExMembros({ dados, tutores, totalExMembros }) {
  
  let [membersPage, setMembersPage] = useState(8);

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <Header />
      <PageHeader url={'https://i.ibb.co/1TV1hgd/exmembros.png'} caption={true} />
      {renderBodyPage(dados, tutores, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalExMembros)}
      <Footer />
    </div >
  )
}

const renderBodyPage = (dados, tutores, membersPage) => {
  const scrumMasterSection = "Ex-membros"
  return (
    <div>
      {renderTutores(tutores)}
      <SectionTitle title={scrumMasterSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          {renderMemberArea(dados, membersPage)}
        </div>
      </div>
    </div>
  )
}

const renderTutores = (tutores) => {
  const scrumMasterSection = "Ex-tutores"
  

  return (
    
    <div>
      <button onClick={this.Az()}>A-z</button>
      <SectionTitle title={scrumMasterSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersAreaTutor}>
            <MemberCard dados={tutores} membersPage={tutores.length} socialNetworks={socialNetworks} />
          </div>
        </div>
      </div>
    </div>
  )
}

const renderMemberArea = (dados, membersPage) => {
  return (
    <div>
      <div className={styles.membersArea}>
        <MemberCard dados={dados} membersPage={membersPage} socialNetworks={socialNetworks} />
      </div>
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
