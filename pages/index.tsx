import axios from "axios"
import Head from "next/head"
import styles from "../styles/Index.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import MediaSection from "../components/home/MediaSection"
import Hero from "../components/home/Hero"
import Anos10Popup from "../components/home/Anos10Popup"
import Pilares from "../components/home/Pilares"
import Organizacao from "../components/home/Organizacao"
import JunteSe from "../components/home/JunteSe"

import { NEXT_URL } from "../util/config"

Index.getInitialProps = async () => {
    const news = axios.get(NEXT_URL + "/api/news")
    const partners = axios.get(NEXT_URL + "/api/parceiros")

    const [newsRes, partnersRes] = await Promise.all([news, partners])

    return {
        dados: newsRes.data,
        dadosParceiros: partnersRes.data,
    }
}

export default function Index({ dados, dadosParceiros }) {
    return (
        <>
            <Head>
                <title>COMPET - PET Engenharia de Computação CEFETMG</title>
                <meta name="description" content="PET da Engenharia de Computação do CEFETMG - COMPET" />
            </Head>
        <div className={styles.body}>
            <div className={styles.container}>
                <Header />
                    <Hero />
                    <Anos10Popup />
                    <Pilares />
                    <Organizacao />
                    <JunteSe />
                    <MediaSection newsData={dados} />
                <Partners data={dadosParceiros} />
            </div>
            <Footer />
        </div>
        </>
    )
}
