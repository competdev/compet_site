import { useState } from "react"
import Link from "next/link"
import styles from "./Manual.module.css"
import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import Footer from "../../components/Footer"
import Head from "next/head"

export default function Manual({ dados = [] }) {
    const header_img_url = "https://i.ibb.co/0BY1q2k/Help.png"

    return (
        <div className={styles.pageContent}>
            <Head>
                <title>COMPET | Manual do Calouro</title>
            </Head>
            <Header />
            <PageHeader url={header_img_url} caption={false} />
            {renderManual(dados)}
            <Footer />
        </div>
    )
}

const renderManual = dadosAtuais => {
    return (
        <div className={styles.manualArea}>
            <div className={styles.manualContainer}>
                {calendario()}
                {faltas()}
                {emailInstitucional()}
                {gruposTurmas()}
                {formularios()}
                {estagio()}
                {gruposGerais()}
                {emails()}
                {biblioteca()}
            </div>
        </div>
    )
}

const calendario = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Calendário CEFET</div>
            <div>
                <img
                    src="https://i.ibb.co/4FC1KfN/2.png"
                    alt="Calendário CEFET"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulo}>2024.2</div>
            <div className={styles.link}>
                <Link
                    href="https://www.dirgrad.cefetmg.br/wp-content/uploads/sites/81/2024/09/CalendarioGraduacao_2024_02_BHTE.pdf"
                    target="_blank"
                >
                    Acessar
                </Link>
            </div>
            <div className={styles.subtitulo}>Matricula 2024.2</div>
            <div className={styles.link}>
                <Link href="/manual/matricula">Acessar</Link>
            </div>
        </div>
    )
}

const faltas = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Faltas (25%)</div>
            <div>
                <img
                    src="https://i.ibb.co/NTmfzKR/8.png"
                    alt="Faltas"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulob}>Quantas faltas posso ter?</div>
            <div className={styles.linkb}>
                <Link href="/manual/faltas">Consulte</Link>
            </div>
        </div>
    )
}

const formularios = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Formulários e Normas</div>

            <img
                src="https://i.ibb.co/dk6NQf3/Design-sem-nome.png"
                alt="Formularios e Normas"
                className={styles.manualImg}
            />
            <div className={styles.linkFN}>
                <Link
                    href="https://www.dirgrad.cefetmg.br/dirgrad/regulamentos-e-normas/"
                    target="_blank"
                >
                    Regulamentos
                </Link>
            </div>
            <div className={styles.linkFN}>
                <Link
                    href="https://www.dirgrad.cefetmg.br/wp-content/uploads/sites/81/2017/09/Normas_CEPE_2007_com-Res.-CEPE.pdf"
                    target="_blank"
                >
                    Normas de Graduação
                </Link>
            </div>
            <div className={styles.linkFN}>
                <Link
                    href="https://www.eng-computacao.bh.cefetmg.br/wp-content/uploads/sites/188/2019/12/PPC_-_Eng_Computacao.pdf"
                    target="_blank"
                >
                    PPC
                </Link>
            </div>
        </div>
    )
}

const estagio = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Setor de Estágio</div>
            <div>
                <img
                    src="https://i.ibb.co/vPY3JQY/3.png"
                    alt="Estagio"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulo}>Dúvidas (Graduação - BH) </div>
            <div className={styles.subtitulo}>Local: Campus 1, 4º andar, sala 425 </div>
            <div className={styles.link}>
                <Link href="mailto:carreiras-ng@cefetmg.br" target="_blank">
                    E-mail
                </Link>
            </div>
        </div>
    )
}

const gruposGerais = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Grupos Gerais</div>

            <img
                src="https://i.ibb.co/wKqx1sc/4.png"
                alt="GruposGerais"
                className={styles.manualImg}
            />
            <div className={styles.link}>
                <Link href="https://t.me/joinchat/UieitVps6hv2dLv0" target="_blank">
                    Telegram
                </Link>
            </div>
            <div className={styles.link}>
                <Link href="https://chat.whatsapp.com/1SaBSOTpeuSFxpyYQFScUx" target="_blank">
                    Whatsapp
                </Link>
            </div>
            <div className={styles.link}>
                <Link href="https://chat.whatsapp.com/HLUQYiyPslcIXFTHSYW6aW" target="_blank">
                    Whatsapp - 2
                </Link>
            </div>
            <div className={styles.link}>
                <Link href="https://discord.gg/ukqrA3Y" target="_blank">
                    Servidor Discord
                </Link>
            </div>
        </div>
    )
}

const emails = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>E-mails Coordenação</div>
            <div>
                <img
                    src="https://i.ibb.co/8bJKW6r/5.png"
                    alt="Emails"
                    className={styles.manualImg}
                />
            </div>
            <div className={styles.email}>
                <div className={styles.subtitulo}>Bruno</div>
                <div className={styles.link}>
                    <Link href="mailto:bsantos@cefetmg.br" target="_blank">
                        E-mail
                    </Link>
                </div>
            </div>
            <div className={styles.emailv}>
                <div className={styles.subtitulo}>Jeferson</div>
                <div className={styles.link}>
                    <Link href="mailto:jeferson@cefetmg.br" target="_blank">
                        E-mail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const biblioteca = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Biblioteca</div>
            <div>
                <img
                    src="https://i.ibb.co/Tq0dz0c/6.png"
                    alt="Biblioteca"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulob}>Biblioteca</div>
            <div className={styles.linkb}>
                <Link
                    href="https://www.biblioteca.cefetmg.br/mobile/busca.php?idioma=ptbr&acesso=web"
                    target="_blank"
                >
                    Acesse
                </Link>
            </div>
        </div>
    )
}

const emailInstitucional = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Email Institucional</div>
            <div>
                <img
                    src="https://i.ibb.co/z5BzbZm/8.png"
                    alt="EmailInstitucional"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulob}>Como fazer seu email institucional </div>
            <div className={styles.linkb}>
                <Link
                    href="https://www.dti.cefetmg.br/catalogo-de-servicos/correio-eletronico/endereco-de-redirecionamento-para-alunos/"
                    target="_blank"
                >
                    Acessar
                </Link>
            </div>
        </div>
    )
}

const gruposTurmas = () => {
    return (
        <div className={styles.manualCard}>
            <div className={styles.manualTitulo}>Grupos das Turmas</div>
            <div>
                <img
                    src="https://i.ibb.co/VVDHbcK/7.png"
                    alt="gruposTurmas"
                    className={styles.manualImg}
                />
            </div>

            <div className={styles.subtitulob}>Encontre sua turma </div>
            <div className={styles.linkb}>
                <Link
                    href="https://drive.google.com/file/d/1kXASQr6Z6teDh4kmapREyOmuiimHw5f5/view?usp=drive_link"
                    target="_blank"
                >
                    Acessar
                </Link>
            </div>
        </div>
    )
}
