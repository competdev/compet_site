import React from 'react';
import PageHeader from '../../components/PageHeader';
import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import styles from './Sobre.module.css'

import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const clock = "https://i.ibb.co/QNYSh70/clock.png"
const book = "https://i.ibb.co/t87HGv3/book.png"
const people = "https://i.ibb.co/YDG6CXd/people.png"
const idea = "https://i.ibb.co/fCY9y4N/idea.png"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "6px 16px",
        backgroundColor: "#ffffff",
        borderRadius: "25px",
        fontFamily: "Codec Pro Regular",
        boxShadow: "0px 0px 5px #00000033",
    },
    secondaryTail: {
        backgroundColor: "#ffffff",
    },
    title: {
        fontFamily: "Verdana",
        margin: 10,
    },
    body: {
        margin: 10,
    },
    timeline: { alignContent: "justify", fontFamily: "Codec Pro Regular" },
    icon: {
        height: 110,
        width: 110,
        borderRadius: 55,
        marginBottom: 20,
        boxShadow: "0px 0px 5px black",
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
}))

const StylesTimelineItem = withStyles({
    missingOppositeContent: {
        "&:before": {
            display: "none",
        },
    },
})(TimelineItem)

export default function CustomizedTimeline() {
    const classes = useStyles()

    const [mobile, setMobile] = React.useState(null)

    React.useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (mobile === null) return null


    if (mobile) {
        return (
            <>
                <Head>
                    <title>COMPET | Sobre</title>
                </Head>
                <Header />
                <div className={classes.div}>
                    {renderPageHeader()}
                    <Timeline className={classes.timeline}>
                        <StylesTimelineItem style={{ marginTop: 40 }}>
                            <TimelineSeparator>
                                <div className={styles.iconImg}>
                                    <img src={clock} alt="" />
                                </div>
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
                                            variant="h6"
                                            color="textSecondary"
                                            style={{
                                                color: "#004266",
                                                fontWeight: "bold",
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "center",
                                                margin: 10,
                                            }}
                                        >
                                            História
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            A ideia de criação do grupo surgiu durante o workshop de graduação realizado em agosto
de 2014. Na ocasião, o professor Sandro Renato Dias assistiu à apresentação da diretora
de Graduação, professora Ivete, sobre o edital que instituiu os primeiros grupos PET do
CEFET-MG. Minutos depois, ao ouvir a fala do professor Lindolpho, tutor do PET de
Leopoldina (PET do MEC), o projeto começou a ser concebido.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            A implementação do COMPET enfrentou diversos desafios. Como o professor Sandro havia
ingressado recentemente na instituição, não estava autorizado a submeter projetos ao PET.
Ele apresentou uma solicitação à Diretoria de Graduação, demonstrando interesse e
necessidade de revisão das regras. Após análise, a diretoria alterou o regulamento e
passou a permitir a participação de docentes recém concursados.
Em seguida surgiu uma nova dificuldade, pois nas regras do edital eram computados
apenas o tempo de experiência no CEFET-MG e experiências prévias não eram válidas.
Devido a isso, o professor recorreu novamente e foi atendido, relatando: "Sou brasileiro, não
desisto nunca".
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            Em 24/10/2014, o primeiro projeto do COMPET foi finalizado. A data marca não apenas o
dia da assinatura do projeto, como também a data do aniversário do professor. Além disso,
nesse momento, o docente completava 7 meses e 27 dias de CEFET. A submissão foi
realizada, entretanto, o projeto foi desclassificado devido a fatores externos.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                           Diante da publicação de um novo edital, o professor Sandro reformulou o projeto e o
submeteu novamente.
O resultado foi oficialmente publicado em 13 de abril de 2015:
Computação (Sandro Dias, C2) obteve 92,7 pontos, alcançando o primeiro lugar.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            Assim, teve início o COMPET.
                                        </Typography>
                                       
                                    </div>
                                </Paper>
                            </TimelineContent>
                        </StylesTimelineItem>
                        <StylesTimelineItem style={{ marginTop: 40 }}>
                            <TimelineSeparator>
                                <div className={styles.iconImg}>
                                    <img src={idea} alt="" />
                                </div>
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
                                            variant="h6"
                                            color="textSecondary"
                                            style={{
                                                color: "#004266",
                                                fontWeight: "bold",
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "center",
                                                margin: 10,
                                            }}
                                        >
                                            Foco
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            O foco do grupo é disseminar informação técnica, construir soluções envolvendo
tecnologias computacionais, organizar eventos de cunho tecnológico, estimular a execução
de trabalhos científicos na área e projetos de extensão, além de engajar os alunos da
instituição nos respectivos cursos e realizar atividades sociais.
                                        </Typography>
                                    </div>
                                </Paper>
                            </TimelineContent>
                        </StylesTimelineItem>
                        <StylesTimelineItem style={{ marginTop: 40 }}>
                            <TimelineSeparator>
                                <div className={styles.iconImg}>
                                    <img src={people} alt="" />
                                </div>
                                <TimelineConnector className={classes.secondaryTail} />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "center",
                                            margin: 10,
                                        }}
                                    >
                                        Estrutura Organizacional
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "justify",
                                            margin: 10,
                                        }}
                                    >
                                        A estrutura organizacional interna do COMPET é inspirada no modelo de funcionamento de
