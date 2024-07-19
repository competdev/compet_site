import React, { useState } from 'react';

import Head from 'next/dist/shared/lib/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import Fade from '@mui/material/Fade';
import styles from "./materias.module.css";

import ehPreRequisitoDeNovo from "../../util/materias/utils/dbNovo/ehPreRequisitoDe.json";
import ehCorequisitoDeNovo from "../../util/materias/utils/dbNovo/ehCorequisitoDe.json";
import materiasNovo from "../../util/materias/utils/dbNovo/materiasObj.json";
import materiasPorPeriodoNovo from "../../util/materias/utils/dbNovo/materias.json";

import ehPreRequisitoDeVelho from "../../util/materias/utils/dbVelho/ehPreRequisitoDe.json";
import ehCorequisitoDeVelho from "../../util/materias/utils/dbVelho/ehCorequisitoDe.json";
import materiasVelho from "../../util/materias/utils/dbVelho/materiasObj.json";
import materiasPorPeriodoVelho from "../../util/materias/utils/dbVelho/materias.json";

import { materiasAtrasadas } from '../../util/materias/utils/global/materiasAtrasadas';
import { showmateriasDisponivelsAgora } from '../../util/materias/utils/global/showMateriasAllowedPreRequisitos';
import { Materias, Periodo } from '../../util/materias/utils/global/interfaces';
import { removeDiff } from '../../util/materias/utils/global/removeDisponiveis';

interface LocalDB {
    skipNumer: number,
    ehPreRequisitoDe: { [key: string]: string[] },
    ehCorequisitoDe: { [key: string]: string[] },
    materias: Materias[],
    materiasPorPeriodo: Periodo[]
}

const dbNovo = {
    skipNumer: 1,
    ehPreRequisitoDe: ehPreRequisitoDeNovo,
    ehCorequisitoDe: ehCorequisitoDeNovo,
    materias: materiasNovo,
    materiasPorPeriodo: materiasPorPeriodoNovo
};

