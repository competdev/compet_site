import styles from "./ExpedienteInterPet.module.css"

export default function ExpedienteInterPet() {
    return (
        <div className={styles.aboutCard}>
            <div className={styles.imageContainer}>
                <img src="https://i.ibb.co/MhJkY7n/Logo-Interpet.png" />
                <span>Editor chefe</span>
                <span>Sandro Renato Dias</span>
            </div>
            <div className={styles.content}>
                <div className={styles.peopleBlock}>
                    <span className={styles.header}>Conselho Editorial</span>
                    <span className={styles.person}>Hermes Augusto Oliveira Rabelo</span>
                    <span className={styles.person}>André Rodrigues da Cruz</span>
                    <span className={styles.person}>Joana Ancila Pessoa Forte Avelino</span>
                    <span className={styles.person}>Sandro Renato Dias</span>
                    <span className={styles.person}>Mayk Jonhon de Carvalho Souza</span>
                    <span className={styles.header}>Autor Corporativo</span>
                    <span className={styles.person}>CEFET MG</span>
                </div>
                <div className={styles.peopleBlock}>
                    <span className={styles.header}>Editor Adjunto</span>
                    <span className={styles.person}>Joana Ancila Pessoa Forte Avelino</span>
                    <span className={styles.header}>Diagramação</span>
                    <span className={styles.person}>Joana Ancila Pessoa Forte Avelino</span>
                    <span className={styles.header}>Periodicidade</span>
                    <span className={styles.person}>ANUAL</span>
                </div>
            </div>
        </div>
    )
}
