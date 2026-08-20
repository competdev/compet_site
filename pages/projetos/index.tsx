import Link from "next/link";
import { Project } from "../../types/types";
import { NextPageContext } from "next";
import axios from "axios";
import { getInternalApiBaseUrl } from "../../util/config";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./projetos.module.css";
import PageTitle from "../../components/PageTitle";
import Head from "next/head";
import { getProjectCardSummary } from "../../util/projetos/parseDescricao";

const ABOUT_PROJECTS = [
  "Os projetos desenvolvidos pelo COMPET estão diretamente ligados à tríade Ensino, Pesquisa e Extensão, buscando aplicar a tecnologia para criar soluções que resolvam problemas reais, gerando impacto positivo na comunidade local do CEFET-MG e na sociedade como um todo.",
  "O COMPET realiza projetos em colaboração com outras universidades de Minas Gerais e de diferentes partes do mundo permitindo ampliação da rede acadêmica. Essa atuação diferenciada destaca o grupo entre os demais programas PET do CEFET-MG, fortalecendo a reputação da instituição e proporcionando aos membros desenvolvimento profissional.",
];

function projectYear(dateStr: string): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return String(date.getFullYear());
}

Projetos.getInitialProps = async (ctx: NextPageContext) => {
  const base = getInternalApiBaseUrl(ctx.req ?? undefined);
  const response = await axios.get(`${base}/api/projetos`);
  const projects: Project[] = response.data;
  return { projects };
};

export default function Projetos({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.pageContent}>
      <Head>
        <title>COMPET | Projetos</title>
        <meta
          name="description"
          content="Conheça os projetos de Ensino, Pesquisa e Extensão desenvolvidos pelo COMPET."
        />
      </Head>
      <Header />
      <PageTitle title="Projetos" />
      <main className={styles.projetosArea}>
        <section className={styles.introPanel} aria-label="Sobre os projetos">
          {ABOUT_PROJECTS.map((paragraph, index) => (
            <p key={index} className={styles.introText}>
              {paragraph}
            </p>
          ))}
        </section>

        <div className={styles.projectsGrid}>
          {projects.map((project) => {
            const summary = getProjectCardSummary(project.descricao);
            const year = projectYear(project.data_inicio);

            return (
              <Link
                key={project.id}
                href={`/projetos/${encodeURIComponent(project.nome)}`}
                className={styles.projectCard}
              >
                <div className={styles.cardHero}>
                  <img
                    src={project.thumb}
                    alt={`Logo do ${project.nome}`}
                    className={styles.thumb}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.projectName}>{project.nome}</h2>
                  {summary ? (
                    <p className={styles.projectDesc}>{summary}</p>
                  ) : null}
                  <div className={styles.cardFooter}>
                    {year ? (
                      <span className={styles.yearBadge}>Desde {year}</span>
                    ) : (
                      <span />
                    )}
                    <span className={styles.projectLink}>Ver projeto →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
