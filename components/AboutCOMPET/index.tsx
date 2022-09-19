import styles from './AboutCOMPET.module.css';
import SectionTitle from '../SectionTitle';
export default function AboutCOMPET() {
  return (
    <div className={styles.sobre}>
      {renderSobre()}
    </div>
  )
}

const renderSobre = () => {
  return (
    <section id="about" className={styles.about}>
      <SectionTitle title={"Sobre nós"}/>
      <div className={styles.aboutcard}>
        <div className={styles.img_InterPet}>
          <img src="https://i.ibb.co/HFHt1Kq/0006.png" alt="" className={styles.sexo}/>
        </div>
        <article className={styles.sobreInfo}>
          <p className={styles.text}>O PET da Engenharia de Computação do CEFETMG, COMPET, tem como objetivo
          disseminar informação técnica, construir soluções envolvendo tecnologias computacionais, organizar eventos de cunho tecnológico, estimular
          a execução de trabalhos científicos na área, engajar os alunos da instituição nos respectivos cursos e realizar atividades sociais.
          </p>
          <p className={styles.aboutLink}><a href="/sobre">Saiba Mais</a></p>
        </article>
      </div>
    </section>
  )
}

