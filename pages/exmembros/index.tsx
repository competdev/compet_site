import styles from "./ExMembros.module.css";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { sortReducer } from "../../reducers/sortReducer";
import { SortOrder } from "../../types/types";
import { NEXT_URL } from "../../util/config";

import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import SectionTitle from "../../components/SectionTitle";
import MemberCard from "../../components/MembersCard";
import Footer from "../../components/Footer";

const socialNetworks = false;

ExMembros.getInitialProps = async () => {
  const response = await axios.get(NEXT_URL + "/api/membros");

  const exMembros = response.data.filter((data) => {
    return data.membro_ativo == false && data.tutor == false;
  });

  const tutores = response.data.filter((data) => {
    return data.membro_ativo == false && data.tutor == true;
  });

  return {
    dados: exMembros,
    tutores: tutores,
    totalExMembros: exMembros.length,
  };
};

// Função principal exportando o html da pag.
export default function ExMembros({ dados, tutores, totalExMembros }) {
  const [membersPage, setMembersPage] = useState(8);
  const [tutoresState, dispatchTutores] = useReducer(sortReducer, tutores);
  const [exMembrosState, dispatchExMembros] = useReducer(sortReducer, dados);

  const [sortType, setSortType] = useState(SortOrder.DATE_DESC);
  function handleSelect(event) {
    setSortType(event.target.value);
  }

  useEffect(() => {
    switch (sortType) {
      case SortOrder.NAME_ASC:
        dispatchTutores({ type: SortOrder.NAME_ASC });
        dispatchExMembros({ type: SortOrder.NAME_ASC });
        break;
      case SortOrder.NAME_DESC:
        dispatchTutores({ type: SortOrder.NAME_DESC });
        dispatchExMembros({ type: SortOrder.NAME_DESC });
        break;
      case SortOrder.DATE_ASC:
        dispatchTutores({ type: SortOrder.DATE_ASC });
        dispatchExMembros({ type: SortOrder.DATE_ASC });
        break;
      case SortOrder.DATE_DESC:
        dispatchTutores({ type: SortOrder.DATE_DESC });
        dispatchExMembros({ type: SortOrder.DATE_DESC });
        break;
    }
  }, [sortType]);

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <Header />
      <PageHeader
        url={"https://i.ibb.co/1TV1hgd/exmembros.png"}
        caption={true}
        sortType={sortType}
        handleSelect={handleSelect}
      />
      {renderBodyPage(exMembrosState, tutoresState, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalExMembros)}
      <Footer />
    </div>
  );
}

const renderBodyPage = (exMembrosState, tutoresState, membersPage) => {
  const scrumMasterSection = "Ex-membros";

  return (
    <main>
      {renderTutores(tutoresState)}
      <SectionTitle title={scrumMasterSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          {renderMemberArea(exMembrosState, membersPage)}
        </div>
      </div>
    </main>
  );
};

const renderTutores = (tutoresState) => {
  const scrumMasterSection = "Ex-tutores";

  return (
    <>
      <SectionTitle title={scrumMasterSection} />
      <div className={styles.bodyGroup}>
        <div className={styles.containerMembers}>
          <div className={styles.membersAreaTutor}>
            {tutoresState && (
              <MemberCard
                dados={tutoresState}
                membersPage={tutoresState.length}
                socialNetworks={socialNetworks}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const renderMemberArea = (exMembrosState, membersPage) => {
  return (
    <div className={styles.membersArea}>
      {exMembrosState && (
        <MemberCard
          dados={exMembrosState}
          membersPage={membersPage}
          socialNetworks={socialNetworks}
        />
      )}
    </div>
  );
};

const renderVerMais = (membersPage, setMembersPage, totalExMembros) => {
  return (
    <div className={styles.loadArea}>
      {membersPage < totalExMembros ? (
        <div
          onClick={() => setMembersPage(membersPage + 8)}
          className={styles.loadMore}
        >
          <strong>
            Ver mais<hr className={styles.line}></hr>
          </strong>
        </div>
      ) : (
        <div onClick={() => setMembersPage(8)} className={styles.loadMore}>
          <strong>
            Recolher<hr className={styles.lineRecolher}></hr>
          </strong>
        </div>
      )}
    </div>
  );
};
