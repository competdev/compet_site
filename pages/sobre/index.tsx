import React from 'react';
import PageHeader from '../../components/PageHeader';
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
import { withStyles } from "@material-ui/styles";
import styles from './Sobre.module.css'

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const clock = 'https://i.ibb.co/QNYSh70/clock.png';
const book = 'https://i.ibb.co/t87HGv3/book.png';
const people = 'https://i.ibb.co/YDG6CXd/people.png';
const idea = 'https://i.ibb.co/fCY9y4N/idea.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    fontFamily: "Codec Pro Regular",
    boxShadow: '0px 0px 5px #00000033',
  },
  secondaryTail: {
    backgroundColor: "#ffffff",
  },
  title: {
    fontFamily: 'Verdana',
    margin: 10,
  },
  body: {
    margin: 10,
  },
  timeline: { alignContent: "justify", fontFamily: "Codec Pro Regular", },
  icon: {
    height: 110,
    width: 110,
    borderRadius: 55,
    marginBottom: 20,
    boxShadow: '0px 0px 5px black'
  },
  mobile: {
    height: 70,
    width: 70,
    marginBottom: 20,
    borderRadius: 35,
  },
  div: {
    background: "linear-gradient(180deg, #f5f5f5 20%, #004266 60%)",
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
      <>
      <title>COMPET | Sobre</title>
      <Header />
      <div className={classes.div}>
      {renderPageHeader()}
        <Timeline align='left' className={classes.timeline}>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <div className={styles.iconImg}><img src={clock} alt="" /></div>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ display: "flex" }}
              >
                <div>
                  <Typography variant='h6' color='textSecondary'
                    style={{
                      color: "#004266",
                      fontWeight: "bold",
                      fontFamily: "Codec Pro Regular",
                      textAlign: "center",
                      margin: 10,
                    }}>
                    Hist??ria
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    A ideia do grupo surgiu durante o workshop de gradua????o em
                    agosto de 2014, quando o Prof Sandro Renato Dias viu a
                    diretora de gradua????o, Profa. Ivete, falar sobre o edital
                    para a cria????o dos primeiros grupos PET institucionais e
                    consolidou o projeto na mente minutos depois ao ouvir a fala
                    do Prof. Lindolpho, tutor do PET de Leopoldina (PET do MEC).
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    O COMPET foi um parto muito dif??cil. Como o Sandro era rec??m
                    concursado, n??o podia submeter um projeto para o PET, e
                    ent??o reclamou ?? diretoria de Gradua????o para permitir que
                    isso fosse poss??vel, demonstrando total interesse em
                    submeter. Alteraram as regras e permitiram rec??m
                    concursados.
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    Depois foi necess??rio reclamar de novo, pois a experi??ncia
                    pregressa em extens??o n??o poderia ser computada, j?? que nas
                    regras do edital poderia ser apenas tempo de experi??ncia
                    dentro do CEFET-MG, Sandro recorreu novamente e foi
                    atendido. Sou brasileiro, n??o desisto nunca, como disse o
                    Sandro.
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    O primeiro projeto do COMPET foi finalizado em 24/10/2014,
                    data em que ele assinou o projeto, dia do seu anivers??rio e
                    ano da entrada dele no CEFET, estava com 7 meses e 27 dias
                    de CEFET. Como o projeto foi submetido por e-mail, conforme
                    orienta????o de quem atendeu ao telefone na diretoria, e sem o
                    documento do CEFET em que ele constava como docente da
                    institui????o (sim, absurdo, teve que provar ao CEFET que era
                    docente do CEFET), o projeto foi desclassificado.
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    O resultado saiu em 04/12/2014, Sandro recorreu da decis??o,
                    mas foi indeferido. Sou brasileiro, n??o desisto nunca,
                    salientou o professor. Em contato com a diretoria foi
                    informado de um novo edital, publicado em 18/12/2014, com
                    isso resolveu reformular o projeto e submeter novamente. Foi
                    aprovado e o resultado publicado em 11/02/2015, Computa????o
                    (Sandro Dias, C2, 94,1 pontos), em primeiro lugar.
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    A partir do recurso de um docente que havia submetido um
                    projeto tamb??m, houve a redu????o da pr??pria nota e de outros,
                    as quais foram reformuladas e divulgado um novo resultado
                    publicado em 13/04/2015, Computa????o (Sandro Dias, C2, 92,7
                    pontos), em primeiro lugar novamente.
                  </Typography>
                </div>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <div className={styles.iconImg}><img src={idea} alt="" /></div>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={3}
                className={classes.paper}
                style={{ display: "flex" }}
              >
                <div>
                  <Typography variant='h6' color='textSecondary'
                    style={{
                      color: "#004266",
                      fontWeight: "bold",
                      fontFamily: "Codec Pro Regular",
                      textAlign: "center",
                      margin: 10,
                    }}>
                    Foco
                  </Typography>
                  <Typography style={{
                    fontFamily: "Codec Pro Regular",
                    textAlign: "justify",
                    margin: 10,
                  }}>
                    O foco do grupo ?? disseminar informa????o t??cnica, construir
                    solu????es envolvendo tecnologias computacionais, organizar
                    eventos de cunho tecnol??gico, estimular a execu????o de
                    trabalhos cient??ficos na ??rea e projetos de extens??o,
                    engajar os alunos da institui????o nos respectivos cursos e
                    realizar atividades sociais.
                  </Typography>
                </div>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <div className={styles.iconImg}><img src={people} alt="" /></div>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant='h6' color='textSecondary'
                  style={{
                    color: "#004266",
                    fontWeight: "bold",
                    fontFamily: "Codec Pro Regular",
                    textAlign: "center",
                    margin: 10,
                  }}>
                  Estrutura Organizacional
                </Typography>
                <Typography style={{
                  fontFamily: "Codec Pro Regular",
                  textAlign: "justify",
                  margin: 10,
                }}>
                  A estrutura organizacional interna do COMPET funciona como se
                  fosse uma empresa. Os tutores, que coordenam o grupo, atuam
                  como chefes. Um dos COMPETianos ??, por elei????o, o Scrum Master
                  que deve liderar todas as equipes, que s??o divididas em
                  Desenvolvimento, Administra????o, Eventos e Marketing. Cada
                  equipe ?? respons??vel por um conjunto de atividades da
                  respectiva ??rea. Semanalmente, h?? a reuni??o do grupo, momento
                  em que as tarefas s??o assinaladas, discutidas e avaliadas.
                </Typography>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
          <StylesTimelineItem style={{ marginTop: 40 }}>
            <TimelineSeparator>
              <div className={styles.iconImg}><img src={book} alt="" /></div>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant='h6' color='textSecondary'
                  style={{
                    color: "#004266",
                    fontWeight: "bold",
                    fontFamily: "Codec Pro Regular",
                    textAlign: "center",
                    margin: 10,
                  }}>
                  Ensino, Pesquisa e Extens??o
                </Typography>
                <Typography style={{
                  fontFamily: "Codec Pro Regular",
                  textAlign: "justify",
                  margin: 10,
                }}>
                  H??, naturalmente, um passeio formal no trip?? Ensino, Pesquisa
                  e Extens??o para atender demandas que nos chegam dos mais
                  diferentes ramos do conhecimento. Dessa forma, proporciona-se
                  uma forma????o extracurricular s??lida aos COMPETianos que,
                  espontaneamente, se destacam no mercado de trabalho por
                  carregarem uma experi??ncia rica de realiza????es em equipe.
                  Durante um ano, cada bolsista ou volunt??rio executa mais de
                  100 horas de atividades.
                </Typography>
              </Paper>
            </TimelineContent>
          </StylesTimelineItem>
        </Timeline>
        <Footer />
      </div >
      </>
    );
  }

  return (
    <>
    <title>COMPET | Sobre</title>
    <Header />
    <div className={styles.body}>
    {renderPageHeader()}
      <div className={classes.div}>
        <div className={styles.pageContent}>
          <Timeline align='alternate' className={classes.timeline}>
            <TimelineItem style={{ marginTop: 40 }}>
              <TimelineOppositeContent>
                <Typography variant='h6' color='textSecondary'
                  style={{
                    color: "#004266",
                    fontWeight: "bold",
                    fontFamily: "Codec Pro Regular",
                  }}>
                  Hist??ria
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <div className={styles.iconImg}><img src={clock} alt="" /></div>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  className={classes.paper}
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <Typography
                      variant='h6'
                      component='h1'
                      className={classes.title}
                    >
                    </Typography>
                    <Typography style={{
                      marginTop: 10,
                      fontFamily: "Codec Pro Regular",
                      textAlign: "justify",
                      margin: 20
                    }}>
                      A ideia do grupo surgiu durante o workshop de gradua????o em
                      agosto de 2014, quando o Prof Sandro Renato Dias viu a
                      diretora de gradua????o, Profa. Ivete, falar sobre o edital para
                      a cria????o dos primeiros grupos PET institucionais e consolidou
                      o projeto na mente minutos depois ao ouvir a fala do Prof.
                      Lindolpho, tutor do PET de Leopoldina (PET do MEC).
                    </Typography>
                    <Typography style={{ marginTop: 10, fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                      O COMPET foi um parto muito dif??cil. Como o Sandro era rec??m
                      concursado, n??o podia submeter um projeto para o PET, e ent??o
                      reclamou ?? diretoria de Gradua????o para permitir que isso fosse
                      poss??vel, demonstrando total interesse em submeter. Alteraram
                      as regras e permitiram rec??m concursados.
                    </Typography>
                    <Typography style={{ marginTop: 10, fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                      Depois foi necess??rio reclamar de novo, pois a experi??ncia
                      pregressa em extens??o n??o poderia ser computada, j?? que nas
                      regras do edital poderia ser apenas tempo de experi??ncia
                      dentro do CEFET-MG, Sandro recorreu novamente e foi atendido.
                      Sou brasileiro, n??o desisto nunca, como disse o Sandro.
                    </Typography>
                    <Typography style={{ marginTop: 10, fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                      O primeiro projeto do COMPET foi finalizado em 24/10/2014,
                      data em que ele assinou o projeto, dia do seu anivers??rio e
                      ano da entrada dele no CEFET, estava com 7 meses e 27 dias de
                      CEFET. Como o projeto foi submetido por e-mail, conforme
                      orienta????o de quem atendeu ao telefone na diretoria, e sem o
                      documento do CEFET em que ele constava como docente da
                      institui????o (sim, absurdo, teve que provar ao CEFET que era
                      docente do CEFET), o projeto foi desclassificado.
                    </Typography>
                    <Typography style={{ marginTop: 10, fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                      O resultado saiu em 04/12/2014, Sandro recorreu da decis??o,
                      mas foi indeferido. Sou brasileiro, n??o desisto nunca,
                      salientou o professor. Em contato com a diretoria foi
                      informado de um novo edital, publicado em 18/12/2014, com isso
                      resolveu reformular o projeto e submeter novamente. Foi
                      aprovado e o resultado publicado em 11/02/2015, Computa????o
                      (Sandro Dias, C2, 94,1 pontos), em primeiro lugar.
                    </Typography>
                    <Typography style={{ marginTop: 10, fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                      A partir do recurso de um docente que havia submetido um
                      projeto tamb??m, houve a redu????o da pr??pria nota e de outros,
                      as quais foram reformuladas e divulgado um novo resultado
                      publicado em 13/04/2015, Computa????o (Sandro Dias, C2, 92,7
                      pontos), em primeiro lugar novamente.
                    </Typography>
                  </div>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem style={{ marginTop: 40 }}>
              <TimelineOppositeContent>
                <Typography variant='h6' color='textSecondary' style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontFamily: "Codec Pro Regular",
                }} >
                  Foco
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <div className={styles.iconImg}><img src={clock} alt="" /></div>
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
                    </Typography>
                    <Typography style={{ fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20, marginRight: 30, marginTop: 20, marginBottom: 20 }}>
                      O foco do grupo ?? disseminar informa????o t??cnica, construir
                      solu????es envolvendo tecnologias computacionais, organizar
                      eventos de cunho tecnol??gico, estimular a execu????o de
                      trabalhos cient??ficos na ??rea e projetos de extens??o, engajar
                      os alunos da institui????o nos respectivos cursos e realizar
                      atividades sociais.
                    </Typography>
                  </div>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem style={{ marginTop: 40 }}>
              <TimelineOppositeContent>
                <Typography variant='h6' color='textSecondary' style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontFamily: "Codec Pro Regular",
                }}>
                  Estrutura Organizacional
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <div className={styles.iconImg}><img src={people} alt="" /></div>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant='h6' component='h1'>

                  </Typography>
                  <Typography style={{ fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                    A estrutura organizacional interna do COMPET funciona como se
                    fosse uma empresa. Os tutores, que coordenam o grupo, atuam como
                    chefes. Um dos COMPETianos ??, por elei????o, o Scrum Master que
                    deve liderar todas as equipes, que s??o divididas em
                    Desenvolvimento, Administra????o, Eventos e Marketing. Cada equipe
                    ?? respons??vel por um conjunto de atividades da respectiva ??rea.
                    Semanalmente, h?? a reuni??o do grupo, momento em que as tarefas
                    s??o assinaladas, discutidas e avaliadas.
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem style={{ marginTop: 40 }}>
              <TimelineOppositeContent>
                <Typography variant='h6' color='textSecondary' style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontFamily: "Codec Pro Regular",
                }}>
                  Ensino, Pesquisa e Extens??o
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <div className={styles.iconImg}><img src={book} alt="" /></div>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant='h6' component='h1'>

                  </Typography>
                  <Typography style={{ fontFamily: "Codec Pro Regular", textAlign: "justify", margin: 20 }}>
                    H??, naturalmente, um passeio formal no trip?? Ensino, Pesquisa e
                    Extens??o para atender demandas que nos chegam dos mais
                    diferentes ramos do conhecimento. Dessa forma, proporciona-se
                    uma forma????o extracurricular s??lida aos COMPETianos que,
                    espontaneamente, se destacam no mercado de trabalho por
                    carregarem uma experi??ncia rica de realiza????es em equipe.
                    Durante um ano, cada bolsista ou volunt??rio executa mais de 100
                    horas de atividades.
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <Footer />
        </div >
      </div>
    </div>
    </>
  );
}

const renderPageHeader = () => {
  const header_img_url = "https://i.ibb.co/3dyKHJ3/sobre.png"
  return (
    <PageHeader url={header_img_url} caption={false} />
  )
}
