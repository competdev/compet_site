import styles from "./NormasInterPet.module.css"

import SectionTitle from "../SectionTitle"

export default function NormasInterPet() {
    return (
        <div className={styles.outerWrapper}>
            <SectionTitle title="Normas para publicação" />
            <div className={styles.sobre}>
                <h4 style={{ textTransform: "uppercase" }}>Da submissão</h4>
                <span>
                    Os textos são oriundos do{" "}
                    <strong>
                        {" "}
                        Encontro de Programas de Educação Tutorial do CEFET MG – INTERPET{" "}
                    </strong>{" "}
                    e são submetidos via Edital de Chamada para Publicação do INTERPET, e devem
                    estar de acordo com os requisitos estabelecidos no referido documento.
                </span>
                <h4 style={{ textTransform: "uppercase" }}>Do formato do texto</h4>
                <span>
                    O texto proposto deve estar devidamente formatado em arquivo editável (doc ou
                    odt).
                </span>
                <span>
                    As regras da ABNT oferecem um formato ideal para a preparação dos textos a serem
                    publicados. É imprescindível que o texto, por inteiro, siga rigorosamente as
                    mesmas regras de formatação (atentar para padronização de títulos e subtítulos,
                    marcadores, citações diretas, referências bibliografias, notas de rodapé,
                    siglas, símbolos, excessos de espaçamentos etc).
                </span>
                <h4 style={{ textTransform: "uppercase" }}>Das avaliações</h4>
                <span>
                    Os textos serão submetidos a uma checagem prévia da Equipe de Editoração e, caso
                    apresentem problemas de padronização em seu formato, serão devolvidos ao
                    proponente para as devidas adequações, sendo posteriormente submetidos a parecer
                    técnico-científico.
                </span>
            </div>
        </div>
    )
}