const dbVelho = {
    skipNumer: 0,
    ehPreRequisitoDe: ehPreRequisitoDeVelho,
    ehCorequisitoDe: ehCorequisitoDeVelho,
    materias: materiasVelho,
    materiasPorPeriodo: materiasPorPeriodoVelho
};

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

    const [isToggled, setIsToggled] = useState(false);

    const [modo, setModo] = useState<number>(0);
    const [materiasFeitas, setMateriasFeitas] = useState<string[]>([]);
    const [materiasFeitasInput, setMateriasFeitasInput] = useState<string[]>([]);
    const [materiasTrancadas, setMateriasTrancadas] = useState<string[]>([]);
    const [materiasTrancadasInput, setMateriasTrancadasInput] = useState<string[]>([]);
    const [materiasDisponiveis, setMateriasDisponiveis] = useState<Periodo[]>([]);
    const [db, setDb] = useState<LocalDB>(dbNovo);

    const toggleButton = () => {
        setIsToggled(prevState => !prevState);
    }

    React.useEffect(() => {

        setMateriasFeitas([]);
        setMateriasFeitasInput([]);
        setMateriasTrancadas([]);
        setMateriasTrancadasInput([]);
        setMateriasDisponiveis([]);

        const selectedDb = isToggled ? dbNovo : dbVelho;
        setDb(selectedDb);
    }, [isToggled]);

    React.useEffect(() => {
        const novasMateriasDisponiveis = showmateriasDisponivelsAgora({ materias: db.materias, materiasFeitas, materiasPorPeriodo: db.materiasPorPeriodo });
        setMateriasDisponiveis(novasMateriasDisponiveis);

        const alteracao = removeDiff({
            ehCorequisitoDe: db.ehCorequisitoDe,
            ehPreRequisitoDe:
                db.ehPreRequisitoDe,
            anterior: materiasFeitas,
            atual: materiasFeitasInput
        })

        setMateriasFeitas(alteracao.materiasFeitas);

    }, [materiasFeitas, materiasFeitasInput]);

    React.useEffect(() => {

        const currInput = [...materiasTrancadasInput];

        const atrasadas = materiasAtrasadas({
            ehCorequisitoDe: db.ehCorequisitoDe,
            ehPreRequisitoDe: db.ehPreRequisitoDe,
            materias: db.materias,
            materiasATrancar: currInput,
            materiasFeitas
        });

        const novasTrancadas: string[] = [];

        atrasadas.forEach(a => {
            for (const ob of a.obrigatorias)
                novasTrancadas.push(ob);

            for (const op of a.optativas)
                novasTrancadas.push(op);
        });

        setMateriasTrancadas(novasTrancadas);

    }, [materiasTrancadasInput]);

    function opcaoSelecionada(event) {
        setModo(Number(event.target.value));
    }

    function materiaFeita(idx: number, nome: string) {
        if (materiasFeitas.includes(nome)) {
            // console.log("Materias Feitas Input: ", materiasFeitasInput);
            setMateriasFeitasInput(materiasFeitasInput.filter(materia => materia !== nome));
            // setMateriasFeitas(materiasFeitas.filter(materia => materia !== nome));
        } else {
            const novasMateriasDisponiveis = showmateriasDisponivelsAgora({ materias: db.materias, materiasFeitas, materiasPorPeriodo: db.materiasPorPeriodo });
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

                setMateriasFeitasInput(prevState => {
                    if (!prevState.includes(nome)) {
                        return [...prevState, nome];
                    }
                    return prevState;
                });
            }
        }

    }

    function materiaTrancada(nome: string) {

        if (materiasTrancadas.includes(nome) && !materiasTrancadasInput.includes(nome)) return;

        if (materiasTrancadasInput.includes(nome)) {
            setMateriasTrancadasInput(materiasTrancadasInput.filter(materia => materia !== nome));
        } else {
            setMateriasTrancadasInput([...materiasTrancadasInput, nome]);
        }

        if (materiasTrancadas.includes(nome)) {
            setMateriasTrancadas(materiasTrancadas.filter(materia => materia !== nome));
        } else {
            setMateriasTrancadas([...materiasTrancadas, nome]);
        }
    }

    function reiniciar () {
        setMateriasFeitas([]);
        setMateriasFeitasInput([]);
        setMateriasTrancadas([]);
        setMateriasTrancadasInput([]);
        setMateriasDisponiveis([]);

        setDb(isToggled ? dbNovo : dbVelho);
        setModo(0);
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
                            checked={modo === 1}
                            onChange={opcaoSelecionada}
                        />
                        Concluída
                    </label>
                    <label>
                        <input
                            type="radio" className={styles.trancou} name="etapa" value={2}
                            checked={modo === 2}
                            onChange={opcaoSelecionada}
                        />
                        Desejo trancar
                    </label>
                    <label>
                        <button className={styles.botoes} onClick={reiniciar}>
                            Reiniciar
                        </button>
                    </label>
                    <label>
                        {/* Drop-list */}
                        <select className={styles.botoes} onChange={toggleButton}>
                            <option value="Velha">Velha</option>
                            <option value="Nova">Nova</option>
                        </select>
                    </label>
                    <LightTooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 700 }}
                        title={
                            <span>
                                <strong>Concluída</strong> - matérias que já foram concluídas ou que serão/estão sendo feita<br />
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
                                            {db.materiasPorPeriodo[i].obrigatorias.map((materia, idx) => (
                                                <div key={idx} className={styles.cardMaterias}
                                                    onClick={
                                                        () => {
                                                            if (modo == 1)
                                                                materiaFeita(idx, materia)
                                                            else if (modo == 2)
                                                                materiaTrancada(materia)
                                                        }
                                                    }

                                                    style={(() => {
                                                        let style = { backgroundColor: "#929292c2" }; // default grey

                                                        if (materiasTrancadasInput.includes(materia)) {
                                                            style = { backgroundColor: "#b3060693" }; // red
                                                        } else if (materiasTrancadas.includes(materia)) {
                                                            style = { backgroundColor: "#3a1c1ca4" }; // brown
                                                        } else if (materiasFeitas.includes(materia)) {
                                                            style = { backgroundColor: "#19dd3ac7" }; // green
                                                        } else if (materiasDisponiveis[i] == undefined) {
                                                            style = { backgroundColor: "#929292c2" }; //gray
                                                        } else if (materiasDisponiveis[i].obrigatorias.includes(materia)) {
                                                            style = { backgroundColor: "white" }; //white
                                                        } else {
                                                            style = { backgroundColor: "#929292c2" }; //gray
                                                        }
                                                        return style;
                                                    })()}

                                                    onMouseOver={(e) => {
                                                        const target = e.currentTarget;
                                                        if (window.getComputedStyle(target).backgroundColor !== "rgba(146, 146, 146, 0.76)") {
                                                            target.style.borderWidth = "3px";
                                                            target.style.borderColor = modo == 1 ? "#19dd3ac7" : modo == 2 ? "#b3060693" : "#000";
                                                            target.style.transform = "scale(1.04)";
                                                            target.style.zIndex = "1";
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.borderWidth = "1px";
                                                        target.style.borderColor = 'black';
                                                        target.style.transform = "scale(1)";
                                                        target.style.zIndex = "0";
                                                    }}
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
                                if (i === db.skipNumer) continue;
                                elements.push(
                                    <div key={i} className={styles.colunaMaterias}>
                                        <div className={styles.periodoMateria}>Período {i}</div>
                                        <div>
                                            {db.materiasPorPeriodo[i].optativas.map((materia, idx) => (
                                                <div key={idx} className={styles.cardMaterias}
                                                    onClick={
                                                        () => {
                                                            if (modo == 1)
                                                                materiaFeita(idx, materia)
                                                            else if (modo == 2)
                                                                materiaTrancada(materia)
                                                        }
                                                    }

                                                    style={(() => {
                                                        let style = { backgroundColor: "#929292c2" }; // default grey

                                                        if (materiasTrancadasInput.includes(materia)) {
                                                            style = { backgroundColor: "#b3060693" }; // red
                                                        } else if (materiasTrancadas.includes(materia)) {
                                                            style = { backgroundColor: "#3a1c1ca4" }; // brown
                                                        } else if (materiasFeitas.includes(materia)) {
                                                            style = { backgroundColor: "#19dd3ac7" }; // green
                                                        } else if (materiasDisponiveis[i] == undefined) {
                                                            style = { backgroundColor: "#929292c2" }; //gray
                                                        } else if (materiasDisponiveis[i].optativas.includes(materia)) {
                                                            style = { backgroundColor: "white" }; //white
                                                        } else {
                                                            style = { backgroundColor: "#929292c2" }; //gray
                                                        }
                                                        return style;
                                                    })()}

                                                    onMouseOver={(e) => {
                                                        const target = e.currentTarget;
                                                        if (window.getComputedStyle(target).backgroundColor !== "rgba(146, 146, 146, 0.76)") {
                                                            target.style.borderWidth = "2px";
                                                            target.style.borderColor = modo == 1 ? "#19dd3ac7" : modo == 2 ? "#b3060693" : "#000";
                                                            target.style.transform = "scale(1.04)";
                                                            target.style.zIndex = "1";
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.borderWidth = "1px";
                                                        target.style.borderColor = 'black';
                                                        target.style.transform = "scale(1)";
                                                        target.style.zIndex = "0";
                                                    }}
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