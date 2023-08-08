import Link from "next/link";
import { Project } from "../../types/types";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import axios from "axios";
import { NEXT_URL } from "../../util/config";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './projetos.module.css'
import { Box, Heading, Text } from "@codelife-ui/react";
import Image from "next/image";
Projetos.getInitialProps = async (ctx: NextPageContext) => {
  const apiUrl = NEXT_URL + `/api${ctx.pathname}`
  const response = await axios.get(apiUrl);
  const projects: Project[] = response.data
  const aboutProjects = "Os projetos do COMPET são relacionados a tríade de ensino, pesquisa e extensão e buscam desenvolver soluções por meio da tecnologia para problemas reais, impactando na comunidade em torno do CEFET-MG ou na sociedade como um todo. Com projetos em parceria com outras universidades de Minas Gerais e no mundo, o compet se destaca entre os outros PETS do CEFET-MG trazendo orgulho para a instituição e para os membros que o compõem."
  return { projects, aboutProjects }
}
export default function Projetos({ projects, aboutProjects }: { projects: Project[], aboutProjects?: String }) {
  const projetos = projects.map(project => {
    return { name: project.name, thumb: project.thumb, id: project.id }
  })
  const { pathname } = useRouter()
  return (
    <>
    <Header />
    <main style={{margin:"1rem"}}>
      <Heading size={"xl"} css={{
        marginBlockStart: '5rem',
        textAlign: 'center',
      }}>Projetos</Heading>
      <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
        <Text css={{
          marginBlock: '1rem',
          width: '100%',
          maxWidth: '800px',
        }}>{aboutProjects}</Text>
        <div className={styles.card}>
          {projetos.map(project => (
            <Link key={project.id} href={`${pathname}/${project.id}`} style={{width:'25%',display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Heading size={"lg"} as={"h3"}>{project.name}</Heading>
              <img src={project.thumb} alt={`thumbnail of ${project.name}`} className={styles.image} />
            </Link>
          ))}
        </div>
      </div>

    </main>

      <Footer />
    </>
  )
}