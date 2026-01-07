import React from "react";
import SectionTitle from "../SectionTitle";
import styles from "./NormasInterPet.module.css";

const NormasInterPet: React.FC = () => {
    return (
        <section className={styles.normas}>
            <SectionTitle title="Normas para publicação" />
            <div className={styles.normasContent}>
                <div className={styles.normaCard}>
                    <div className={styles.normaIcon}>📝</div>
                    <h3 className={styles.normaTitle}>Da submissão</h3>
                    <p className={styles.normaText}>
                        Os textos são oriundos do{' '}
                        <strong>Encontro de Programas de Educação Tutorial do CEFET MG – INTERPET</strong>{' '}
                        e são submetidos via Edital de Chamada para Publicação do INTERPET, e devem
                        estar de acordo com os requisitos estabelecidos no referido documento.
                    </p>
                </div>

                <div className={styles.normaCard}>
                    <div className={styles.normaIcon}>📄</div>
                    <h3 className={styles.normaTitle}>Do formato do texto</h3>
                    <p className={styles.normaText}>
                        O texto proposto deve estar devidamente formatado em arquivo editável (doc ou odt).
                    </p>
                    <p className={styles.normaText}>
                        As regras da ABNT oferecem um formato ideal para a preparação dos textos a serem
                        publicados. É imprescindível que o texto, por inteiro, siga rigorosamente as
                        mesmas regras de formatação (atentar para padronização de títulos e subtítulos,
                        marcadores, citações diretas, referências bibliografias, notas de rodapé,
                        siglas, símbolos, excessos de espaçamentos etc).
                    </p>
                </div>

                <div className={styles.normaCard}>
                    <div className={styles.normaIcon}>✅</div>
                    <h3 className={styles.normaTitle}>Das avaliações</h3>
                    <p className={styles.normaText}>
                        Os textos serão submetidos a uma checagem prévia da Equipe de Editoração e, caso
                        apresentem problemas de padronização em seu formato, serão devolvidos ao
                        proponente para as devidas adequações, sendo posteriormente submetidos a parecer
                        técnico-científico.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NormasInterPet;
