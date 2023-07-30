import styles from './projetos.module.css'
import axios from 'axios'
import { NEXT_URL } from "../../util/config";
import { Project } from '../../types/types';
import Head from 'next/dist/shared/lib/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
Projetos.getInitialProps = async () => {
  const response = await axios.get(NEXT_URL + "/api/projetos");
  const projects :Project[] = response.data
  return {projects}
}
export default function Projetos ({projects}:{projects:Project[]}){
  return(
    
    <>
      <Head>
        <title>COMPET | Projetos</title>
      </Head>
      <div style={{marginBlock:'5rem'}}>
        <Header/>
      </div>

      <main className={styles.main}>
        {
          projects.map((projeto)=>(
            <div key={`project-${projeto.id}`} className={styles.project}>
              <h2>{projeto.name}</h2>
              <img src={projeto.thumb} alt={`thumbnail of ${projeto.name}`} className={styles.thumb}/>
              <h3>Sobre o projeto</h3>
              <div className={styles.descriptionContainer}>
              <p style={{marginBlock:'1rem' , fontSize:'.8rem', fontWeight:700}}>
                Projeto criado em:
                <time dateTime={projeto.start_date}> {new Date(projeto.start_date).toLocaleDateString("pt-BR")}</time>
              </p>
              {projeto.description.split('.').map((sentence,index)=>index!==projeto.description.split('.').length-1&&(
                <p key={sentence.split(' ')[0]}>{sentence}.</p>
              ))}
              </div>
              <h3>Membros</h3>
              <div className={styles.membersContainer}>
                {projeto.members.map((member)=>(
                  <div id={member.id} key={`member-${member.id}`}className={styles.member}>
                    <div className={styles.memberHeader}>
                    <img src={member.urlImg} alt={`image of ${member.name}`} />
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p>{member.role}</p>
                    </div>
                  <p className={styles.memberStatement}>{member.statement}</p>
                  <div className={styles.memberFooter}>

                  <a className={styles.icon} href={`mailto:${member.email}`} about={`send email to ${member.name}`}><MailIcon/></a>
                  <a className={styles.icon} href={member.github}><GithubIcon/></a>
                  <a className={styles.icon} href={member.linkedin}><LinkedinIcon/></a>
                  </div>
                  </div>
                ))}
              </div>
              <h3>Coordenadores do projeto</h3>
              {projeto.tutors.map((tutor)=>(
                <div id={tutor.id} key={`member-${tutor.id}`}>
                <h3>{tutor.name}</h3>
                <a href={`mailto:${tutor.email}`} about={`send email to ${tutor.name}`}>email</a>
                <img src={tutor.urlImg} alt={`image of ${tutor.name}`}/>
                <a href={tutor.linkedin}>Linkedin</a>
                </div>
              ))}
            </div>
          ))
        }
      </main>
      <Footer/>
    </>
  )
}