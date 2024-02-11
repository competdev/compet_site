import styles from './projetos.module.css'
import axios from 'axios'
import { NEXT_URL } from "../../../util/config";
import { Project } from '../../../types/types';
import Head from 'next/dist/shared/lib/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { MemberCarousel, TutorCarousel } from '../../../components/Projetos';
import { Box, Button, Card, Heading, Text, darkTheme } from "@codelife-ui/react"
import { NextPageContext } from 'next';
import Image from 'next/image';
Projetos.getInitialProps = async (ctx: NextPageContext) => {
  const apiUrl = NEXT_URL + `/api/projetos/${ctx.query.projectid}`
  const response = await axios.get(apiUrl);
  if (response.status !== 200) return { error: response.status, project: null }
  const project: Project = response.data
  return { project }
}
export default function Projetos({ project, error }: { project: Project, error?: string | number }) {
  if (error) return (<h1>{error}</h1>)
  return (

    <>
      <Head>
        <title>COMPET | Projetos</title>
      </Head>
      <div style={{ marginBlock: '5rem' }}>
        <Header />
      </div>

      <main className={styles.main}>

        <section key={`project-${project.id}`} className={styles.project}>
          <Heading size={"2xl"} css={{ textAlign: "center" }}>{project.nome} </Heading>
          <img src={project.thumb} alt={`thumbnail of ${project.nome}`} className={styles.thumb} />
          <Text size={"sm"} css={{ textAlign: "center" }}>
            Projeto criado em:
            <time dateTime={project.data_inicio}> {new Date(project.data_inicio).toLocaleDateString("pt-BR")}</time>
          </Text>
          <Heading as={"h3"} size={"xl"} css={{ textAlign: "center" }}>Sobre o projeto</Heading>
          <section id='about-project' className={styles.descriptionContainer}>
            {project?.descricao?.split('.')?.map((sentence, index) => index !== project.descricao?.split('.')?.length - 1 && (
              <Text key={sentence.split(' ')[0]} size={"lg"}>{sentence}.</Text>
            ))}
          </section>
          {project.members?.length > 0 ? (
            <>
              <Heading as={"h3"} size={'lg'} css={{ textAlign: "center" }}>Membros</Heading>
              <div className={`${styles.membersContainer} ${darkTheme}`}>
                {<MemberCarousel items={project.members} />}
              </div>
            </>
          ) : null}
          <Heading as={"h3"} size={'lg'} css={{ textAlign: "center" }}>Coordenadores do projeto</Heading>
          <Box elevation={'0'} css={{
            alignSelf: "center",
            position: "relative",
            width: "100%",
            maxWidth: '800px'
          }} className={`${styles.tutorsContainer}`}>
            {<TutorCarousel items={project.tutors} />}
            <Image src="https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png" alt="compet-logo" style={{
              position: "absolute",
              bottom: "1rem",
              right: "3rem",
              filter: "grayscale(1)"
            }}
              width={80}
              height={40}
            />

          </Box>
        </section>
        {project.partners &&
          (
            <section className={`${styles.main}`} >
              <Heading as={"h3"} size={"xl"} css={{ textAlign: "center" }}>Parceiros</Heading>
              <div style={{ display: 'flex', gap: "1rem", marginBlock: "2rem", flexWrap: 'wrap' }}>
                {
                  project.partners.map((partner, index) => (

                    <Card.Root css={{
                      backgroundColor: `$codelife-${index % 2 == 0 ? index % 4 == 0 ? "tertiary" : "secondary" : "primary"}-300`
                    }}>
                      <Card.Header css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={styles.partnerIcon}>
                          <img src={partner.imgUrl} alt={`image of ${partner.nome}`} />
                        </div>
                        <Heading sr-only>{partner.nome}</Heading>
                      </Card.Header>
                      <Button
                        as={'a'}
                        about={partner.nome}
                        href={partner.url}
                        variant={index % 2 == 0 ? index % 4 == 0 ? "primary" : "secondary" : "tertiary"}
                      >
                        Conhecer
                      </Button>
                    </Card.Root>
                  ))
                }
              </div>
            </section>
          )}
      </main>
      <Footer />
    </>
  )
}