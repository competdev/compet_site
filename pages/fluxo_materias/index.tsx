import React, { useState } from 'react'

import axios from "axios";
import { NEXT_URL } from "../../util/config";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import Fade from '@mui/material/Fade';
import styles from "./materias.module.css"

Fluxo_materias.getInitialProps = async () => {
    const response = await axios.get(NEXT_URL + "/api/materias")
    return { dados: response.data }
}

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#004266",
        borderRadius: "20px",
        padding: "25px",
        color: "#fdfdfd",
        maxWidth: 500,
        fontFamily: "Verdana",
        fontSize: 15,
        textAlign: "justify",
        opacity: 0,
        pointerEvents: 'none',
        '&:hover': {
            opacity: 1,
            pointerEvents: 'auto',
        },
        '&:hover $arrow': {
            backgroundColor: "#004266",
        },
    },
    arrow: {
        fontSize: 25,
        width: 25,
        "&::before": {
            backgroundColor: "#004266",
            boxSizing: "border-box"
        }
    },
}))(Tooltip);

export default function Fluxo_materias({ dados }) {
    const periodos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const cor = ["", "#19dd3ac7", "#0042669a", "#a52727c2", "#929292c2"];

    const vetInicialTipos = dados.map(dado => {
        if (dado.prerequisitos.length) { return (4) }
        return (0)
    }
    )
    const vetInicialHabilitado = vetInicialTipos.map(dado => {
        if (dado == 4) { return ("none") }
        return ("")
    }
    )
    const [tipos, setTipos] = useState<number[]>(vetInicialTipos);
    const [habilitados, setHabilitados] = useState<string[]>(vetInicialHabilitado);
    let contador = -1;
    const [tentativa, setTentativa] = useState(0)
    const vetPrerequisitos = dados.map(
        dado => {
            return dado.prerequisitos
        }
    )
    const materias = dados.map(
        dado => {
            contador++
            return (
                {
                    pos: contador,
                    nome: dado.nome,
                    natureza: dado.natureza,
                    periodo: dado.periodo,
                    prerequisitos: vetPrerequisitos[contador],
                    tipo: tipos[contador],
                    habilitado: habilitados[contador]
                }
            )
        }
    )
    const [tipo, setTipo] = useState<number>(0)
    const [atualiza, setAtualiza] = useState<string>("a")
    React.useEffect(() => {
        setTipos(tipos)
        setHabilitados(habilitados)
    }, [habilitados, atualiza])
    function handleChange(event) {
        setTipo(event.target.value);
    }
    const [vetFeitas, setVetFeitas] = useState<String[]>([])
    const [fez, setFez] = useState<String>("a")
    React.useEffect(() => {
        materias.forEach((materia) => {
            let novosTipos = tipos
            let habilitado = "", temPrerequisito = false

            materia.prerequisitos.forEach((prerequisito) => {
                if (vetFeitas.indexOf(prerequisito) == -1) {
                    temPrerequisito = true
                }
            })
            if (temPrerequisito) {
                habilitado = "none"
                novosTipos[materia.pos] = 4
            }
            else {
                novosTipos[materia.pos] = novosTipos[materia.pos] == 1 ? 1 : novosTipos[materia.pos] == 2 ? 2 : novosTipos[materia.pos] == 3 ? 3 : 0;
            }
            setTipos(novosTipos)
            let novosHabilitados = habilitados
            novosHabilitados[materia.pos] = habilitado
            setHabilitados(novosHabilitados)
            if (atualiza == "a") {
                setAtualiza("b")
            }
            else {
                setAtualiza("a")
            }
        })
    }, [fez])

    function fezMateria(nome: string, pos: number) {

        let novasFeitas = vetFeitas
        if (tipo != 3) {
            novasFeitas.push(nome)
        }
        else {
            let index = novasFeitas.indexOf(nome)
            if (index > -1) {
                novasFeitas.splice(index, 1);
            }
        }
        setVetFeitas(novasFeitas)
        if (fez == "a") {
            setFez("b")
        }
        else {
            setFez("a")
        }
    }


    /* MATÉRIAS E OPÇÕES */
    return (
        <section className={styles.fluxoMaterias}>
            <Header />
            <div className={styles.opcoes}>
                <label className="radioButtons">
                    <input
                        type="radio" className={styles.fez} name="etapa" value={1}
                        onChange={handleChange}
                    />
                    Concluída
                </label>
                <label>
                    <input
                        type="radio" className={styles.pretende} name="etapa" value={2}
                        onChange={handleChange}
                    />
                    Farei
                </label>
                <label>
                    <input
                        type="radio" className={styles.trancou} name="etapa" value={3}
                        onChange={handleChange}
                    />
                    Desejo trancar
                </label>

                <LightTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    title={
                        <span>
                            <strong>Concluída</strong> - matérias que já foram concluídas<br />
                            <strong>Farei</strong> - matérias que serão/estão sendo feitas nesse semestre <br />
                            <strong>Desejo trancar</strong> - matérias que você deseja trancar, não fez ou não fará
                        </span>
                    }
                    placement="top"
                    arrow
                    PopperProps={{
                        modifiers: [{
                            name: 'offset',
                            options: {
                                offset: [0, -8],
                            },
                        },],
                    }}>
                    <p>i</p>
                </LightTooltip>

            </div>
            <div className={styles.divisoria} />

            <div className={styles.rolamento}>
                {/* MATÉRIAS OBRIGATÓRIAS */}
                <div className={styles.obrigatoriedade}>OBRIGATÓRIAS</div>
                {<div className={styles.materias}>
                    {periodos.map(periodo => {

                        return (
                            <div className={styles.colunaMaterias}>
                                {periodo !== periodos[0] && (
                                    <div className={styles.periodoMateria}>{periodo}º Período</div>
                                )}
                                {materias.map(materia => {
                                    if (materia.natureza == "OB" && materia.periodo === periodo) {
                                        return (
                                            <div key={materia.nome} className={styles.cardMaterias}
                                                onClick={() => {
                                                    const novosTipos = tipos
                                                    novosTipos[materia.pos] = tipo
                                                    setTipos(novosTipos)
                                                    if (tipo == 1 || 2 || 3) {
                                                        fezMateria(materia.nome, materia.pos)
                                                    }
                                                }}

                                                style={
                                                    {
                                                        backgroundColor: cor[materia.tipo],
                                                        pointerEvents: materia.habilitado
                                                    }
                                                }

                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderWidth = "3px";
                                                    e.currentTarget.style.borderColor = cor[tipo];
                                                    e.currentTarget.style.pointerEvents = materia.habilitado;

                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderWidth = "1px";
                                                    e.currentTarget.style.borderColor = 'black';
                                                    e.currentTarget.style.pointerEvents = 'auto';
                                                }}
                                            >
                                                <div className={styles.nomeMateria}>{materia.nome}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>}

                {/* <>
                        <span className={styles.tooltipContent}>
                            Indefinido
                            <LightTooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 700 }}
                                title="Matérias com período indefinido podem ser feitas em qualquer período, sem pré ou co-requisitos"
                                placement="top"
                                arrow
                            >
                                <p className={styles.tooltipIcon}>i</p>}
                            </LightTooltip>
                        </span>
                    </> */}
                {/* MATÉRIAS OPTATIVAS */}
                <div className={styles.obrigatoriedade}>OPTATIVAS</div>
                {<div className={`${styles.materias}`} style={{ marginLeft: '1em' }}>
                    {periodos.map(periodo => {
                        return (
                            <div className={styles.colunaMaterias}>

                                {periodo !== periodos[1] && (
                                    <div className={styles.periodoMateria}>
                                        {periodo === periodos[0] ? (
                                            "Indefinido"

                                        ) : (
                                            `${periodo}º Período`
                                        )}
                                    </div>
                                )}

                                {materias.map(materia => {
                                    if (materia.natureza !== "OB" && materia.periodo === periodo) {
                                        return (

                                            <div key={materia.nome} className={styles.cardMaterias}
                                                onClick={() => {
                                                    const novosTipos = tipos
                                                    novosTipos[materia.pos] = tipo
                                                    setTipos(novosTipos)
                                                    if (tipo == 1 || 2 || 3) {
                                                        fezMateria(materia.nome, materia.pos)
                                                    }
                                                }}

                                                style={
                                                    {
                                                        backgroundColor: cor[materia.tipo],
                                                        pointerEvents: materia.habilitado
                                                    }
                                                }

                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderWidth = "3px";
                                                    e.currentTarget.style.borderColor = cor[tipo];
                                                    e.currentTarget.style.pointerEvents = materia.habilitado;

                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderWidth = "1px";
                                                    e.currentTarget.style.borderColor = 'black';
                                                    e.currentTarget.style.pointerEvents = 'auto';
                                                }}
                                            >
                                                <div className={styles.nomeMateria}>{materia.nome}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>}

            </div>
            <Footer />
        </section>
    )
}