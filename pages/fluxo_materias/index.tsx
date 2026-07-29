import React, { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import axios from "axios"
import type { NextPageContext } from "next"
import { getInternalApiBaseUrl } from "../../util/config"

import Head from 'next/dist/shared/lib/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Tooltip } from '@mui/material';
import type { TooltipProps } from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InfoOutlined } from '@mui/icons-material';
import Fade from '@mui/material/Fade';
import styles from "./materias.module.css";


import { listarMateriasTrancadasCascata } from '../../util/materias/utils/global/materiasAtrasadas';
import { listarTodosDependentesPreRequisito } from '../../util/materias/utils/global/findMateriasDependentes';
import { showmateriasDisponivelsAgora } from '../../util/materias/utils/global/showMateriasAllowedPreRequisitos';
import { Materias, Periodo } from '../../util/materias/utils/global/interfaces';
import { removeDiff } from '../../util/materias/utils/global/removeDisponiveis';
import { buildFluxoMateriasDb } from '../../util/materias/utils/global/buildFluxoMateriasDb';
import { filtrarMateriasPorGrade, normalizeMateria, parseCarga } from '../../util/materias/utils/global/normalizeMateria';
import {
    estaBloqueadaPorDependenciaTrancada,
    isCorequisitoMutuo,
    obterCorequisitosMutuos,
    podeMarcarConcluida,
    podeMarcarTrancar,
} from '../../util/materias/utils/global/materiaFluxoRules';
import { normalizeNome } from '../../util/materias/utils/global/normalizeNome';
import { formatarRotuloProfessores } from '../../util/materias/utils/global/separarOptativas';

type NomesMarcados = Record<string, true>;

function listaNomes(marcados: NomesMarcados): string[] {
    return Object.keys(marcados);
}

Fluxo_materias.getInitialProps = async (ctx: NextPageContext) => {
    const base = getInternalApiBaseUrl(ctx.req ?? undefined)
    const res = await axios.get(`${base}/api/materias`);
    const todas = res.data.map(normalizeMateria);

    const dbNovo = buildFluxoMateriasDb(filtrarMateriasPorGrade(todas, "nova"));
    const dbVelho = buildFluxoMateriasDb(filtrarMateriasPorGrade(todas, "velha"));

    return {
        materiasNovo: dbNovo.materias,
        materiasPorPeriodoNovo: dbNovo.materiasPorPeriodo,
        optativasOfertadasNovo: dbNovo.optativasOfertadas,
        optativasNaoOfertadasNovo: dbNovo.optativasNaoOfertadas,
        materiasVelho: dbVelho.materias,
        materiasPorPeriodoVelho: dbVelho.materiasPorPeriodo,
        optativasOfertadasVelho: dbVelho.optativasOfertadas,
        optativasNaoOfertadasVelho: dbVelho.optativasNaoOfertadas,
    }
}

interface LocalDB {
    skipNumer: number,
    materias: Materias[],
    materiasPorPeriodo: Periodo[],
    optativasOfertadas: Materias[],
    optativasNaoOfertadas: Materias[],
}

const tooltipAzulSlotProps: TooltipProps["slotProps"] = {
    tooltip: {
        sx: {
            bgcolor: "#004266",
            borderRadius: "20px",
            padding: "20px 22px",
            color: "#fdfdfd",
            maxWidth: 420,
            maxHeight: "min(70vh, 28rem)",
            overflowY: "auto",
            fontFamily: "Verdana, sans-serif",
            fontSize: 15,
            textAlign: "justify",
            boxSizing: "border-box",
        },
    },
    arrow: {
        sx: {
            color: "#004266",
            fontSize: 25,
            width: 25,
            "&::before": {
                backgroundColor: "#004266",
                boxSizing: "border-box",
            },
        },
    },
};

const tooltipPopperProps: NonNullable<TooltipProps["PopperProps"]> = {
    style: { zIndex: 10000 },
    modifiers: [
        {
            name: "flip",
            enabled: true,
            options: {
                padding: 12,
                fallbackPlacements: ["bottom", "right", "left", "top"],
            },
        },
        {
            name: "preventOverflow",
            enabled: true,
            options: {
                boundary: "viewport",
                padding: 12,
                altAxis: true,
                tether: false,
            },
        },
    ],
};

function formatCargaHoraria(carga: number | undefined): string {
    return `${carga ?? 0}h`
}

