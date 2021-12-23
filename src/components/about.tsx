import styles from '../styles/About.module.css';

export default function CardSobre() {
  return (
    <div className={styles.sobre}>
      {renderSobre()}
    </div>
  )
}

const renderSobre = () => {
  return (
    <div className={styles.aboutcard}>
      <div className={styles.img_InterPet}>
        <img src="https://i.ibb.co/HFHt1Kq/0006.png" alt="" />
      </div>
      <div className={styles.sobreInfo}>
        <div className={styles.text}>O PET da Engenharia de Computação do CEFETMG, COMPET, tem como objetivo
          disseminar informação técnica, construir soluções envolvendo tecnologias computacionais, organizar eventos de cunho tecnológico, estimular
          a execução de trabalhos científicos na área, engajar os alunos da instituição nos respectivos cursos e realizar atividades sociais.
        </div>
      </div>
    </div>
  )
}