uma empresa. Os tutores atuam como coordenadores gerais, responsáveis pelo
direcionamento estratégico do grupo. Entre os membros, é eleito um Scrum Master, figura
central da metodologia Scrum, que tem como função facilitar o trabalho das equipes,
remover obstáculos e garantir que os processos ocorram conforme os princípios da
metodologia ágil. No COMPET, esse modelo é utilizado para estruturar o desenvolvimento
das atividades, dar clareza às responsabilidades e favorecer a colaboração entre os
membros.
                                    </Typography>

                                    <Typography
                                        style={{
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "justify",
                                            margin: 10,
                                        }}
>
                                As atividades do grupo são divididas entre quatro equipes: Desenvolvimento,
    Administração, Eventos e Marketing. Cada equipe é responsável por um conjunto específico
    de ações relacionadas à sua área de atuação.
                                    </Typography>

                                    <Typography
                                        style={{
                                             fontFamily: "Codec Pro Regular",
                                             textAlign: "justify",
                                             margin: 10,
                                        }}
>       
    Semanalmente, realiza-se uma reunião geral, na qual são discutidas as demandas em
    andamento, planejadas as próximas tarefas e avaliados os resultados obtidos.
                                </Typography>

                                </Paper>
                            </TimelineContent>
                        </StylesTimelineItem>
                        <StylesTimelineItem style={{ marginTop: 40 }}>
                            <TimelineSeparator>
                                <div className={styles.iconImg}>
                                    <img src={book} alt="" />
                                </div>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "center",
                                            margin: 10,
                                        }}
                                    >
                                        Ensino, Pesquisa e Extensão
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "justify",
                                            margin: 10,
                                        }}
                                    >
                                        Há, naturalmente, uma atuação estruturada no tripé Ensino, Pesquisa e Extensão, o que
permite ao COMPET atender demandas provenientes de diferentes áreas do conhecimento.
Como resultado, os COMPETianos destacam-se no mercado de trabalho, demonstrando
experiência consistente em projetos colaborativos e em atividades de alto nível de
responsabilidade.
                                    </Typography>

                                    <Typography
                                         style={{
                                             fontFamily: "Codec Pro Regular",
                                             textAlign: "justify",
                                            margin: 10,
                                         }}