export default function Fluxo_materias(props) {

    const {
        materiasNovo,
        materiasPorPeriodoNovo,
        optativasOfertadasNovo = [],
        optativasNaoOfertadasNovo = [],
        materiasVelho,
        materiasPorPeriodoVelho,
        optativasOfertadasVelho = [],
        optativasNaoOfertadasVelho = [],
    } = props;

    const [dbs, setDbs] = useState<{
        novo: LocalDB
        velho: LocalDB
    }>(() => ({
        novo: {
            skipNumer: 1,
            materias: materiasNovo,
            materiasPorPeriodo: materiasPorPeriodoNovo,
            optativasOfertadas: optativasOfertadasNovo,
            optativasNaoOfertadas: optativasNaoOfertadasNovo,
        },
        velho: {
            skipNumer: 0,
            materias: materiasVelho,
            materiasPorPeriodo: materiasPorPeriodoVelho,
            optativasOfertadas: optativasOfertadasVelho,
            optativasNaoOfertadas: optativasNaoOfertadasVelho,
        },
    }));

    const [isToggled, setIsToggled] = useState(true);

    const [layoutFluxo, setLayoutFluxo] = useState<"horizontal" | "vertical">("horizontal");
    const [modo, setModo] = useState<0 | 1 | 2>(0);
    /** Só entra aqui com clique explícito em "Concluída" (nunca por corequisito). */
    const [materiasFeitas, setMateriasFeitas] = useState<NomesMarcados>({});
    const [materiasTrancar, setMateriasTrancar] = useState<NomesMarcados>({});
    const [tooltipInfoAberto, setTooltipInfoAberto] = useState<string | null>(null);
    const [tooltipAjudaAberto, setTooltipAjudaAberto] = useState(false);
    const [periodoFlash, setPeriodoFlash] = useState<string | null>(null);

    const toqueSemHover = useMediaQuery("(hover: none), (pointer: coarse)");
    const periodoFlashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const db = isToggled ? dbs.novo : dbs.velho;

    const materiasTrancarRef = React.useRef(materiasTrancar);
    materiasTrancarRef.current = materiasTrancar;

    React.useEffect(() => {
        let cancelado = false

        axios
            .get("/api/materias")
            .then((res) => {
                if (cancelado) return
                const todas = res.data.map(normalizeMateria)
                setDbs({
                    novo: {
                        skipNumer: 1,
                        ...buildFluxoMateriasDb(
                            filtrarMateriasPorGrade(todas, "nova")
                        ),
                    },
                    velho: {
                        skipNumer: 0,
                        ...buildFluxoMateriasDb(
                            filtrarMateriasPorGrade(todas, "velha")
                        ),
                    },
                })
            })
            .catch(() => {})

        return () => {
            cancelado = true
        }
    }, [])

    React.useEffect(() => {
        return () => {
            if (periodoFlashRef.current) {
                clearTimeout(periodoFlashRef.current);
            }
        };
    }, []);

    const gradeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsToggled(e.target.value === "Nova");
    }

    React.useEffect(() => {
        setMateriasFeitas({});
        setMateriasTrancar({});
    }, [isToggled]);

    function nomesTrancadosCanonicos(trancar: NomesMarcados): string[] {
        return listaNomes(trancar)
            .map((chave) => {
                const materia = db.materias.find(
                    (m) => normalizeNome(m.nome) === normalizeNome(chave)
                );
                return materia?.nome ?? null;
            })
            .filter((nome): nome is string => nome != null);
    }

    const nomesTrancar = useMemo(
        () => nomesTrancadosCanonicos(materiasTrancar),
        [materiasTrancar, db.materias]
    );
    const nomesFeitas = useMemo(() => listaNomes(materiasFeitas), [materiasFeitas]);

    const materiasTrancadasCascata = useMemo(
        () => listarMateriasTrancadasCascata(nomesTrancar, db.materias),
        [nomesTrancar, db.materias]
    );

    const materiasDisponiveis = useMemo(() => {
        // Concluídas continuam valendo mesmo com coreq trancado (ex.: AEDs feita, Lab trancado).
        const feitasEfetivas = nomesFeitas
        return showmateriasDisponivelsAgora({
            materias: db.materias,
            materiasFeitas: feitasEfetivas,
            materiasPorPeriodo: db.materiasPorPeriodo,
            materiasTrancadas: nomesTrancar,
        })
    }, [nomesFeitas, nomesTrancar, db.materias, db.materiasPorPeriodo])

    const listaMateriasDisponiveis = useMemo(() => {
        const nomes: string[] = [];
        for (const periodo of materiasDisponiveis) {
            nomes.push(...periodo.obrigatorias, ...periodo.optativas);
        }
        return nomes;
    }, [materiasDisponiveis]);

    const materiasPorNome = useMemo(() => {
        const map = new Map<string, Materias>()
        for (const materia of db.materias) {
            map.set(normalizeNome(materia.nome), materia)
        }
        return map
    }, [db.materias])

    const horasIntegralizadas = useMemo(() => {
        let obrigatorias = 0
        let optativas = 0
        for (const chave of nomesFeitas) {
            const materia = materiasPorNome.get(normalizeNome(chave))
            if (!materia) continue
            const carga = parseCarga(materia.carga)
            if (materia.natureza === "OB") {
                obrigatorias += carga
            } else {
                optativas += carga
            }
        }
        return {
            obrigatorias,
            optativas,
            total: obrigatorias + optativas,
        }
    }, [nomesFeitas, materiasPorNome])

    const isTrancar = (nome: string) => Boolean(materiasTrancar[normalizeNome(nome)]);
    const isFeita = (nome: string) => Boolean(materiasFeitas[normalizeNome(nome)]);

    function opcaoSelecionada(event: React.ChangeEvent<HTMLInputElement>) {
        setModo(Number(event.target.value) as 0 | 1 | 2);
    }

    function flattenMateriasDisponiveis(feitas: string[], trancar: string[]): string[] {
        const disp = showmateriasDisponivelsAgora({
            materias: db.materias,
            materiasFeitas: feitas,
            materiasPorPeriodo: db.materiasPorPeriodo,
            materiasTrancadas: trancar,
        })
        const nomesDisp: string[] = []
        for (const periodo of disp) {
            nomesDisp.push(...periodo.obrigatorias, ...periodo.optativas)
        }
        return nomesDisp
    }

    function isMateriaDisponivel(
        nome: string,
        feitas: string[],
        trancar: string[] = nomesTrancar
    ): boolean {
        return flattenMateriasDisponiveis(feitas, trancar).some(
            (m) => normalizeNome(m) === normalizeNome(nome)
        )
    }

    function calcularCascataTrancados(
        trancar: NomesMarcados,
        ignorarChaves?: Set<string>
    ): string[] {
        const nomes = nomesTrancadosCanonicos(trancar).filter(
            (n) => !ignorarChaves?.has(normalizeNome(n))
        );
        return listarMateriasTrancadasCascata(nomes, db.materias);
    }

    function aplicarMarcarTrancar(
        nome: string,
        prevFeitas: NomesMarcados,
        prevTrancar: NomesMarcados,
        marcar: boolean,
        ignorarCascataDe?: Set<string>
    ): { feitas: NomesMarcados; trancar: NomesMarcados } {
        const chave = normalizeNome(nome);
        const corequisitosMutuos = obterCorequisitosMutuos(db.materias, nome);
        const nextTrancar = { ...prevTrancar };
        const nextFeitas = { ...prevFeitas };
        const cascataAtual = calcularCascataTrancados(prevTrancar, ignorarCascataDe);

        if (!marcar) {
            delete nextTrancar[chave];
            for (const co of corequisitosMutuos) {
                const coChave = normalizeNome(co);
                if (!prevFeitas[coChave]) {
                    delete nextTrancar[coChave];
                }
            }
            return { feitas: nextFeitas, trancar: nextTrancar };
        }

        if (estaBloqueadaPorDependenciaTrancada(nome, cascataAtual)) {
            return { feitas: nextFeitas, trancar: nextTrancar };
        }

        const dependentesPre = listarTodosDependentesPreRequisito(db.materias, nome);

        nextTrancar[chave] = true;

        for (const co of corequisitosMutuos) {
            const coChave = normalizeNome(co);
            if (prevFeitas[coChave]) continue;
            if (estaBloqueadaPorDependenciaTrancada(co, cascataAtual)) continue;
            nextTrancar[coChave] = true;
        }

        for (const dependente of dependentesPre) {
            delete nextTrancar[normalizeNome(dependente)];
        }

        if (prevFeitas[chave]) {
            delete nextFeitas[chave];
        }

        for (const dependente of dependentesPre) {
            const depChave = normalizeNome(dependente);
            if (prevFeitas[depChave]) {
                delete nextFeitas[depChave];
            }
        }

        return { feitas: nextFeitas, trancar: nextTrancar };
    }

    function materiasDaSecao(
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ): string[] {
        return db.materiasPorPeriodo[periodoIdx]?.[lista] ?? [];
    }

    function togglePeriodoConcluido(
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ) {
        const nomes = materiasDaSecao(periodoIdx, lista);
        if (nomes.length === 0) return;

        const feitasNoPeriodo = nomes.filter((nome) => isFeita(nome));

        if (feitasNoPeriodo.length > 0) {
            const feitasList = listaNomes(materiasFeitas);
            const chavesRemover = new Set(
                feitasNoPeriodo.map((n) => normalizeNome(n))
            );
            const atual = feitasList.filter(
                (n) => !chavesRemover.has(normalizeNome(n))
            );
            const { materiasFeitas: proximo } = removeDiff({
                materias: db.materias,
                anterior: feitasList,
                atual,
            });
            setMateriasFeitas(
                proximo.reduce<NomesMarcados>((acc, n) => {
                    acc[normalizeNome(n)] = true;
                    return acc;
                }, {})
            );
            return;
        }

        let nextFeitas = { ...materiasFeitas };
        let nextTrancar = { ...materiasTrancarRef.current };

        let houveMudanca = true;
        while (houveMudanca) {
            houveMudanca = false;
            for (const nome of nomes) {
                const chave = normalizeNome(nome);
                if (nextFeitas[chave]) continue;

                const feitasList = listaNomes(nextFeitas);
                const trancarList = nomesTrancadosCanonicos(nextTrancar);
                const cascata = listarMateriasTrancadasCascata(trancarList, db.materias);
                const listaDisp = flattenMateriasDisponiveis(feitasList, trancarList);
                const disponivel = listaDisp.some(
                    (m) => normalizeNome(m) === normalizeNome(nome)
                );

                if (
                    !podeMarcarConcluida(
                        nome,
                        db.materias,
                        feitasList,
                        cascata,
                        trancarList,
                        disponivel,
                        listaDisp
                    )
                ) {
                    continue;
                }

                delete nextTrancar[chave];
                nextFeitas[chave] = true;
                houveMudanca = true;
            }
        }

        setMateriasTrancar(nextTrancar);
        setMateriasFeitas(nextFeitas);
    }

    function togglePeriodoTrancar(
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ) {
        const nomes = materiasDaSecao(periodoIdx, lista);
        if (nomes.length === 0) return;

        const chavesPeriodo = new Set(nomes.map((n) => normalizeNome(n)));
        const trancadasNoPeriodo = nomes.filter((nome) => isTrancar(nome));

        let nextFeitas = { ...materiasFeitas };
        let nextTrancar = { ...materiasTrancarRef.current };

        for (const nome of nomes) {
            const cascataExterna = calcularCascataTrancados(nextTrancar, chavesPeriodo);
            const trancarList = listaNomes(nextTrancar);

            const marcar = trancadasNoPeriodo.length === 0;
            const estavaTrancada = Boolean(nextTrancar[normalizeNome(nome)]);

            if (marcar) {
                if (estavaTrancada) continue;
                if (estaBloqueadaPorDependenciaTrancada(nome, cascataExterna)) {
                    continue;
                }
                if (!podeMarcarTrancar(nome, cascataExterna, trancarList)) continue;
            } else {
                if (!estavaTrancada) continue;
            }

            const resultado = aplicarMarcarTrancar(
                nome,
                nextFeitas,
                nextTrancar,
                marcar,
                chavesPeriodo
            );
            nextFeitas = resultado.feitas;
            nextTrancar = resultado.trancar;
        }

        setMateriasTrancar(nextTrancar);
        setMateriasFeitas(nextFeitas);
    }

    function flashBotaoPeriodo(periodoIdx: number, lista: "obrigatorias" | "optativas") {
        if (modo === 0) return;
        const chave = `periodo-${periodoIdx}-${lista}-${modo}`;
        if (periodoFlashRef.current) {
            clearTimeout(periodoFlashRef.current);
        }
        setPeriodoFlash(chave);
        periodoFlashRef.current = setTimeout(() => {
            setPeriodoFlash(null);
            periodoFlashRef.current = null;
        }, 280);
    }

    function handlePeriodoTodo(
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ) {
        if (modo === 1) togglePeriodoConcluido(periodoIdx, lista);
        else if (modo === 2) togglePeriodoTrancar(periodoIdx, lista);
    }

    function renderCabecalhoPeriodo(
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ) {
        const nomes = materiasDaSecao(periodoIdx, lista);
        const rotuloBotao =
            modo === 1
                ? `Concluir todas do período ${periodoIdx}`
                : modo === 2
                  ? `Trancar todas do período ${periodoIdx}`
                  : "Selecione Concluída ou Desejo trancar";

        const chaveFlash = `periodo-${periodoIdx}-${lista}-${modo}`;
        const emFlash = periodoFlash === chaveFlash;

        return (
            <div className={styles.periodoMateria}>
                <span>Período {periodoIdx}</span>
                {nomes.length > 0 && (
                    <button
                        type="button"
                        className={`${styles.btnPeriodoTodo}${
                            modo === 1
                                ? ` ${styles.btnPeriodoTodoConcluida}${
                                      emFlash
                                          ? ` ${styles.btnPeriodoTodoFlashConcluida}`
                                          : ""
                                  }`
                                : modo === 2
                                  ? ` ${styles.btnPeriodoTodoTrancar}${
                                        emFlash
                                            ? ` ${styles.btnPeriodoTodoFlashTrancar}`
                                            : ""
                                    }`
                                  : ` ${styles.btnPeriodoTodoInativo}`
                        }`}
                        onClick={() => {
                            handlePeriodoTodo(periodoIdx, lista);
                            flashBotaoPeriodo(periodoIdx, lista);
                        }}
                        disabled={modo === 0}
                        aria-label={rotuloBotao}
                        title={rotuloBotao}
                    />
                )}
            </div>
        );
    }

    function materiaFeita(nome: string) {
        const chave = normalizeNome(nome);
        const isDisponivel = materiasDisponiveis.some(
            (periodo) =>
                periodo.obrigatorias.includes(nome) || periodo.optativas.includes(nome)
        );

        if (
            !podeMarcarConcluida(
                nome,
                db.materias,
                nomesFeitas,
                materiasTrancadasCascata,
                nomesTrancar,
                isDisponivel,
                listaMateriasDisponiveis
            )
        ) {
            return;
        }

        if (isFeita(nome)) {
            const atual = nomesFeitas.filter((m) => normalizeNome(m) !== chave);
            const { materiasFeitas: proximo } = removeDiff({
                materias: db.materias,
                anterior: nomesFeitas,
                atual,
            });
            setMateriasFeitas(
                proximo.reduce<NomesMarcados>((acc, n) => {
                    acc[normalizeNome(n)] = true;
                    return acc;
                }, {})
            );
            return;
        }

        const prevTrancar = materiasTrancarRef.current;
        const nextTrancar = { ...prevTrancar };
        delete nextTrancar[chave];

        setMateriasTrancar(nextTrancar);
        setMateriasFeitas((prev) => ({ ...prev, [chave]: true }));
    }

    function materiaTrancada(nome: string) {
        const estavaTrancada = isTrancar(nome);

        if (
            !podeMarcarTrancar(
                nome,
                materiasTrancadasCascata,
                nomesTrancar
            )
        ) {
            return;
        }

        const resultado = aplicarMarcarTrancar(
            nome,
            materiasFeitas,
            materiasTrancarRef.current,
            !estavaTrancada
        );

        setMateriasTrancar(resultado.trancar);
        setMateriasFeitas(resultado.feitas);
    }

    function reiniciar () {
        setMateriasFeitas({});
        setMateriasTrancar({});
        setModo(0);
    }

    const clsRolamentoWrap = `${styles.rolamentoWrap}${layoutFluxo === "vertical" ? ` ${styles.rolamentoWrapVertical}` : ""}`;
    const clsRolamento = `${styles.rolamento}${layoutFluxo === "vertical" ? ` ${styles.rolamentoVertical}` : ""}`;
    const clsMaterias = `${styles.materias}${layoutFluxo === "vertical" ? ` ${styles.materiasVertical}` : ""}`;
    const clsColuna = `${styles.colunaMaterias}${layoutFluxo === "vertical" ? ` ${styles.colunaMateriasVertical}` : ""}`;

    function handleMateriaPointer(
        event: React.PointerEvent<HTMLDivElement>,
        materia: string
    ) {
        event.preventDefault();
        const modoAtual = Number(event.currentTarget.dataset.modo ?? "0");
        const estadoAtual = event.currentTarget.dataset.estado ?? "";

        if (estadoAtual === "bloqueada") return;

        if (modoAtual === 1) materiaFeita(materia);
        else if (modoAtual === 2) materiaTrancada(materia);
    }

    function estadoCard(
        materia: string,
        periodoIdx: number,
        lista: "obrigatorias" | "optativas"
    ): "trancar" | "bloqueada" | "feita" | "disponivel" | "indisponivel" {
        if (isTrancar(materia)) return "trancar";
        if (isFeita(materia)) return "feita";
        if (estaBloqueadaPorDependenciaTrancada(materia, materiasTrancadasCascata)) {
            return "bloqueada";
        }

        const disponivel =
            lista === "optativas"
                ? listaMateriasDisponiveis.some(
                      (m) => normalizeNome(m) === normalizeNome(materia)
                  )
                : materiasDisponiveis[periodoIdx] != null &&
                  materiasDisponiveis[periodoIdx][lista].includes(materia);

        return disponivel ? "disponivel" : "indisponivel";
    }

    const clsFluxoModo =
        modo === 1
            ? styles.fluxoModoConcluida
            : modo === 2
              ? styles.fluxoModoTrancar
              : ""

    function renderTooltipDependencias(nome: string) {
        const materia = materiasPorNome.get(normalizeNome(nome))
        if (!materia) {
            return <span>Matéria não encontrada no banco.</span>
        }

        const ehOptativa = materia.natureza === "OP"
        const professoresInfo = ehOptativa
            ? formatarRotuloProfessores(materia.professores)
            : null

        const renderLista = (
            itens: string[],
            tipo: "pre" | "co"
        ) => (
            <ul className={styles.tooltipDepsLista}>
                {itens.length === 0 ? (
                    <li>Nenhum</li>
                ) : (
                    itens.map((item) => (
                        <li key={item}>
                            {item}
                            {tipo === "co" &&
                                isCorequisitoMutuo(db.materias, nome, item) &&
                                " ↔"}
                        </li>
                    ))
                )}
            </ul>
        )

        return (
            <div className={styles.tooltipDeps}>
                <div className={styles.tooltipDepsSecao}>
                    <strong className={styles.tooltipDepsTitulo}>{materia.nome}</strong>
                </div>
                <div className={styles.tooltipDepsSecao}>
                    <strong className={styles.tooltipDepsTitulo}>Carga horária</strong>
                    <ul className={styles.tooltipDepsLista}>
                        <li>{formatCargaHoraria(parseCarga(materia.carga))}</li>
                    </ul>
                </div>
                {ehOptativa && (
                    <div className={styles.tooltipDepsSecao}>
                        <strong className={styles.tooltipDepsTitulo}>Oferta</strong>
                        <ul className={styles.tooltipDepsLista}>
                            <li>
                                {materia.ofertada === true
                                    ? "Ofertada neste semestre"
                                    : "Não ofertada neste semestre"}
                            </li>
                        </ul>
                    </div>
                )}
                {ehOptativa && professoresInfo && (
                    <div className={styles.tooltipDepsSecao}>
                        <strong className={styles.tooltipDepsTitulo}>
                            {professoresInfo.rotulo}
                        </strong>
                        <ul className={styles.tooltipDepsLista}>
                            {professoresInfo.nomes.map((prof) => (
                                <li key={prof}>{prof}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {ehOptativa && materia.codigo && (
                    <div className={styles.tooltipDepsSecao}>
                        <strong className={styles.tooltipDepsTitulo}>Código</strong>
                        <ul className={styles.tooltipDepsLista}>
                            <li>{materia.codigo}</li>
                        </ul>
                    </div>
                )}
                <div className={styles.tooltipDepsSecao}>
                    <strong className={styles.tooltipDepsTitulo}>Pré-requisitos</strong>
                    {renderLista(materia.prerequisitos, "pre")}
                </div>
                <div className={styles.tooltipDepsSecao}>
                    <strong className={styles.tooltipDepsTitulo}>Corequisitos</strong>
                    {renderLista(materia.corequisitos, "co")}
                </div>
                {materia.corequisitos.length > 0 && (
                    <em className={styles.tooltipDepsNota}>
                        ↔ = corequisito mútuo (par simétrico)
                    </em>
                )}
            </div>
        )
    }

    function renderCardMateria(
        materia: string,
        periodoIdx: number,
        lista: "obrigatorias" | "optativas",
        keyPrefix: string
    ) {
        const estado = estadoCard(materia, periodoIdx, lista)
        const chaveInfo = normalizeNome(materia)

        const botaoInfo = (
            <button
                type="button"
                className={styles.cardInfoBtn}
                aria-label={`Ver pré e corequisitos de ${materia}`}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    if (!toqueSemHover) {
                        e.preventDefault();
                    }
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (toqueSemHover) {
                        setTooltipInfoAberto((prev) =>
                            prev === chaveInfo ? null : chaveInfo
                        );
                    }
                }}
            >
                <InfoOutlined fontSize="small" />
            </button>
        );

        return (
            <div
                key={`${keyPrefix}-${periodoIdx}-${materia}`}
                className={styles.cardMaterias}
                data-estado={estado}
                data-modo={modo}
                title={materia}
                onPointerDown={(e) => handleMateriaPointer(e, materia)}
            >
                {toqueSemHover ? (
                    botaoInfo
                ) : (
                    <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 400 }}
                        title={renderTooltipDependencias(materia)}
                        placement="top"
                        arrow
                        slotProps={tooltipAzulSlotProps}
                        PopperProps={tooltipPopperProps}
                    >
                        {botaoInfo}
                    </Tooltip>
                )}
                <span className={styles.cardMateriaNome}>{materia}</span>
            </div>
        )
    }

    function renderSecaoOptativas() {
        const { optativasOfertadas, optativasNaoOfertadas } = db

        return (
            <div className={styles.secaoOptativas}>
                <div className={styles.obrigatoriedade}>Matérias optativas</div>

                <div className={styles.optativasGrupo}>
                    <h3 className={styles.optativasGrupoTitulo}>
                        Ofertadas neste semestre
                    </h3>
                    {optativasOfertadas.length === 0 ? (
                        <p className={styles.optativasVazio}>
                            Nenhuma matéria ofertada neste semestre.
                        </p>
                    ) : (
                        <div className={`${styles.optativasGrid} ${clsFluxoModo}`}>
                            {optativasOfertadas.map((materia) =>
                                renderCardMateria(
                                    materia.nome,
                                    0,
                                    "optativas",
                                    `op-ofertada-${materia.codigo ?? materia.nome}`
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.optativasGrupo}>
                    <h3 className={styles.optativasGrupoTitulo}>
                        Não ofertadas neste semestre
                    </h3>
                    {optativasNaoOfertadas.length === 0 ? (
                        <p className={styles.optativasVazio}>
                            Nenhuma matéria não ofertada encontrada.
                        </p>
                    ) : (
                        <div className={`${styles.optativasGrid} ${clsFluxoModo}`}>
                            {optativasNaoOfertadas.map((materia) =>
                                renderCardMateria(
                                    materia.nome,
                                    0,
                                    "optativas",
                                    `op-nao-ofertada-${materia.codigo ?? materia.nome}`
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const materiaInfoAberta =
        tooltipInfoAberto != null
            ? materiasPorNome.get(tooltipInfoAberto)?.nome ?? null
            : null;

    function renderPopoverMobileInfo() {
        if (!toqueSemHover || !materiaInfoAberta || typeof document === "undefined") {
            return null;
        }

        return createPortal(
            <div
                className={styles.infoPopoverOverlay}
                onClick={() => setTooltipInfoAberto(null)}
                role="presentation"
            >
                <div
                    className={styles.infoPopover}
                    role="dialog"
                    aria-label={`Informações de ${materiaInfoAberta}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className={styles.infoPopoverFechar}
                        aria-label="Fechar"
                        onClick={() => setTooltipInfoAberto(null)}
                    >
                        ×
                    </button>
                    {renderTooltipDependencias(materiaInfoAberta)}
                </div>
            </div>,
            document.body
        );
    }

    function renderPopoverMobileAjuda() {
        if (!toqueSemHover || !tooltipAjudaAberto || typeof document === "undefined") {
            return null;
        }

        return createPortal(
            <div
                className={styles.infoPopoverOverlay}
                onClick={() => setTooltipAjudaAberto(false)}
                role="presentation"
            >
                <div
                    className={styles.infoPopover}
                    role="dialog"
                    aria-label="Ajuda do fluxo de matérias"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className={styles.infoPopoverFechar}
                        aria-label="Fechar"
                        onClick={() => setTooltipAjudaAberto(false)}
                    >
                        ×
                    </button>
                    <span>
                        <strong>Concluída</strong> - matérias que já foram concluídas ou que serão/estão sendo feita
                        <br />
                        <strong>Desejo trancar</strong> - matérias que você deseja trancar, não fez ou não fará
                    </span>
                </div>
            </div>,
            document.body
        );
    }

    return (
        <>
            <Head>
                <title>COMPET | Fluxo Matérias</title>
            </Head>
            <section>
                <Header />
                <div className={styles.opcoes}>
                    <label className="radioButtons">
                        <input
                            type="radio" className={styles.fez} name="etapa" value="1"
                            checked={modo === 1}
                            onChange={opcaoSelecionada}
                        />
                        Concluída
                    </label>
                    <label>
                        <input
                            type="radio" className={styles.trancou} name="etapa" value="2"
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
                        <select
                            className={styles.botoes}
                            value={isToggled ? "Nova" : "Velha"}
                            onChange={gradeSelectChange}
                            aria-label="Grade Nova ou Velha"
                        >
                            <option value="Nova">Nova</option>
                            <option value="Velha">Velha</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className={styles.botoes}
                            value={layoutFluxo}
                            onChange={e =>
                                setLayoutFluxo(e.target.value as "horizontal" | "vertical")
                            }
                            aria-label="Disposição: horizontal ou vertical"
                        >
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                        </select>
                    </label>
                    {toqueSemHover ? (
                        <button
                            type="button"
                            className={styles.tooltipAjudaBtn}
                            aria-label="Ajuda sobre Concluída e Desejo trancar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setTooltipAjudaAberto((prev) => !prev);
                            }}
                        >
                            i
                        </button>
                    ) : (
                        <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 700 }}
                            title={
                                <span>
                                    <strong>Concluída</strong> - matérias que já foram concluídas ou que serão/estão sendo feita<br />
                                    <strong>Desejo trancar</strong> - matérias que você deseja trancar, não fez ou não fará
                                </span>
                            }
                            placement="bottom"
                            arrow
                            slotProps={tooltipAzulSlotProps}
                            PopperProps={{
                                ...tooltipPopperProps,
                                modifiers: [
                                    ...(tooltipPopperProps.modifiers ?? []),
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, -8],
                                        },
                                    },
                                ],
                            }}
                        >
                            <button
                                type="button"
                                className={styles.tooltipAjudaBtn}
                                aria-label="Ajuda sobre Concluída e Desejo trancar"
                            >
                                i
                            </button>
                        </Tooltip>
                    )}
                    <div
                        className={styles.horasIntegralizadas}
                        aria-label="Horas integralizadas das matérias concluídas"
                    >
                        <div className={styles.horasIntegralizadasItem}>
                            <span
                                className={`${styles.horasIntegralizadasValor} ${styles.horasIntegralizadasValorTotal}`}
                            >
                                {formatCargaHoraria(horasIntegralizadas.total)}
                            </span>
                            <span className={styles.horasIntegralizadasChave}>
                                integralizadas
                            </span>
                        </div>
                        <span
                            className={styles.horasIntegralizadasDivider}
                            aria-hidden="true"
                        />
                        <div className={styles.horasIntegralizadasItem}>
                            <span className={styles.horasIntegralizadasValor}>
                                {formatCargaHoraria(horasIntegralizadas.obrigatorias)}
                            </span>
                            <span className={styles.horasIntegralizadasChave}>
                                obrigatórias
                            </span>
                        </div>
                        <span
                            className={styles.horasIntegralizadasDivider}
                            aria-hidden="true"
                        />
                        <div className={styles.horasIntegralizadasItem}>
                            <span className={styles.horasIntegralizadasValor}>
                                {formatCargaHoraria(horasIntegralizadas.optativas)}
                            </span>
                            <span className={styles.horasIntegralizadasChave}>
                                optativas
                            </span>
                        </div>
                    </div>

                </div>
                <div className={styles.divisoria} />

                <div className={clsRolamentoWrap}>
                    <div className={clsRolamento}>
                        {/* MATÉRIAS OBRIGATÓRIAS */}
                        <div className={styles.obrigatoriedade}>OBRIGATÓRIAS</div>
                        <div className={`${clsMaterias} ${clsFluxoModo}`}>
                            {(() => {
                                const elements = [];
                                for (let i = 1; i <= 10; i++) {
                                    elements.push(
                                        <div key={i} className={clsColuna}>
                                            {renderCabecalhoPeriodo(i, "obrigatorias")}
                                            <div
                                                className={
                                                    layoutFluxo === "vertical"
                                                        ? styles.periodoCardsWrap
                                                        : undefined
                                                }
                                            >
                                                {db.materiasPorPeriodo[i].obrigatorias.map((materia) =>
                                                    renderCardMateria(
                                                        materia,
                                                        i,
                                                        "obrigatorias",
                                                        "ob"
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                return elements;
                            })()}
                        </div>
                    </div>
                </div>

                {/* Optativas fora do scroll horizontal */}
                {renderSecaoOptativas()}
                {renderPopoverMobileInfo()}
                {renderPopoverMobileAjuda()}
                <Footer />
            </section>
        </>
    )
}