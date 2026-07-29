import { Materias } from "./interfaces"
import { ordenarPorSimilaridade } from "./ordenarPorSimilaridade"

export interface OptativasSeparadas {
    optativas: Materias[]
    optativasOfertadas: Materias[]
    optativasNaoOfertadas: Materias[]
}

/** Optativas da grade atual — fora do agrupamento por período. */
export function separarOptativas(materias: Materias[]): OptativasSeparadas {
    const optativas = materias.filter((materia) => materia.natureza === "OP")

    const optativasOfertadas = ordenarPorSimilaridade(
        optativas.filter((materia) => materia.ofertada === true)
    )

    const optativasNaoOfertadas = ordenarPorSimilaridade(
        optativas.filter((materia) => materia.ofertada !== true)
    )

    return { optativas, optativasOfertadas, optativasNaoOfertadas }
}

export function formatarRotuloProfessores(professores: string[] | undefined): {
    rotulo: string
    nomes: string[]
} | null {
    const nomes = (professores ?? []).map((p) => p.trim()).filter(Boolean)
    if (nomes.length === 0) return null
    if (nomes.length === 1) {
        return { rotulo: "Professor(a)", nomes }
    }
    return { rotulo: "Professores", nomes }
}
