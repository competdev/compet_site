import styles from "./ExpedienteInterPet.module.css";

export default function ExpedienteInterPet() {
  return (
    <div className={styles.aboutCard}>
      <div className={styles.sidePanel}>
        <img src="https://i.ibb.co/MhJkY7n/Logo-Interpet.png" width={300}/>
      </div>
      <div className={styles.sobreInfo}>
        <h1 className={styles.title}>Expediente</h1>
        <div className={styles.content}>
          <div>
            <strong className={styles.header}>Conselho Editorial</strong>
            <p>Hermes Augusto Oliveira Rabelo</p>
            <p>André Rodrigues da Cruz</p>
            <p>Joana Ancila Pessoa Forte Avelino</p>
            <p>Sandro Renato Dias</p>
            <p>Mayk Jonhon de Carvalho Souza</p>
            <strong className={styles.header}>Autor Corporativo</strong>
            <p>CEFET MG</p>
          </div>
          <div>
            <strong className={styles.header}>Editor Adjunto</strong>
            <p>Joana Ancila Pessoa Forte Avelino</p>
            <strong className={styles.header}>Diagramação</strong>
            <p>Joana Ancila Pessoa Forte Avelino</p>
            <strong className={styles.header}>Periodicidade</strong>
            <p>ANUAL</p>
          </div>
        </div>
      </div>
    </div>
  );
};
