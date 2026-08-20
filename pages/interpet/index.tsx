import axios from "axios"
import { NEXT_URL } from "../../util/config"

import Head from "next/head"
import Header from "../../components/Header"
import PageTitle from "../../components/PageTitle"
import AboutCard from "../../components/AboutInterPet"
import CurrEdition from "../../components/CurrEditionInterPet"
import PastEditions from "../../components/PastEditionsInterPet"
import ContactInterPet from "../../components/ContactInterPet"
import Footer from "../../components/Footer"
import ExpedienteInterPet from "../../components/ExpedienteInterPet"
import NormasInterPet from "../../components/NormasInterPet"
import InterPetHero from "../../components/interpet/Hero"
import styles from "./InterPet.module.css"

InterPet.getInitialProps = async () => {
    const response = await axios.get(NEXT_URL + "/api/interpet")
    return { dados: response.data }
}

export default function InterPet({ dados }) {
    return (
        <>
            <Head>
                <title>InterPET - COMPET</title>
                <meta name="description" content="Encontro de Programas de Educação Tutorial do CEFET-MG" />
            </Head>
            <Header />
            <PageTitle title="Interpet" />
            <main>
                <InterPetHero />
                <div className={styles.container}>
                    <AboutCard />
                    <NormasInterPet />
                    <ExpedienteInterPet />
                    <CurrEdition dados={dados} />
                    <PastEditions elements={dados} />
                    <ContactInterPet />
                </div>
            </main>
            <Footer />
        </>
    )
}
