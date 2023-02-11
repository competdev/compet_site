import styles from "./AboutInterPet.module.css";

import SectionTitle from "../SectionTitle";

export default function AboutInterPet() {
  return (
    <div className={styles.outerWrapper}>
      <SectionTitle title="Sobre" />
      <div className={styles.sobre}>
        <img src="https://i.ibb.co/fGszj1d/inter-Pet-sobre.jpg"/>
        <div className={styles.aboutCard}>
          O Interpet é um evento realizado desde 2016 nos campus do CEFET-MG, com intuito de discutir e propor mudanças para melhoria dos grupos PET do CEFET-MG, contribuindo para intercâmbio de conhecimento entre os grupos, além de fomentar a formação acadêmica dos petianos.{" "}
        </div>
      </div>
    </div>
  );
}
