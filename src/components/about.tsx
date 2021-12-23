
import SectionTitle from '../components/sectionTitle';
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
      <div>
        <div className={styles.sobreInfo}> O PET da Engenharia de Computação do CEFETMG, COMPET, desde 2015, quando foi aprovado tem como objetivo 
        disseminar informação técnica, construir soluções envolvendo tecnologias computacionais, organizar eventos de cunho tecnológico, estimular 
        a execução de trabalhos científicos na área, engajar os alunos da instituição nos respectivos cursos e realizar atividades sociais. 
        A estrutura organizacional interna do COMPET funciona como se fosse uma empresa. Os tutores, que coordenam o grupo, atuam como chefes. 
        Um dos COMPETianos é, por eleição, o Scrum Master que deve liderar todas equipes, que são divididas em Desenvolvimento, Administração, Eventos e Marketing. 
        Cada equipe é responsável por um conjunto de atividades da respectiva área.</div>
        <div className={styles.sobreInfo1}>
            <div className={styles.sobreInfo}>Há uma visão interdisciplinar e experiência em áreas que envolvem a tríade universitária: pesquisa, ensino e extensão. 
            As atividades extracurriculares que compõem o Programa tem como objetivo garantir aos alunos do curso oportunidades de vivenciar experiências não presentes em estruturas curriculares convencionais, 
            visando a sua formação global e favorecendo a formação acadêmica, tanto para a integração no mercado profissional como para o desenvolvimento de estudos em programas de pós-graduação.  
            A ação em grupo e a dedicação ao curso permitem desenvolver a capacidade de trabalho em equipe, facilitar a compreensão das características e dinâmicas individuais, 
            bem como a percepção da responsabilidade coletiva e do compromisso social.</div>
        </div>
      </div>
    </div>
  )
}

