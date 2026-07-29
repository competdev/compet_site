import { Materias } from "./interfaces"

export interface OptativasSeparadas {
    optativas: Materias[]
    optativasOfertadas: Materias[]
    optativasNaoOfertadas: Materias[]
}

function compararNomes(a: Materias, b: Materias): number {
    return a.nome.localeCompare(b.nome, "pt-BR")
}

/** Optativas da grade atual — fora do agrupamento por período. */
export function separarOptativas(materias: Materias[]): OptativasSeparadas {
    const optativas = materias.filter((materia) => materia.natureza === "OP")

    const optativasOfertadas = optativas
        .filter((materia) => materia.ofertada === true)
        .sort(compararNomes)

    const optativasNaoOfertadas = optativas
        .filter((materia) => materia.ofertada !== true)
        .sort(compararNomes)

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
