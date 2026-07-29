import { fetchMateriasSeparadasPorPeriodo } from "./fetchMateriasSeparadasPorPeriodo"
import { Materias, Periodo } from "./interfaces"
import { separarOptativas } from "./separarOptativas"

export interface FluxoMateriasDb {
    materias: Materias[]
    materiasPorPeriodo: Periodo[]
    optativasOfertadas: Materias[]
    optativasNaoOfertadas: Materias[]
}

export function buildFluxoMateriasDb(materias: Materias[]): FluxoMateriasDb {
    const { materiasPorPeriodo } = fetchMateriasSeparadasPorPeriodo(materias)
    const { optativasOfertadas, optativasNaoOfertadas } = separarOptativas(materias)
    return {
        materias,
        materiasPorPeriodo,
        optativasOfertadas,
        optativasNaoOfertadas,
    }
}
