import styles from "./ExpedienteInterPet.module.css";

import SectionTitle from "../SectionTitle";

export default function ExpedienteInterPet() {
  const sectionTitle = "Expediente";
  return (
    <>
      <SectionTitle title={sectionTitle} />
      <div className={styles.sobre}>
        <div className={styles.img_InterPet}></div>
        {renderExpediente()}
      </div>
    </>
  );
}

const renderExpediente = () => {
  return (
    <div className={styles.aboutcard}>
      <div className={styles.sobreInfo}>
        <strong>CORPO EDITORIAL</strong>
        <br />
        <br />
        <strong>Editor Chefe</strong>
        <br />
        Sandro Renato Dias
        <br />
        <br />
        <strong>Editor Adjunto</strong>
        <br />
        Joana Ancila Pessoa Forte Avelino
        <br />
        <br />
        <strong>Conselho Editorial</strong>
        <br /> Hermes Augusto Oliveira Rabelo
        <br /> André Rodrigues da Cruz
        <br /> Joana Ancila Pessoa Forte Avelino
        <br /> Sandro Renato Dias
        <br /> Mayk Jonhon de Carvalho Souza
        <br />
        <br />
        <strong>DIAGRAMAÇÃO</strong>
        <br /> Joana Ancila Pessoa Forte Avelino
        <br />
      </div>
      <div className={styles.sobreInfo}>
        <p>
          <strong>Periodicidade:</strong> ANUAL
        </p>
        <p>
          <strong>Autor Corporativo: </strong> CEFET MG
        </p>
        <div style={{ fontSize: 15, color: "gray" }}>
          <p>Campus I</p>
          <p>
            Av. Amazonas, 5.253, Bairro Nova Suíça, Belo Horizonte/MG, CEP:
            30.421-169
          </p>
          <p>Tel. (31) 3319-7000</p>
        </div>
      </div>
    </div>
  );
};
