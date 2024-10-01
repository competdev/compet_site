import { useState } from "react"
import styles from "./Faltas.module.css"
import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import Footer from "../../components/Footer"
import Head from "next/head"

export default function Manual({ dados = [] }) {
    const [query, setQuery] = useState("")

    const header_img_url = "https://i.ibb.co/0BY1q2k/Help.png"

    return (
        <div className={styles.pageContent}>
            <Head>
                <title>COMPET | Matrícula</title>
            </Head>
            <Header />
            <PageHeader url={header_img_url} caption={false} />
            {renderFaltas(dados)}
            <Footer />
        </div>
    )
}

const renderFaltas = dadosAtuais => {
    return (
        <div className={styles.faltasContainer}>
            {container()}
        </div>
    )
}

const container = () => {
    return (
        <div className={styles.faltasCard}>
            <h2 className={styles.faltasTitulo}>Tabela de Faltas</h2>

            <table className={styles.faltasA}>
                <thead>
                    <tr>
                        <th className={styles.thItem}>Horas</th>
                        <th className={styles.thItem}>Créditos</th>
                        <th className={styles.thItem}>Máximo de Faltas (h)</th>
                        <th className={styles.thItem}>Máximo de Faltas (dias)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.tdItem}>30</td>
                        <td className={styles.tdItem}>2</td>
                        <td className={styles.tdItem}>7,5</td>
                        <td className={styles.tdItem}>3</td>
                    </tr>
                    <tr>
                        <td className={styles.tdItem}>60</td>
                        <td className={styles.tdItem}>4</td>
                        <td className={styles.tdItem}>15</td>
                        <td className={styles.tdItem}>7</td>
                    </tr>
                    <tr>
                        <td className={styles.tdItem}>90</td>
                        <td className={styles.tdItem}>6</td>
                        <td className={styles.tdItem}>22,5</td>
                        <td className={styles.tdItem}>11</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
