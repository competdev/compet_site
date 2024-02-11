import styles from "./Equipe.module.css"
import axios from "axios"
import { useState, useEffect, useReducer } from "react"
import { sortReducer } from "../../reducers/sortReducer"
import { SortAction, SortOrder } from "../../types/types"
import { NEXT_URL } from "../../util/config"

import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import SectionTitle from "../../components/SectionTitle"
import MemberCard from "../../components/MembersCard"
import Footer from "../../components/Footer"

const socialNetworks = true

Equipe.getInitialProps = async () => {
    const response = await axios.get(NEXT_URL + "/api/membros")

    const membrosAtuais = response.data.filter(data => {
        return data.membro_ativo == true && data.scrum_master == false && data.tutor == false
    })

    const scrumMaster = response.data.filter(data => {
        return data.membro_ativo == true && data.scrum_master == true
    })

    const tutores = response.data.filter(data => {
        return data.membro_ativo == true && data.tutor == true
    })

    function byName(member1, member2) {
        if (member1.nome < member2.nome) return -1
        if (member1.nome > member2.nome) return 1
        return 0
    }

    return {
        membros: membrosAtuais,
        scrumMaster: scrumMaster,
        tutores: tutores,
        totalMembrosAtivos: membrosAtuais.length,
    }
}

export default function Equipe({ membros, scrumMaster, tutores, totalMembrosAtivos }) {
    const [membersPage, setMembersPage] = useState(8)
    const [tutoresState, dispatchTutores] = useReducer(sortReducer, tutores)
    const [membrosState, dispatchExMembros] = useReducer(sortReducer, membros)

    const header_img_url = "https://i.ibb.co/5K58j8k/equipe.png"

    const [sortType, setSortType] = useState(SortOrder.DATE_DESC)
    function handleSelect(event) {
        setSortType(event.target.value)
    }

    useEffect(() => {
        switch (sortType) {
            case SortOrder.NAME_ASC:
                dispatchTutores({ type: SortOrder.NAME_ASC })
                dispatchExMembros({ type: SortOrder.NAME_ASC })
                break
            case SortOrder.NAME_DESC:
                dispatchTutores({ type: SortOrder.NAME_DESC })
                dispatchExMembros({ type: SortOrder.NAME_DESC })
                break
            case SortOrder.DATE_ASC:
                dispatchTutores({ type: SortOrder.DATE_ASC })
                dispatchExMembros({ type: SortOrder.DATE_ASC })
                break
            case SortOrder.DATE_DESC:
                dispatchTutores({ type: SortOrder.DATE_DESC })
                dispatchExMembros({ type: SortOrder.DATE_DESC })
                break
        }
    }, [sortType])

    return (
        <div className={styles.groupDiv}>
            <title>COMPET | Membros atuais</title>
            <Header />
            <PageHeader
                url={header_img_url}
                caption={true}
                sortType={sortType}
                handleSelect={handleSelect}
            />
            {renderTutores(tutoresState)}
            {renderScrumMaster(scrumMaster)}
            {renderMembros(membrosState, membersPage)}
            {renderVerMais(membersPage, setMembersPage, totalMembrosAtivos)}
            <Footer />
        </div>
    )
}

const renderScrumMaster = scrumMaster => {
    const scrumMasterSection = "Scrum Master"
    return (
        <div>
            <SectionTitle title={scrumMasterSection} />
            <div className={styles.bodyGroup}>
                <div className={styles.containerMembers}>
                    <div className={styles.membersArea}>
                        <MemberCard
                            dados={scrumMaster}
                            membersPage={scrumMaster.length}
                            socialNetworks={socialNetworks}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderTutores = tutores => {
    const tutorSection = "Tutores"
    return (
        <div>
            <SectionTitle title={tutorSection} />
            <div className={styles.bodyGroup}>
                <div className={styles.containerMembers}>
                    <div className={styles.membersArea}>
                        <MemberCard
                            dados={tutores}
                            membersPage={tutores.length}
                            socialNetworks={socialNetworks}
                        />
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
                        <MemberCard
                            dados={membros}
                            membersPage={membersPage}
                            socialNetworks={socialNetworks}
                        />
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
                {membersPage < totalMembrosAtivos ? (
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
        </div>
    )
}
