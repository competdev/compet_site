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
import Head from 'next/head';
import Image from "next/image";
Projetos.getInitialProps = async (ctx: NextPageContext) => {
  const apiUrl = NEXT_URL + `/api/${ctx.pathname}`
  const response = await axios.get(apiUrl);
  const projects: Project[] = response.data
  const aboutProjects = ["Os projetos desenvolvidos pelo COMPET estão diretamente ligados à tríade Ensino, Pesquisa e Extensão, buscando aplicar a tecnologia para criar soluções que resolvam problemas reais, gerando impacto positivo na comunidade local do CEFET-MG e  na sociedade como um todo.",
                          "O COMPET realiza projetos em colaboração com outras universidades de Minas Gerais e de diferentes partes do mundo permitindo ampliação da rede acadêmica. Essa atuação diferenciada destaca o grupo entre os demais programas PET do CEFET-MG, fortalecendo a reputação da instituição e proporcionando aos membros desenvolvimento profissional."
                        ];
  return { projects, aboutProjects}
}
export default function Projetos({ projects, aboutProjects }: { projects: Project[], aboutProjects?: string[] }) {
  const projetos = projects.map(project => {
    return { name: project.nome, thumb: project.thumb, id: project.id }
  })
  const { pathname } = useRouter()
  return (
    <>
      <Head>
        <title>COMPET | Projetos</title>
      </Head>
      <Header />
      <main className={styles.projetosContainer} style={{ margin: "1rem" }}>
      <Heading
        size={"xl"}
        css={{ marginBlockStart: '1rem', textAlign: 'center',fontFamily: '"Codec Pro Regular", sans-serif' }}>
        Projetos
      </Heading>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
          <div
            style={{marginBlock: '1rem', width: '100%', maxWidth: '800px'}}>
            {aboutProjects?.map((p, i) => (
              <Text key={i} css={{ marginBottom: '1rem', fontFamily: '"Codec Pro Regular", sans-serif' }}>
              {p}
              </Text>
            ))}
          </div>
          <div className={styles.card}>
            {projetos.map(project => (
              <Link
              key={project.id}
              href={`${pathname}/${project.name}`}
              className={styles.projectItem}
            >
               <Heading size={"lg"} as={"h3"}
                  css={{ fontFamily: '"Codec Pro Regular", sans-serif'}}>
                  {project.name}
                </Heading>
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