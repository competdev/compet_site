import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Menu from "../components/menu";
import Book from "../assets/Book";
import Clock from "../assets/Clock";
import People from "../assets/People";
import Idea from "../assets/Idea";
import Footer from "../components/footer";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: "#A9A9A9",
  },
  title: {
    margin: 10,
  },
  body: {
    margin: 10,
  },
  timeline: { alignContent: "left" },
  icon: {
    height: 110,
    width: 110,
    borderRadius: 55,
    marginBottom: 20,
  },
  mobile: {
    height: 70,
    width: 70,
    marginBottom: 20,
    borderRadius: 35,
  },
  div: {
    background: "linear-gradient(180deg, #19dd39b8 5%, #004266c9 95%)",
    backgroundRepeat: "no-repeat",
  },
}));

const StylesTimelineItem = withStyles({
  missingOppositeContent: {
    "&:before": {
      display: "none",
    },
  },
})(TimelineItem);

export default function CustomizedTimeline() {
  const classes = useStyles();

  if (isMobile) {
    return (
      <div className={classes.div}>
        <Menu />
        <Timeline align='left' className={classes.timeline}>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <Clock className={classes.mobile} />
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ display: "flex" }}
              >
                <div>
                  <Typography
                    variant='h6'
                    component='h1'
                    className={classes.title}
                  >
                    História
                  </Typography>
                  <Typography>
                    A ideia do grupo surgiu durante o workshop de graduação em
                    agosto de 2014, quando o Prof Sandro Renato Dias viu a
                    diretora de graduação, Profa. Ivete, falar sobre o edital
                    para a criação dos primeiros grupos PET institucionais e
                    consolidou o projeto na mente minutos depois ao ouvir a fala
                    do Prof. Lindolpho, tutor do PET de Leopoldina (PET do MEC).
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    O COMPET foi um parto muito difícil. Como o Sandro era recém
                    concursado, não podia submeter um projeto para o PET, e
                    então reclamou à diretoria de Graduação para permitir que
                    isso fosse possível, demonstrando total interesse em
                    submeter. Alteraram as regras e permitiram recém
                    concursados.
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    Depois foi necessário reclamar de novo, pois a experiência
                    pregressa em extensão não poderia ser computada, já que nas
                    regras do edital poderia ser apenas tempo de experiência
                    dentro do CEFET-MG, Sandro recorreu novamente e foi
                    atendido. Sou brasileiro, não desisto nunca, como disse o
                    Sandro.
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    O primeiro projeto do COMPET foi finalizado em 24/10/2014,
                    data em que ele assinou o projeto, dia do seu aniversário e
                    ano da entrada dele no CEFET, estava com 7 meses e 27 dias
                    de CEFET. Como o projeto foi submetido por e-mail, conforme
                    orientação de quem atendeu ao telefone na diretoria, e sem o
                    documento do CEFET em que ele constava como docente da
                    instituição (sim, absurdo, teve que provar ao CEFET que era
                    docente do CEFET), o projeto foi desclassificado.
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    O resultado saiu em 04/12/2014, Sandro recorreu da decisão,
                    mas foi indeferido. Sou brasileiro, não desisto nunca,
                    salientou o professor. Em contato com a diretoria foi
                    informado de um novo edital, publicado em 18/12/2014, com
                    isso resolveu reformular o projeto e submeter novamente. Foi
                    aprovado e o resultado publicado em 11/02/2015, Computação
                    (Sandro Dias, C2, 94,1 pontos), em primeiro lugar.
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    A partir do recurso de um docente que havia submetido um
                    projeto também, houve a redução da própria nota e de outros,
                    as quais foram reformuladas e divulgado um novo resultado
                    publicado em 13/04/2015, Computação (Sandro Dias, C2, 92,7
                    pontos), em primeiro lugar novamente.
                  </Typography>
                </div>
                <Avatar
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: 0,
                    width: 70,
                    height: 70,
                  }}
                  alt='Sandro Dias'
                  src='https://i.ibb.co/vQr2VJ6/tutor-Sandro-Dias.jpg'
                />
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <Idea className={classes.mobile} />
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ display: "flex" }}
              >
                <div>
                  <Typography variant='h6' component='h1'>
                    Foco
                  </Typography>
                  <Typography>
                    O foco do grupo é disseminar informação técnica, construir
                    soluções envolvendo tecnologias computacionais, organizar
                    eventos de cunho tecnológico, estimular a execução de
                    trabalhos científicos na área e projetos de extensão,
                    engajar os alunos da instituição nos respectivos cursos e
                    realizar atividades sociais.
                  </Typography>
                </div>
                <Avatar
                  style={{
                    position: "relative",
                    marginRight: 0,
                    marginLeft: "auto",
                    width: 70,
                    height: 70,
                  }}
                  alt='Andre da Cruz'
                  src='https://i.ibb.co/Dr2JKs8/co-tutor-Andr-Rodrigues.jpg'
                />
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <People className={classes.mobile} />
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant='h6' component='h1'>
                  Estrutura Organizacional
                </Typography>
                <Typography>
                  A estrutura organizacional interna do COMPET funciona como se
                  fosse uma empresa. Os tutores, que coordenam o grupo, atuam
                  como chefes. Um dos COMPETianos é, por eleição, o Scrum Master
                  que deve liderar todas as equipes, que são divididas em
                  Desenvolvimento, Administração, Eventos e Marketing. Cada
                  equipe é responsável por um conjunto de atividades da
                  respectiva área. Semanalmente, há a reunião do grupo, momento
                  em que as tarefas são assinaladas, discutidas e avaliadas.
                </Typography>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <Book className={classes.mobile} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant='h6' component='h1'>
                  Ensino, Pesquisa e Extensão
                </Typography>
                <Typography>
                  Há, naturalmente, um passeio formal no tripé Ensino, Pesquisa
                  e Extensão para atender demandas que nos chegam dos mais
                  diferentes ramos do conhecimento. Dessa forma, proporciona-se
                  uma formação extracurricular sólida aos COMPETianos que,
                  espontaneamente, se destacam no mercado de trabalho por
                  carregarem uma experiência rica de realizações em equipe.
                  Durante um ano, cada bolsista ou voluntário executa mais de
                  100 horas de atividades.
                </Typography>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
        </Timeline>
        <Footer />
      </div>
    );
  }

  return (
    <div className={classes.div}>
      <Menu />
      <Timeline align='alternate' className={classes.timeline}>
        <TimelineItem style={{ marginTop: 40 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              História
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Clock className={classes.icon} />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              elevation={3}
              className={classes.paper}
              style={{ display: "flex" }}
            >
              <div>
                <Typography
                  variant='h6'
                  component='h1'
                  className={classes.title}
                >
                  História
                </Typography>
                <Typography>
                  A ideia do grupo surgiu durante o workshop de graduação em
                  agosto de 2014, quando o Prof Sandro Renato Dias viu a
                  diretora de graduação, Profa. Ivete, falar sobre o edital para
                  a criação dos primeiros grupos PET institucionais e consolidou
                  o projeto na mente minutos depois ao ouvir a fala do Prof.
                  Lindolpho, tutor do PET de Leopoldina (PET do MEC).
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                  O COMPET foi um parto muito difícil. Como o Sandro era recém
                  concursado, não podia submeter um projeto para o PET, e então
                  reclamou à diretoria de Graduação para permitir que isso fosse
                  possível, demonstrando total interesse em submeter. Alteraram
                  as regras e permitiram recém concursados.
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                  Depois foi necessário reclamar de novo, pois a experiência
                  pregressa em extensão não poderia ser computada, já que nas
                  regras do edital poderia ser apenas tempo de experiência
                  dentro do CEFET-MG, Sandro recorreu novamente e foi atendido.
                  Sou brasileiro, não desisto nunca, como disse o Sandro.
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                  O primeiro projeto do COMPET foi finalizado em 24/10/2014,
                  data em que ele assinou o projeto, dia do seu aniversário e
                  ano da entrada dele no CEFET, estava com 7 meses e 27 dias de
                  CEFET. Como o projeto foi submetido por e-mail, conforme
                  orientação de quem atendeu ao telefone na diretoria, e sem o
                  documento do CEFET em que ele constava como docente da
                  instituição (sim, absurdo, teve que provar ao CEFET que era
                  docente do CEFET), o projeto foi desclassificado.
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                  O resultado saiu em 04/12/2014, Sandro recorreu da decisão,
                  mas foi indeferido. Sou brasileiro, não desisto nunca,
                  salientou o professor. Em contato com a diretoria foi
                  informado de um novo edital, publicado em 18/12/2014, com isso
                  resolveu reformular o projeto e submeter novamente. Foi
                  aprovado e o resultado publicado em 11/02/2015, Computação
                  (Sandro Dias, C2, 94,1 pontos), em primeiro lugar.
                </Typography>
                <Typography style={{ marginTop: 10 }}>
                  A partir do recurso de um docente que havia submetido um
                  projeto também, houve a redução da própria nota e de outros,
                  as quais foram reformuladas e divulgado um novo resultado
                  publicado em 13/04/2015, Computação (Sandro Dias, C2, 92,7
                  pontos), em primeiro lugar novamente.
                </Typography>
              </div>
              <Avatar
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: 0,
                  width: 70,
                  height: 70,
                }}
                alt='Sandro Dias'
                src='https://i.ibb.co/vQr2VJ6/tutor-Sandro-Dias.jpg'
              />
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem style={{ marginTop: 40 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Foco
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Idea className={classes.icon} />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              elevation={3}
              className={classes.paper}
              style={{ display: "flex" }}
            >
              <Avatar
                style={{
                  position: "relative",
                  marginRight: "auto",
                  marginLeft: 0,
                  width: 70,
                  height: 70,
                }}
                alt='Andre da Cruz'
                src='https://i.ibb.co/Dr2JKs8/co-tutor-Andr-Rodrigues.jpg'
              />
              <div>
                <Typography variant='h6' component='h1'>
                  Foco
                </Typography>
                <Typography>
                  O foco do grupo é disseminar informação técnica, construir
                  soluções envolvendo tecnologias computacionais, organizar
                  eventos de cunho tecnológico, estimular a execução de
                  trabalhos científicos na área e projetos de extensão, engajar
                  os alunos da instituição nos respectivos cursos e realizar
                  atividades sociais.
                </Typography>
              </div>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem style={{ marginTop: 40 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Estrutura Organizacional
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <People className={classes.icon} />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h6' component='h1'>
                Estrutura Organizacional
              </Typography>
              <Typography>
                A estrutura organizacional interna do COMPET funciona como se
                fosse uma empresa. Os tutores, que coordenam o grupo, atuam como
                chefes. Um dos COMPETianos é, por eleição, o Scrum Master que
                deve liderar todas as equipes, que são divididas em
                Desenvolvimento, Administração, Eventos e Marketing. Cada equipe
                é responsável por um conjunto de atividades da respectiva área.
                Semanalmente, há a reunião do grupo, momento em que as tarefas
                são assinaladas, discutidas e avaliadas.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem style={{ marginTop: 40 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Ensino, Pesquisa e Extensão
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Book className={classes.icon} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h6' component='h1'>
                Ensino, Pesquisa e Extensão
              </Typography>
              <Typography>
                Há, naturalmente, um passeio formal no tripé Ensino, Pesquisa e
                Extensão para atender demandas que nos chegam dos mais
                diferentes ramos do conhecimento. Dessa forma, proporciona-se
                uma formação extracurricular sólida aos COMPETianos que,
                espontaneamente, se destacam no mercado de trabalho por
                carregarem uma experiência rica de realizações em equipe.
                Durante um ano, cada bolsista ou voluntário executa mais de 100
                horas de atividades.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Footer />
    </div>
  );
}
