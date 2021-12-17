import SectionTitle from '../components/sectionTitle';
import styles from '../styles/AboutCard.module.css';
import Link from 'next/link';

export default function CardSobre() {
  return (
    <div className={styles.sobre}>
    
      <SectionTitle title={sectionTitle} />
      
      {renderSobre()}

    </div>
    
    
  )
}

const sectionTitle = "Sobre"

const renderSobre = () => {
  
  
  return (

    <div className={styles.aboutcard}> 
      
      <div className={styles.card1}>
        
        <img className={styles.img_InterPet} src="https://i.ibb.co/HtsHtyK/Pessoal-do-interpet-cortada01.jpg" alt="" />
        
        <p className={styles.sobre1}> A Diretoria de Graduação (DIRGRAD) realiza o InterPET por meio da Coordenação de Fomento, com o apoio e 
          participação dos PETs Administração (BH), Engenharia Ambiental (BH), Engenharia de Computação (BH), 
          Engenharia de Materiais (BH), ConecTTE (BH), Engenharia de Controle e Automação (Leopoldina), 
          Engenharia Civil (Curvelo), Engenharia Mecatrônica (Divinópolis), Engenharia de Minas (Araxá), 
          Engenharia de Automação Industrial (Araxá) e Engenharia Elétrica (Nepomuceno).</p> 

        <p className={styles.sobre2}> O Interpet é um evento realizado desde 2016 nos campus do CEFET-MG, com intuito de discutir e propor 
          mudanças para melhoria dos grupos PET do CEFET-MG, contribuindo para intercâmbio de conhecimento entre 
          os grupos, além de fomentar a formação acadêmica dos petianos. Este tem como objetivo principal a troca 
          de experiências, por meio de reflexões e discussões acerca do desenvolvimento do Programa, bem como da 
          importância da articulação no âmbito da tríade ensino, pesquisa e extensão. O InterPET pode ser entendido 
          como um encontro entre os grupos PETs do CEFETMG, em que tem o intuito de reunir alunos, professores, 
          tutores, petianos e toda a comunidade cefetiana.</p>
      </div>
      
    </div> 
  )

}
