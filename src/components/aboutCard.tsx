import SectionTitle from '../components/sectionTitle';
import styles from '../styles/AboutCard.module.css';

export default function CardSobre() {
  const sectionTitle = "Sobre"
  return (
    <div className={styles.sobre}>
      <SectionTitle title={sectionTitle} />
      <div className={styles.img_InterPet}>
        <div className={styles.img_container}>
          <img src="https://i.ibb.co/fGszj1d/inter-Pet-sobre.jpg" alt="" />
        </div>
      </div>
      {renderSobre()}
    </div>
  )
}

const renderSobre = () => {
  return (
    <div className={styles.aboutcard}>

      <div>
        <div className={styles.sobreInfo}>O Interpet é um evento realizado desde 2016 nos campus do CEFET-MG, com intuito de discutir e propor
          mudanças para melhoria dos grupos PET do CEFET-MG, contribuindo para intercâmbio de conhecimento entre
          os grupos, além de fomentar a formação acadêmica dos petianos. </div>
      </div>
    </div>
  )
}
