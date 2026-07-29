import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { normalizeMateria } from "./normalizeMateria"
import { fetchMateriasSeparadasPorPeriodo } from "./fetchMateriasSeparadasPorPeriodo"
import { buildFluxoMateriasDb } from "./buildFluxoMateriasDb"
import {
    formatarRotuloProfessores,
    separarOptativas,
} from "./separarOptativas"
import type { Materias } from "./interfaces"

function materia(parcial: Partial<Materias> & Pick<Materias, "nome" | "natureza">): Materias {
    return {
        periodo: null,
        carga: 60,
        corequisitos: [],
        prerequisitos: [],
        professores: [],
        ...parcial,
    }
}

describe("normalizeMateria — novos campos", () => {
    it("preserva codigo, ofertada, professores e semestreOferta", () => {
        const doc = normalizeMateria({
            nome: "Visão Computacional",
            periodo: null,
            natureza: "OP",
            carga: 60,
            grade: "nova",
            codigo: "G00VCOM0.01",
            ofertada: true,
            professores: ["Natalia Cosse Batista"],
            semestreOferta: "2026.2",
            prerequisitos: [],
            corequisitos: [],
        })

        assert.equal(doc.codigo, "G00VCOM0.01")
        assert.equal(doc.ofertada, true)
        assert.deepEqual(doc.professores, ["Natalia Cosse Batista"])
        assert.equal(doc.semestreOferta, "2026.2")
        assert.equal(doc.periodo, null)
    })

    it("aceita periodo null e ofertada ausente", () => {
        const doc = normalizeMateria({
            nome: "Robótica",
            periodo: null,
            natureza: "OP",
            carga: 60,
            grade: "nova",
        })

        assert.equal(doc.periodo, null)
        assert.equal(doc.ofertada, undefined)
        assert.deepEqual(doc.professores, [])
        assert.equal(doc.semestreOferta, null)
    })
})

describe("separarOptativas", () => {
    const base: Materias[] = [
        materia({ nome: "Calculo I", natureza: "OB", periodo: "1", grade: "nova" }),
        materia({
            nome: "Visão Computacional",
            natureza: "OP",
            grade: "nova",
            ofertada: true,
            professores: ["Natalia Cosse Batista"],
        }),
        materia({
            nome: "Robótica",
            natureza: "OP",
            grade: "nova",
            ofertada: false,
        }),
        materia({
            nome: "Banco de Dados II",
            natureza: "OP",
            grade: "nova",
            ofertada: true,
            professores: ["Evandrino Gomes Barros"],
        }),
        materia({
            nome: "Sem Flag",
            natureza: "OP",
            grade: "nova",
        }),
    ]

    it("separa ofertadas e não ofertadas sem hardcode de quantidade", () => {
        const { optativas, optativasOfertadas, optativasNaoOfertadas } =
            separarOptativas(base)

        assert.equal(optativas.length, 4)
        assert.equal(optativasOfertadas.length, 2)
        assert.equal(optativasNaoOfertadas.length, 2)
        assert.ok(optativasOfertadas.every((m) => m.ofertada === true))
        assert.ok(optativasNaoOfertadas.every((m) => m.ofertada !== true))
    })

    it("ordena alfabeticamente em pt-BR", () => {
        const { optativasOfertadas, optativasNaoOfertadas } = separarOptativas(base)
        assert.deepEqual(
            optativasOfertadas.map((m) => m.nome),
            ["Banco de Dados II", "Visão Computacional"]
        )
        assert.deepEqual(
            optativasNaoOfertadas.map((m) => m.nome),
            ["Robótica", "Sem Flag"]
        )
    })

    it("trata ausência de ofertada como não ofertada", () => {
        const { optativasNaoOfertadas } = separarOptativas(base)
        assert.ok(optativasNaoOfertadas.some((m) => m.nome === "Sem Flag"))
    })
})

describe("formatarRotuloProfessores", () => {
    it("não retorna linha vazia para array vazio", () => {
        assert.equal(formatarRotuloProfessores([]), null)
        assert.equal(formatarRotuloProfessores(undefined), null)
    })

    it("formata um e vários professores", () => {
        const um = formatarRotuloProfessores(["Natalia Cosse Batista"])
        assert.equal(um?.rotulo, "Professor(a)")
        assert.deepEqual(um?.nomes, ["Natalia Cosse Batista"])

        const varios = formatarRotuloProfessores([
            "Evandro Carrusca de Oliveira",
            "Arnaldo Freitas de Oliveira Junior",
        ])
        assert.equal(varios?.rotulo, "Professores")
        assert.equal(varios?.nomes.length, 2)
    })
})

describe("fetchMateriasSeparadasPorPeriodo — sem optativas nos períodos", () => {
    it("não coloca optativas nas colunas de período", () => {
        const materias: Materias[] = [
            materia({ nome: "Calculo I", natureza: "OB", periodo: "1" }),
            materia({
                nome: "Visão Computacional",
                natureza: "OP",
                periodo: null,
                ofertada: true,
            }),
            materia({
                nome: "Optativa Antiga",
                natureza: "OP",
                periodo: "3",
                ofertada: false,
            }),
        ]

        const { materiasPorPeriodo } = fetchMateriasSeparadasPorPeriodo(materias)

        for (const periodo of materiasPorPeriodo) {
            assert.deepEqual(periodo.optativas, [])
        }
        assert.deepEqual(materiasPorPeriodo[1].obrigatorias, ["Calculo I"])
    })

    it("periodo null não quebra o agrupamento", () => {
        const { materiasPorPeriodo } = fetchMateriasSeparadasPorPeriodo([
            materia({ nome: "Sem Periodo", natureza: "OB", periodo: null }),
            materia({ nome: "Com Periodo", natureza: "OB", periodo: "2" }),
        ])
        assert.deepEqual(materiasPorPeriodo[2].obrigatorias, ["Com Periodo"])
        assert.ok(
            materiasPorPeriodo.every((p) => !p.obrigatorias.includes("Sem Periodo"))
        )
    })
})

describe("buildFluxoMateriasDb", () => {
    it("não duplica optativas entre períodos e seção dedicada", () => {
        const materias: Materias[] = [
            materia({ nome: "Calculo I", natureza: "OB", periodo: "1", grade: "nova" }),
            materia({
                nome: "Banco de Dados II",
                natureza: "OP",
                grade: "nova",
                ofertada: true,
                professores: ["Evandrino Gomes Barros"],
            }),
            materia({
                nome: "Robótica",
                natureza: "OP",
                grade: "nova",
                ofertada: false,
            }),
        ]

        const db = buildFluxoMateriasDb(materias)
        const nomesEmPeriodos = db.materiasPorPeriodo.flatMap((p) => [
            ...p.obrigatorias,
            ...p.optativas,
        ])

        assert.ok(!nomesEmPeriodos.includes("Banco de Dados II"))
        assert.ok(!nomesEmPeriodos.includes("Robótica"))
        assert.equal(db.optativasOfertadas.length, 1)
        assert.equal(db.optativasNaoOfertadas.length, 1)
        assert.equal(
            db.optativasOfertadas[0].professores?.[0],
            "Evandrino Gomes Barros"
        )
    })
})
