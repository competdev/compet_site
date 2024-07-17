import React, { useState } from 'react';

import axios from "axios";
import { NEXT_URL } from "../../util/config";

import Head from 'next/dist/shared/lib/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import Fade from '@mui/material/Fade';
import styles from "./materias.module.css";

import ehPreRequisitoDe from "./utils/dbNovo/ehPreRequisitoDe.json";
import ehCorequisitoDe from "./utils/dbNovo/ehCorequisitoDe.json";
import materias from "./utils/dbNovo/materiasObj.json";
import materiasPorPeriodo from "./utils/dbNovo/materias.json";

import { materiasAtrasadas } from './utils/global/materiasAtrasadas';
import { showmateriasDisponivelsAgora } from './utils/global/showMateriasAllowedPreRequisitos';
import { Periodo } from './utils/global/interfaces';

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

export default function Fluxo_materias() {
    const periodos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const cor = ["", "#19dd3ac7", "#0042669a", "#a52727c2", "#929292c2"];
    const [modo, setModo] = useState<number>(0);
    const [materiasFeitas, setMateriasFeitas] = useState<string[]>([]);
    const [materiasTrancadas, setMateriasTrancadas] = useState<string[]>([]);
    const [materiasTrancadasInput, setMateriasTrancadasInput] = useState<string[]>([]);
    const [materiasDisponiveis, setMateriasDisponiveis] = useState<Periodo[]>([]);

    React.useEffect(() => {
        const novasMateriasDisponiveis = showmateriasDisponivelsAgora({ materias, materiasFeitas, materiasPorPeriodo });
        setMateriasDisponiveis(novasMateriasDisponiveis);
    }, [materiasFeitas, materiasTrancadas]);

    React.useEffect(() => {

        const currInput = [...materiasTrancadasInput];

        const atrasadas = materiasAtrasadas({
            ehCorequisitoDe,
            ehPreRequisitoDe,
            materias,
            materiasATrancar: currInput,
            materiasFeitas
        });

        const novasTrancadas: string [] = [];

        atrasadas.forEach(a => {
            for(const ob of a.obrigatorias)
                novasTrancadas.push(ob);

            for(const op of a.optativas)
                novasTrancadas.push(op);
        });

        setMateriasTrancadas(novasTrancadas);
        
    }, [materiasTrancadasInput]);

    function opcaoSelecionada(event) {
        setModo(Number(event.target.value));
    }

    function materiaFeita(idx: number, nome: string) {
        if  (materiasFeitas.includes(nome)) {
            setMateriasFeitas(materiasFeitas.filter(materia => materia !== nome));
        } else {
            const novasMateriasDisponiveis = showmateriasDisponivelsAgora({ materias, materiasFeitas, materiasPorPeriodo });
            setMateriasDisponiveis(novasMateriasDisponiveis);
            
            const isDisponivel = novasMateriasDisponiveis.find(periodo => {
                return periodo.obrigatorias.includes(nome) || periodo.optativas.includes(nome);
            });

            if (isDisponivel) {
                setMateriasFeitas(prevState => {
                    if (!prevState.includes(nome)) {
                        return [...prevState, nome];
                    }
                    return prevState;
                });
            }
        }
            
    }

    function materiaTrancada(nome: string) {
        
        if(materiasTrancadas.includes(nome) && !materiasTrancadasInput.includes(nome)) return; 

        if(materiasTrancadasInput.includes(nome)) {
            setMateriasTrancadasInput(materiasTrancadasInput.filter(materia => materia !== nome));
        } else {
            setMateriasTrancadasInput([...materiasTrancadasInput, nome]);
        }

        if(materiasTrancadas.includes(nome)) {
            setMateriasTrancadas(materiasTrancadas.filter(materia => materia !== nome));
        } else {
            setMateriasTrancadas([...materiasTrancadas, nome]);
        }
    }
    

    return (
        <>
            <Head>
                <title>COMPET | Fluxo Matérias</title>
            </Head>
            <section className={styles.fluxoMaterias}>
                <Header />
                <div className={styles.opcoes}>
                    <label className="radioButtons">
                        <input
                            type="radio" className={styles.fez} name="etapa" value={1}
                            onChange={opcaoSelecionada}
                        />
                        Concluída
                    </label>
                    <label>
                        <input
                            type="radio" className={styles.trancou} name="etapa" value={2}
                            onChange={opcaoSelecionada}
                        />
                        Desejo trancar
                    </label>
                    <label>
                        <button onClick={() => window.location.reload()}>
                            Reiniciar
                        </button>
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
                    <div className={styles.materias}>
                        {(() => {
                            const elements = [];
                            for (let i = 1; i <= 10; i++) {
                                elements.push(
                                    <div key={i} className={styles.colunaMaterias}>
                                        <div className={styles.periodoMateria}>Período {i}</div>
                                        <div>
                                            {materiasPorPeriodo[i].obrigatorias.map((materia, idx) => (
                                                <div key={idx} className={styles.cardMaterias}
                                                    onClick={
                                                        () => {
                                                            if (modo == 1)
                                                                materiaFeita(idx, materia)
                                                            else if(modo == 2)
                                                                materiaTrancada(materia)
                                                        }
                                                    }

                                                    style={(() => {
                                                        let style = { backgroundColor: "#929292c2" }; // default grey
                                                        
                                                        if(materiasTrancadasInput.includes(materia)) {
                                                            style = { backgroundColor: "purple" }; // red
                                                        } else if (materiasTrancadas.includes(materia)) {
                                                            style = { backgroundColor: "#a52727c2" }; // red
                                                        } else if (materiasFeitas.includes(materia)) {
                                                            style = { backgroundColor: "#19dd3ac7" }; // red
                                                        } else if(materiasDisponiveis[i] == undefined) {
                                                            style = { backgroundColor: "#929292c2" };
                                                        } else if(materiasDisponiveis[i].obrigatorias.includes(materia)) {
                                                            style = { backgroundColor: "white" };
                                                        } else {
                                                            style = { backgroundColor: "#929292c2" };
                                                        }

                                                        return style;
                                                    })()}
                                                >
                                                    {materia}</div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return elements;
                        })()}
                    </div>

                    {/* MATÉRIAS OPTATIVAS */}
                    <div className={styles.obrigatoriedade}>OPTATIVAS</div>
                    <div className={styles.materias}>
                        {(() => {
                            const elements = [];
                            for (let i = 0; i <= 10; i++) {
                                if (i === 1) continue;
                                elements.push(
                                    <div key={i} className={styles.colunaMaterias}>
                                        <div className={styles.periodoMateria}>Período {i}</div>
                                        <div>
                                            {materiasPorPeriodo[i].optativas.map((materia, idx) => (
                                                <div key={idx} className={styles.cardMaterias}
                                                    onClick={
                                                        () => {
                                                            if (modo == 1)
                                                                materiaFeita(idx, materia)
                                                            else if(modo == 2)
                                                                materiaTrancada(materia)
                                                        }
                                                    }

                                                    style={(() => {
                                                        let style = { backgroundColor: "#929292c2" }; // default grey
                                                        
                                                        if(materiasTrancadasInput.includes(materia)) {
                                                            style = { backgroundColor: "purple" }; // red
                                                        } else if (materiasTrancadas.includes(materia)) {
                                                            style = { backgroundColor: "#a52727c2" }; // red
                                                        } else if (materiasFeitas.includes(materia)) {
                                                            style = { backgroundColor: "#19dd3ac7" }; // red
                                                        } else if(materiasDisponiveis[i] == undefined) {
                                                            style = { backgroundColor: "#929292c2" };
                                                        } else if(materiasDisponiveis[i].optativas.includes(materia)) {
                                                            style = { backgroundColor: "white" };
                                                        } else {
                                                            style = { backgroundColor: "#929292c2" };
                                                        }

                                                        return style;
                                                    })()}
                                                >
                                                    {materia}</div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return elements;
                        })()}
                    </div>
                    

                </div>
                <Footer />
            </section>
        </>
    )
}
