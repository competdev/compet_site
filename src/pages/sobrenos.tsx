import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { History } from "@material-ui/icons";
import { Avatar, Icon } from "@material-ui/core";
import Menu from "../components/menu";

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
  timeline: {
    height: "120%",
    position: "absolute",
    left: 0,
    top: 80,
    width: "100%",
    overflow: "hidden",
    background: "linear-gradient(180deg, #19dd39b8 5%, #004266c9 95%)",
  },
  imageIcon: {
    display: "flex",
    height: "inherit",
    width: "inherit",
  },
  iconRoot: {
    textAlign: "center",
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <>
      <Menu />
      <Timeline align='alternate' className={classes.timeline}>
        <TimelineItem style={{ marginTop: 20 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              História
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color='primary' style={{ padding: 10 }}>
              <Icon classes={{ root: classes.iconRoot }}>
                <img className={classes.imageIcon} src='../assets/Clock.svg' />
              </Icon>
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h6' component='h1' className={classes.title}>
                História
              </Typography>
              <Avatar
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: 0,
                  top: -50,
                  width: 70,
                  height: 70,
                }}
                alt='Sandro Dias'
                src='https://i.ibb.co/vQr2VJ6/tutor-Sandro-Dias.jpg'
              />
              <Typography className={classes.body}>
                A ideia do grupo surgiu durante o workshop de graduação em
                agosto de 2014, quando o Prof Sandro Renato Dias viu a diretora
                de graduação, Profa. Ivete, falar sobre o edital para a criação
                dos primeiros grupos PET institucionais e consolidou o projeto
                na mente minutos depois ao ouvir a fala do Prof. Lindolpho,
                tutor do PET de Leopoldina (PET do MEC). Bom, o COMPET foi um
                parto muito difícil. Como o Sandro era recém concursado, não
                podia submeter um projeto para o PET, e então reclamou à
                diretoria de Graduação para permitir que isso fosse possível,
                demonstrando total interesse em submeter. Alteraram as regras e
                permitiram recém concursados. Depois foi necessário reclamar de
                novo, pois a experiência pregressa em extensão não poderia ser
                computada, já que nas regras do edital poderia ser apenas tempo
                de experiência dentro do CEFET-MG, Sandro recorreu novamente e
                foi atendido. Sou brasileiro, não desisto nunca, como disse o
                Sandro. O primeiro projeto do COMPET foi finalizado em
                24/10/2014, data em que ele assinou o projeto, dia do seu
                aniversário e ano da entrada dele no CEFET, estava com 7 meses e
                27 dias de CEFET. Como o projeto foi submetido por e-mail,
                conforme orientação de quem atendeu ao telefone na diretoria, e
                sem o documento do CEFET em que ele constava como docente da
                instituição (sim, absurdo, teve que provar ao CEFET que era
                docente do CEFET), o projeto foi desclassificado. O resultado
                saiu em 04/12/2014, Sandro recorreu da decisão, mas foi
                indeferido. Sou brasileiro, não desisto nunca, salientou o
                professor. Em contato com a diretoria foi informado de um novo
                edital, publicado em 18/12/2014, com isso resolveu reformular o
                projeto e submeter novamente. Foi aprovado e o resultado
                publicado em 11/02/2015, o resultado tinha a relação dos
                seguintes aprovados: Computação (Sandro Dias, C2, 94,1 pontos),
                Automação Kleber Fontoura, Araxá, 76,5 pontos), Minas (Maurício
                Carneiro, Araxá, 63,8 pontos), Materiais (Ivan Santana, C1, 58,2
                pontos), Materiais (Paulo Paiva, C1, 58,1 pontos), Transportes
                (Augusto Bezerra, C1, 33,8 pontos). A partir de recurso do Prof.
                Ivan (que resultou na redução da própria nota e de outros),
                foram reformuladas as notas e novo resultado foi publicado em
                13/04/2015, Computação (Sandro Dias, C2, 92,7 pontos), Automação
                Kleber Fontoura, Araxá, 75,3 pontos), Minas (Maurício Carneiro,
                Araxá, 66,0 pontos), Materiais (Paulo Paiva, C1, 50,1 pontos),
                Materiais (Ivan Santana, C1, 45,7 pontos), Transportes (Augusto
                Bezerra, C1, 38,58 pontos).{" "}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem style={{ marginTop: 20 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Foco
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color='primary' style={{ padding: 10 }}>
              <Icon classes={{ root: classes.iconRoot }}>
                <img className={classes.imageIcon} src='../assets/Idea.svg' />
              </Icon>
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h6' component='h1'>
                Foco
              </Typography>
              <Avatar
                style={{
                  position: "relative",
                  marginLeft: 0,
                  marginRight: "auto",
                  top: -30,
                  width: 70,
                  height: 70,
                }}
                alt='Andre da Cruz'
                src='https://i.ibb.co/Dr2JKs8/co-tutor-Andr-Rodrigues.jpg'
              />
              <Typography>
                O foco do grupo é disseminar informação técnica, construir
                soluções envolvendo tecnologias computacionais, organizar
                eventos de cunho tecnológico, estimular a execução de trabalhos
                científicos na área e projetos de extensão, engajar os alunos da
                instituição nos respectivos cursos e realizar atividades
                sociais.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem style={{ marginTop: 20 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Estrutura Organizacional
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color='primary' style={{ padding: 10 }}>
              <Icon classes={{ root: classes.iconRoot }}>
                <img className={classes.imageIcon} src='../assets/People.svg' />
              </Icon>
            </TimelineDot>
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
        <TimelineItem style={{ marginTop: 20 }}>
          <TimelineOppositeContent>
            <Typography variant='h6' color='textSecondary'>
              Ensino, Pesquisa e Extensão
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color='primary' style={{ padding: 10 }}>
              <Icon classes={{ root: classes.iconRoot }}>
                <img className={classes.imageIcon} src='../assets/Book.svg' />
              </Icon>
            </TimelineDot>
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
    </>
  );
}
