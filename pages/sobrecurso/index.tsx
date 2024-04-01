import React from "react"
import PageHeader from "../../components/PageHeader"
import { makeStyles } from "@mui/styles"
import { isMobile } from "react-device-detect"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { withStyles } from "@mui/styles"
import styles from "./Sobrecurso.module.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Link from "next/link"
import { blue } from "@mui/material/colors"

const clock = "https://i.ibb.co/QNYSh70/clock.png"
const book = "https://i.ibb.co/t87HGv3/book.png"
const people = "https://i.ibb.co/YDG6CXd/people.png"
const idea = "https://i.ibb.co/fCY9y4N/idea.png"
const engcomp = "https://i.ibb.co/VH7mnk0/8167775.png"

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
    timeline: { 
        alignContent: "justify", 
        fontFamily: "Codec Pro Regular",
        width: 1300
    },
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

    if (isMobile) {
        return (
            <>
                <title>COMPET | Sobre</title>
                <Header />
                <div className={classes.div}>
                    {renderPageHeader()}
                    <Timeline className={classes.timeline}>
                        <StylesTimelineItem style={{ marginTop: 40}}>
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
                                            A ideia do grupo surgiu durante o workshop de graduação
                                            em agosto de 2014, quando o Prof Sandro Renato Dias viu
                                            a diretora de graduação, Profa. Ivete, falar sobre o
                                            edital para a criação dos primeiros grupos PET
                                            institucionais e consolidou o projeto na mente minutos
                                            depois ao ouvir a fala do Prof. Lindolpho, tutor do PET
                                            de Leopoldina (PET do MEC).
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            O COMPET foi um parto muito difícil. Como o Sandro era
                                            recém concursado, não podia submeter um projeto para o
                                            PET, e então reclamou à diretoria de Graduação para
                                            permitir que isso fosse possível, demonstrando total
                                            interesse em submeter. Alteraram as regras e permitiram
                                            recém concursados.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            Depois foi necessário reclamar de novo, pois a
                                            experiência pregressa em extensão não poderia ser
                                            computada, já que nas regras do edital poderia ser
                                            apenas tempo de experiência dentro do CEFET-MG, Sandro
                                            recorreu novamente e foi atendido. Sou brasileiro, não
                                            desisto nunca, como disse o Sandro.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            O primeiro projeto do COMPET foi finalizado em
                                            24/10/2014, data em que ele assinou o projeto, dia do
                                            seu aniversário e ano da entrada dele no CEFET, estava
                                            com 7 meses e 27 dias de CEFET. Como o projeto foi
                                            submetido por e-mail, conforme orientação de quem
                                            atendeu ao telefone na diretoria, e sem o documento do
                                            CEFET em que ele constava como docente da instituição
                                            (sim, absurdo, teve que provar ao CEFET que era docente
                                            do CEFET), o projeto foi desclassificado.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            O resultado saiu em 04/12/2014, Sandro recorreu da
                                            decisão, mas foi indeferido. Sou brasileiro, não desisto
                                            nunca, salientou o professor. Em contato com a diretoria
                                            foi informado de um novo edital, publicado em
                                            18/12/2014, com isso resolveu reformular o projeto e
                                            submeter novamente. Foi aprovado e o resultado publicado
                                            em 11/02/2015, Computação (Sandro Dias, C2, 94,1
                                            pontos), em primeiro lugar.
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 10,
                                            }}
                                        >
                                            A partir do recurso de um docente que havia submetido um
                                            projeto também, houve a redução da própria nota e de
                                            outros, as quais foram reformuladas e divulgado um novo
                                            resultado publicado em 13/04/2015, Computação (Sandro
                                            Dias, C2, 92,7 pontos), em primeiro lugar novamente.
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
                                            O foco do grupo é disseminar informação técnica,
                                            construir soluções envolvendo tecnologias
                                            computacionais, organizar eventos de cunho tecnológico,
                                            estimular a execução de trabalhos científicos na área e
                                            projetos de extensão, engajar os alunos da instituição
                                            nos respectivos cursos e realizar atividades sociais.
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
                                        A estrutura organizacional interna do COMPET funciona como
                                        se fosse uma empresa. Os tutores, que coordenam o grupo,
                                        atuam como chefes. Um dos COMPETianos é, por eleição, o
                                        Scrum Master que deve liderar todas as equipes, que são
                                        divididas em Desenvolvimento, Administração, Eventos e
                                        Marketing. Cada equipe é responsável por um conjunto de
                                        atividades da respectiva área. Semanalmente, há a reunião do
                                        grupo, momento em que as tarefas são assinaladas, discutidas
                                        e avaliadas.
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
                                        Há, naturalmente, um passeio formal no tripé Ensino,
                                        Pesquisa e Extensão para atender demandas que nos chegam dos
                                        mais diferentes ramos do conhecimento. Dessa forma,
                                        proporciona-se uma formação extracurricular sólida aos
                                        COMPETianos que, espontaneamente, se destacam no mercado de
                                        trabalho por carregarem uma experiência rica de realizações
                                        em equipe. Durante um ano, cada bolsista ou voluntário
                                        executa mais de 100 horas de atividades.
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
            <title>COMPET | Sobre o Curso</title>
            <Header/>
            <div className={styles.body}>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <div className={classes.div}>
                    <div className={styles.pageContent}>
                        <Timeline className={classes.timeline}>
                            
                            <TimelineItem style={{ marginTop: 40}}>
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
                                        Engenharia de Computação
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={engcomp} alt="" />
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
                                            >
                                                Informações Sobre o Curso
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                A cada início de semestre, o cefet disponibiliza o
                                                calendário acadêmico, que contém informações sobre
                                                as datas de início e término das aulas, feriados,
                                                recessos, entre outros.
                                            </Typography>
                                            <Link
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    color: "#004266",
                                                    margin: 20,
                                                }}
                                                href="https://www.dirgrad.cefetmg.br/dirgrad/calendario/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Acesse os Calendários Acadêmicos Clicando Aqui.
                                            </Link>
                                            <Typography
                                                style={{
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            ></Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                Cada matéria tem um número de horas (e créditos),
                                                tendo um número máximo de faltas permitidas. Confira
                                                abaixo a tabela:
                                            </Typography>
                                            <Typography
                                                style={{
                                                    marginTop: 10,
                                                    fontFamily: "Codec Pro Regular",
                                                    textAlign: "justify",
                                                    margin: 20,
                                                }}
                                            >
                                                <table
                                                    style={{
                                                        border: "2px solid black",
                                                        borderCollapse: "collapse",
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th style={{ textAlign: "center" }}>
                                                                Horas
                                                            </th>
                                                            <th>|</th>
                                                            <th style={{ textAlign: "center" }}>
                                                                Créditos
                                                            </th>
                                                            <th>|</th>
                                                            <th style={{ textAlign: "center" }}>
                                                                Máximo de Faltas(h)
                                                            </th>
                                                            <th>|</th>
                                                            <th style={{ textAlign: "center" }}>
                                                                Máximo de Faltas(dias)
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ textAlign: "center" }}>
                                                                30
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                2
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                7,5
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                3
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "center" }}>
                                                                60
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                4
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                15
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                7
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "center" }}>
                                                                90
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                6
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                22,5
                                                            </td>
                                                            <td>|</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                11
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Da grade
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
                                            <Typography variant="h6" component="h1">Novo PPC</Typography>
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
                                                a. imagem novo PPC :<br/>
                                                <img src="https://www.eng-computacao.bh.cefetmg.br/wp-content/uploads/sites/188/2023/03/grade2023.png" style={{width: 450 }} alt="" />
                                                <Link
                                                    style={{
                                                        marginTop: 10,
                                                        fontFamily: "Codec Pro Regular",
                                                        textAlign: "justify",
                                                        color: "#004266",
                                                        margin: 20,
                                                    }}
                                                    href="https://www.eng-computacao.bh.cefetmg.br/novo-ppc/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                Clique aqui para acessar o novo PPC
                                                </Link>
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
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Secretaria
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
                                        <Typography variant="h6" component="h1">Emails da coordenação <br/></Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 20,
                                            }}
                                        >
                                            a. Coordenador: Bruno (bsantos@cefetmg.br)<br/>
                                            b. Jeferson (jeferson@cefetmg.br) <br/><br/>
                                            <Link
                                                    style={{
                                                        marginTop: 10,
                                                        fontFamily: "Codec Pro Regular",
                                                        textAlign: "justify",
                                                        color: "#004266",
                                                        margin: 20,
                                                    }}
                                                    href="https://www.decom.cefetmg.br/pessoas/professores-efetivos/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                Clique aqui para acessar a página com todos os professores do departamento
                                            </Link>
                                            
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
                                            color: "#004266",
                                            fontWeight: "bold",
                                            fontFamily: "Codec Pro Regular",
                                        }}
                                    >
                                        Normas
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <div className={styles.iconImg}>
                                        <img src={book} alt="" />
                                    </div>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">Regulamentos e Normas</Typography>
                                        <Typography
                                            style={{
                                                fontFamily: "Codec Pro Regular",
                                                textAlign: "justify",
                                                margin: 20,
                                            }}
                                        >
                                            <Link
                                                    style={{
                                                        marginTop: 10,
                                                        fontFamily: "Codec Pro Regular",
                                                        textAlign: "justify",
                                                        color: "#004266",
                                                        margin: 20,
                                                    }}
                                                    href="https://www.dirgrad.cefetmg.br/dirgrad/regulamentos-e-normas/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                a. Regulamentos: Regulamentos e Normas<br/>
                                            </Link>
                                            <Link
                                                    style={{
                                                        marginTop: 10,
                                                        fontFamily: "Codec Pro Regular",
                                                        textAlign: "justify",
                                                        color: "#004266",
                                                        margin: 20,
                                                    }}
                                                    href="https://www.dirgrad.cefetmg.br/wp-content/uploads/sites/81/2017/09/Normas_CEPE_2007_com-Res.-CEPE.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                b. Normas-Graduacao: <br/>
                                            </Link>
                                            
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
                                        Informação teste 4
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
                                            Grupos Acadêmicos de Engenharia de Computação CEFET MG (Organizado por Período)<br/>
                                                Banco de Dados (BD)<br/><br/>

                                                Princípios de Comunicação de Dados (PCD)<br/><br/>

                                                IHC<br/><br/>

                                                Inteligência Computacional<br/><br/>

                                                Programação WEB<br/><br/>

                                                OTM 2<br/><br/>

                                                TCCs<br/><br/>

                                                Metodologia de pesquisa<br/><br/>

                                                CDSD<br/><br/>

                                                Sistema Distribuídos<br/><br/>

                                                MDS<br/><br/>

                                                AEDS 2 / AOC 2<br/><br/>

                                                RI<br/><br/>

                                                AOC I/ LAOC I<br/><br/>

                                                Robótica<br/><br/>

                                                Psicologia 6M56<br/><br/>

                                                Sistemas Operacionais<br/><br/>

                                                Compiladores<br/><br/>

                                                Sinais e Sistemas Lineares<br/><br/>

                                                Redes de Computadores<br/><br/>

                                                Introdução à ADM<br/><br/>

                                                LFA<br/><br/>

                                                Introdução ao Direito<br/><br/>

                                                CSD / LCSD<br/><br/>

                                                IA<br/><br/>

                                                Algebra (Giancarlo)<br/><br/>

                                                Algebra (Jose Jozelmo)<br/><br/>

                                                Aprendizado de Máquina<br/><br/>

                                                Linux<br/><br/>

                                                LP<br/><br/>

                                                Fisica 3 (Leonardo)<br/><br/>

                                                Eng de Software<br/><br/>

                                                OTM 1<br/><br/>

                                                Gestão Ambiental (Arnaldo)<br/><br/>

                                                Contexto Social<br/><br/>

                                                Sociologia (Fabia)<br/><br/>

                                                Economia (Hermes)<br/><br/>

                                                Libras (Roberta)<br/><br/>

                                                Eletrônica<br/><br/>

                                                Estágio Supervisionado<br/><br/>

                                                Organização Empresarial<br/><br/>
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
