import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "../styles/Index.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Partners from "../components/Partners"
import MediaSection from "../components/home/MediaSection"
import Hero from "../components/home/Hero"
import Anos10Popup from "../components/home/Anos10Popup"
import ProcessoSeletivoPopup from "../components/home/ProcessoSeletivoPopup"
import Pilares from "../components/home/Pilares"
import Organizacao from "../components/home/Organizacao"
import JunteSe from "../components/home/JunteSe"
import InterpetMention from "../components/home/InterpetMention"

export default function Index() {
    const [dados, setDados] = useState([])
    const [dadosParceiros, setDadosParceiros] = useState([])

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const [newsRes, partnersRes] = await Promise.all([
                    fetch("/api/news"),
                    fetch("/api/parceiros"),
                ])
                const [news, partners] = await Promise.all([
                    newsRes.ok ? newsRes.json() : Promise.resolve([]),
                    partnersRes.ok ? partnersRes.json() : Promise.resolve([]),
                ])
                if (!cancelled) {
                    setDados(Array.isArray(news) ? news : [])
                    setDadosParceiros(Array.isArray(partners) ? partners : [])
                }
            } catch {
                if (!cancelled) {
                    setDados([])
                    setDadosParceiros([])
                }
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

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
                    <ProcessoSeletivoPopup />
                    <Anos10Popup />
                    <Pilares />
                    <Organizacao />
                    <JunteSe />
                    <MediaSection newsData={dados} />
                    <InterpetMention />
                <Partners data={dadosParceiros} />
            </div>
            <Footer />
        </div>
        </>
    )
}