>
    Ao longo de um ano de participação, cada bolsista ou voluntário dedica mais de 100 horas a
    atividades do programa, envolvendo-se em ações de planejamento, execução e avaliação
    que contribuem diretamente para o seu desenvolvimento acadêmico e profissional.
                                    </Typography>                            
                                </Paper>
                            </TimelineContent>
                        </StylesTimelineItem>
                    </Timeline>
                    <Footer />
                </div>
            </>
        )
    }

    return (
        <>
            <title>COMPET | Sobre</title>
            <Header />
            <div className={styles.body}>
                {renderPageHeader()}
                <div className={classes.div}>
                    <div className={styles.pageContent}>
                        <Timeline className={classes.timeline}>
                            <TimelineItem style={{ marginTop: 40 }}>
                                <TimelineOppositeContent>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        História
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={clock} alt="" />
                                    </div>
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
                                                variant="h6"
                                                component="h1"
                                                className={classes.title}
                                            ></Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                               A ideia de criação do grupo surgiu durante o workshop de graduação realizado em agosto
de 2014. Na ocasião, o professor Sandro Renato Dias assistiu à apresentação da diretora
de Graduação, professora Ivete, sobre o edital que instituiu os primeiros grupos PET do
CEFET-MG. Minutos depois, ao ouvir a fala do professor Lindolpho, tutor do PET de
Leopoldina (PET do MEC), o projeto começou a ser concebido.
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                               A implementação do COMPET enfrentou diversos desafios. Como o professor Sandro havia
ingressado recentemente na instituição, não estava autorizado a submeter projetos ao PET.
Ele apresentou uma solicitação à Diretoria de Graduação, demonstrando interesse e
necessidade de revisão das regras. Após análise, a diretoria alterou o regulamento e
passou a permitir a participação de docentes recém concursados.
Em seguida surgiu uma nova dificuldade, pois nas regras do edital eram computados
apenas o tempo de experiência no CEFET-MG e experiências prévias não eram válidas.
Devido a isso, o professor recorreu novamente e foi atendido, relatando: "Sou brasileiro, não
desisto nunca".
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                Em 24/10/2014, o primeiro projeto do COMPET foi finalizado. A data marca não apenas o
dia da assinatura do projeto, como também a data do aniversário do professor. Além disso,
nesse momento, o docente completava 7 meses e 27 dias de CEFET. A submissão foi
realizada, entretanto, o projeto foi desclassificado devido a fatores externos.
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                Diante da publicação de um novo edital, o professor Sandro reformulou o projeto e o
submeteu novamente.
O resultado foi oficialmente publicado em 13 de abril de 2015:
Computação (Sandro Dias, C2) obteve 92,7 pontos, alcançando o primeiro lugar.
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                Assim, teve início o COMPET.
                                            </Typography>
                                        </div>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem style={{ marginTop: 40 }}>
                                <TimelineOppositeContent>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Foco
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={clock} alt="" />
                                    </div>
                                    <TimelineConnector className={classes.secondaryTail} />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper
                                        elevation={3}
                                        className={classes.paper}
                                        style={{ display: "flex" }}
                                    >
                                        <div>
                                            <Typography variant="h6" component="h1"></Typography>
                                            <Typography
                                                style={{
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                    marginRight: 30,
                                                    marginTop: 20,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                O foco do grupo é disseminar informação técnica, construir soluções envolvendo
tecnologias computacionais, organizar eventos de cunho tecnológico, estimular a execução
de trabalhos científicos na área e projetos de extensão, além de engajar os alunos da
instituição nos respectivos cursos e realizar atividades sociais.
                                            </Typography>
                                        </div>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem style={{ marginTop: 40 }}>
                                <TimelineOppositeContent>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Estrutura Organizacional
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={people} alt="" />
                                    </div>
                                    <TimelineConnector className={classes.secondaryTail} />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1"></Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 20,
                                            }}
                                        >
                                            A estrutura organizacional interna do COMPET é inspirada no modelo de funcionamento de
                                            uma empresa. Os tutores atuam como coordenadores gerais, responsáveis pelo
                                            direcionamento estratégico do grupo. Entre os membros, é eleito um Scrum Master, figura
                                            central da metodologia Scrum, que tem como função facilitar o trabalho das equipes,
                                            remover obstáculos e garantir que os processos ocorram conforme os princípios da
                                            metodologia ágil. No COMPET, esse modelo é utilizado para estruturar o desenvolvimento
                                            das atividades, dar clareza às responsabilidades e favorecer a colaboração entre os
                                            membros.
                                       </Typography>
                                            <Typography
                                                style={{
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                As atividades do grupo são divididas entre quatro equipes: Desenvolvimento,
                                                Administração, Eventos e Marketing. Cada equipe é responsável por um conjunto específico
                                                de ações relacionadas à sua área de atuação.
                                            </Typography>

                                            <Typography
                                                style={{
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                Semanalmente, realiza-se uma reunião geral, na qual são discutidas as demandas em
                                                andamento, planejadas as próximas tarefas e avaliados os resultados obtidos.
                                            </Typography>
                                            
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem style={{ marginTop: 40 }}>
                                <TimelineOppositeContent>
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        style={{
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Ensino, Pesquisa e Extensão
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={book} alt="" />
                                    </div>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1"></Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 20,
                                            }}
                                        >
                                           Há, naturalmente, uma atuação estruturada no tripé Ensino, Pesquisa e Extensão, o que
permite ao COMPET atender demandas provenientes de diferentes áreas do conhecimento.
Como resultado, os COMPETianos destacam-se no mercado de trabalho, demonstrando
experiência consistente em projetos colaborativos e em atividades de alto nível de
responsabilidade.
                                        </Typography>
                                     <Typography
                                        style={{
                                            fontFamily: "Codec Pro Regular",
                                            textAlign: "justify",
                                            margin: 20,
                                        }}
                                    >
                                        Ao longo de um ano de participação, cada bolsista ou voluntário dedica mais de 100 horas a
                                        atividades do programa, envolvendo-se em ações de planejamento, execução e avaliação
                                        que contribuem diretamente para o seu desenvolvimento acadêmico e profissional.
                                    </Typography>

                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

const renderPageHeader = () => {
    const header_img_url = "https://i.ibb.co/3dyKHJ3/sobre.png"
    return (
        <PageHeader
            url={header_img_url}
            caption={false}
            sortType={undefined}
            handleSelect={undefined}
        />
    )
}

