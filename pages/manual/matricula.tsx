import { useState } from "react"
import Link from "next/link"
import styles from "./Matricula.module.css"
import Header from "../../components/Header"
import PageHeader from "../../components/PageHeader"
import Footer from "../../components/Footer"
import Head from "next/head"

export default function Manual({ dados = [] }) {

    const header_img_url = "https://i.ibb.co/0BY1q2k/Help.png"

    return (
        <div className={styles.pageContent}>
            <Head>
                <title>COMPET | Matrícula</title>
            </Head>
            <Header />
            <PageHeader url={header_img_url} caption={false} />
            {renderMatricula(dados)}
            <Footer />
        </div>
    )
}

const renderMatricula = dadosAtuais => {
    return (
        <div className={styles.matriculaArea}>
            <div className={styles.matriculaContainer}>
                {container()}
                {dadosAtuais.map(item => (
                    <div key={item.id} className={styles.matriculaCard}>
                        <div>
                            <img
                                src="https://i.ibb.co/0BY1q2k/Help.png"
                                alt=""
                                className={styles.matriculaImg}
                            />
                        </div>
                        <div className={styles.matriculaTitulo}>{item.name}</div>
                        <div className={styles.matriculaLink}>
                            <Link href={item.url} target="_blank">
                                Acessar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const container = () => {
    return (
        <div className={styles.matriculaCard}>
            <h2 className={styles.matriculaTitulo}>Fase da Matrícula</h2>

            <h3 className={styles.subtitulo}>1ª Fase</h3>
            <p className={styles.paragrafo}>
                Solicitação de matrícula nas turmas com reserva de vagas para o curso;
            </p>
            <p className={styles.paragrafo}>
                Solicitação de matrícula em turmas sem reserva de vagas – Física Experimental e
                Turmas Extras (disciplinas equalizadas ou não).
            </p>

            <p className={styles.paragrafoB}>Data: 24 e 25/09/2024</p>
            <p className={styles.paragrafoR}>Resultado 1ª Fase: 27/09/2024</p>

            <h3 className={styles.subtitulo}>2ª Fase</h3>
            <p className={styles.paragrafo}>
                Solicitação de matrícula nas turmas com reserva de vagas para o curso;
            </p>
            <p className={styles.paragrafo}>
                Solicitação de matrícula em turmas sem reserva de vagas – Física Experimental e
                Turmas Extras (disciplinas equalizadas ou não);
            </p>
            <p className={styles.paragrafo}>
                Solicitação de matrícula em turmas de outros cursos, incluindo disciplinas eletivas.
            </p>
            <p className={styles.paragrafoB}>Data: 28 a 30/09/2024</p>
            <p className={styles.paragrafoR}>Resultado 2ª Fase: 02/10/2024</p>

            <h3 className={styles.subtitulo}>Ajustes</h3>
            <p className={styles.paragrafo}>
                Solicitação de ajustes (pelos alunos, diretamente à sua coordenação).
            </p>
            <p className={styles.paragrafoB}>Data: 03 a 07/10/2024</p>
            <p className={styles.paragrafo}>
                Análise e realização dos ajustes, pelas coordenações (para casos especiais como
                prováveis formandos com quebra de cor requisito e pré-requisito).
            </p>
            <p className={styles.paragrafoB}>Data: 08 a 23/10/2024</p>

            <h3 className={styles.subtitulo}>Matrícula Extraordinária</h3>
            <p className={styles.paragrafo}>
                Matrícula via WEB em turmas com vagas ociosas - incluindo disciplinas eletivas.
            </p>
            <p className={styles.paragrafoB}>Data: 24 e 25/10/2024</p>
            <p className={styles.paragrafoR}>Resultado Extraordinária: IMEDIATO.</p>

            <h3 className={styles.subtitulo}>Lembretes Importantes</h3>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    A matrícula em disciplinas é de responsabilidade do(a) estudante.
                </li>
                <li className={styles.listItem}>
                    Na 1a Fase, o(a) estudante visualizará apenas as turmas com reservas de vagas
                    para seu curso, turmas extras e outras turmas sem reservas de vagas (como por
                    exemplo, Física Experimental).
                </li>
                <li className={styles.listItem}>Na 2ª Fase, estarão visíveis todas as turmas.</li>
                <li className={styles.listItem}>
                    Nas turmas com reserva de vagas a prioridade de ocupação é dos alunos do
                    respectivo curso. Caso as vagas não sejam totalmente ocupadas por alunos do
                    curso, as vagas restantes poderão ser ocupadas por estudantes de outros cursos,
                    respeitando-se os critérios previstos nas Normas Acadêmicas.
                </li>
                <li className={styles.listItem}>
                    As solicitações de ajuste de matrícula devem ser feitas diretamente à
                    Coordenação de seu Curso.
                </li>
                <li className={styles.listItem}>
                    Na Matrícula Extraordinária, a ocupação das vagas ocorre de forma imediata, de
                    acordo com a ordem de solicitação.
                </li>
                <li className={styles.listItemB}>
                    Não se esqueça de salvar suas solicitações de matrícula!
                </li>
            </ul>

            <h3 className={styles.subtitulo}>Tutoriais</h3>
            <ul className={styles.list}>
                <li className={styles.listItemB}>
                    <a
                        className={styles.link}
                        href="https://drive.google.com/file/d/1aCxFxKWq25SPdQ7yfpwuCRAH3xdPss4i/view"
                        target="_blank"
                    >
                        Tutorial 1
                    </a>
                </li>
                <li className={styles.listItemB}>
                    <a
                        className={styles.link}
                        href="https://www.sistemas.cefetmg.br/matricula-online-alunos-veteranos-da-graduacao/"
                        target="_blank"
                    >
                        Tutorial 2
                    </a>
                </li>
                <li className={styles.listItemB}>
                    <a
                        className={styles.link}
                        href="https://docs.google.com/document/d/e/2PACX-1vS9PpVtcQsssG-bzsWhYirlTsPPDd8oT2qZ-_oBHHHuKiLv4zkqthK2bJLAkEQQRyBwQ6UdMqnGju0P/pub"
                        target="_blank"
                    >
                        Orientações sobre migração de currículos
                    </a>
                </li>
            </ul>

            <p className={styles.subtitulo}>
                Contato para dúvidas:{" "}
                <a className={styles.link} href="mailto:bruno.decom@gmail.com">
                    bruno.decom@gmail.com
                </a>
            </p>
        </div>
    )
}
