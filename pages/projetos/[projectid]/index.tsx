import Link from "next/link";
import styles from "./projetos.module.css";
import axios from "axios";
import { getInternalApiBaseUrl } from "../../../util/config";
import { Project } from "../../../types/types";
import Head from "next/head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ProjectMembersGrid, ProjectTutorsGrid } from "../../../components/Projetos";
import { NextPageContext } from "next";
import {
  formatProjectDate,
  getProjectContentBlocks,
  getProjectHeroSummary,
  parseProjectDescription,
} from "../../../util/projetos/parseDescricao";

type MetaItem = {
  label: string;
  value: string;
};

function buildMetaItems(project: Project): MetaItem[] {
  const items: MetaItem[] = [];

  if (project.cidade?.trim()) {
    items.push({ label: "Cidade", value: project.cidade.trim() });
  }
  if (project.area_conhecimento?.trim()) {
    items.push({
      label: "Área do Conhecimento",
      value: project.area_conhecimento.trim(),
    });
  }
  if (project.unidade_academica?.trim()) {
    items.push({
      label: "Unidade Acadêmica",
      value: project.unidade_academica.trim(),
    });
  }

  const startDate = formatProjectDate(project.data_inicio);
  if (startDate) {
    items.push({ label: "Data de Início", value: startDate });
  }

  return items;
}

Projetos.getInitialProps = async (ctx: NextPageContext) => {
  const base = getInternalApiBaseUrl(ctx.req ?? undefined);
  const projectId = encodeURIComponent(String(ctx.query.projectid ?? ""));
  const response = await axios.get(`${base}/api/projetos/${projectId}`);

  if (response.status !== 200) {
    return { error: response.status, project: null };
  }

  return { project: response.data as Project };
};

export default function Projetos({
  project,
  error,
}: {
  project: Project | null;
  error?: string | number;
}) {
  if (error || !project) {
    return (
      <div className={styles.page}>
        <Head>
          <title>COMPET | Projeto não encontrado</title>
        </Head>
        <Header />
        <div className={styles.errorPage}>
          <p>Projeto não encontrado.</p>
          <Link href="/projetos" className={styles.backLink}>
            ← Voltar aos projetos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const parsed = parseProjectDescription(project.descricao);
  const heroSummary = getProjectHeroSummary(parsed, project.descricao);
  const contentBlocks = getProjectContentBlocks(parsed);
  const metaItems = buildMetaItems(project);
  const pageTitle = `COMPET | ${project.nome}`;

  const renderContentBlocks = () => {
    const elements: JSX.Element[] = [];
    let index = 0;

    while (index < contentBlocks.length) {
      const block = contentBlocks[index];

      if (block.type === "paragraph") {
        const paragraphs: string[] = [];
        while (
          index < contentBlocks.length &&
          contentBlocks[index].type === "paragraph"
        ) {
          const paragraphBlock = contentBlocks[index];
          if (paragraphBlock.type === "paragraph") {
            paragraphs.push(paragraphBlock.text);
          }
          index += 1;
        }

        elements.push(
          <article key={`about-${elements.length}`} className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionAccent} aria-hidden="true" />
              {parsed.ideiaGeral ? "Sobre" : "Sobre o projeto"}
            </h2>
            {paragraphs.map((text, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className={`${styles.introText} ${
                  paragraphIndex > 0 ? styles.introTextSpaced : ""
                }`}
              >
                {text}
              </p>
            ))}
          </article>
        );
        continue;
      }

      elements.push(
        <article key={block.title} className={styles.sectionBlock}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionAccent} aria-hidden="true" />
            {block.title}
          </h2>
          {block.kind === "paragraphs" ? (
            block.lines.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={`${styles.introText} ${
                  lineIndex > 0 ? styles.introTextSpaced : ""
                }`}
              >
                {line}
              </p>
            ))
          ) : block.lines.length > 1 ? (
            <ul className={styles.sectionList}>
              {block.lines.map((line, lineIndex) => (
                <li key={lineIndex} className={styles.sectionListItem}>
                  <span className={styles.sectionArrow} aria-hidden="true">
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : block.lines[0] ? (
            <p className={styles.introText}>
              <span className={styles.sectionArrow} aria-hidden="true">
                →{" "}
              </span>
              {block.lines[0]}
            </p>
          ) : null}
        </article>
      );
      index += 1;
    }

    return elements;
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />

      <section className={styles.hero} aria-label="Informações do projeto">
        <div className={styles.heroInner}>
          <Link href="/projetos" className={styles.backLink}>
            ← Todos os projetos
          </Link>

          <div className={styles.heroGrid}>
            <div className={styles.heroThumbWrap}>
              <img
                src={project.thumb}
                alt={`Logo do ${project.nome}`}
                className={styles.heroThumb}
              />
            </div>
            <div>
              <h1 className={styles.heroTitle}>{project.nome}</h1>
              {heroSummary ? (
                <p className={styles.heroSummary}>{heroSummary}</p>
              ) : null}
            </div>
          </div>

          {metaItems.length > 0 ? (
            <dl className={styles.metaList}>
              {metaItems.map((item) => (
                <div key={item.label} className={styles.metaItem}>
                  <dt>{item.label}: </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      <main className={styles.content}>
        {renderContentBlocks()}

        {contentBlocks.length === 0 && project.descricao?.trim() ? (
          <article className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionAccent} aria-hidden="true" />
              Sobre o projeto
            </h2>
            <p className={styles.introText}>{project.descricao.trim()}</p>
          </article>
        ) : null}

        {project.members?.length > 0 ? (
          <section className={styles.sectionBlock} aria-label="Membros">
            <h2 className={styles.sectionTitle}>
              <span
                className={`${styles.sectionAccent} ${styles.sectionAccentGreen}`}
                aria-hidden="true"
              />
              Membros
            </h2>
            <ProjectMembersGrid items={project.members} />
          </section>
        ) : null}

        {project.tutors?.length > 0 ? (
          <section className={styles.sectionBlock} aria-label="Coordenadores">
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionAccent} aria-hidden="true" />
              Coordenadores do projeto
            </h2>
            <ProjectTutorsGrid items={project.tutors} />
          </section>
        ) : null}

        {project.partners?.length ? (
          <section className={styles.sectionBlock} aria-label="Parceiros">
            <h2 className={styles.sectionTitle}>
              <span
                className={`${styles.sectionAccent} ${styles.sectionAccentGreen}`}
                aria-hidden="true"
              />
              Parceiros
            </h2>
            <div className={styles.partnersRow}>
              {project.partners.map((partner) => (
                <a
                  key={(partner as { id?: string; _id?: string }).id ?? (partner as { _id?: string })._id ?? partner.nome}
                  href={partner.url}
                  className={styles.partnerCard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.partnerLogoWrap}>
                    <img src={partner.imgUrl} alt={partner.nome} />
                  </div>
                  <div className={styles.partnerInfo}>
                    <span className={styles.partnerName}>{partner.nome}</span>
                    <span className={styles.partnerAction}>Visitar site →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
