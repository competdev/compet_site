import { fetchMateriasSeparadasPorPeriodo } from "./fetchMateriasSeparadasPorPeriodo"
import { Materias, Periodo } from "./interfaces"

export interface FluxoMateriasDb {
    materias: Materias[]
    materiasPorPeriodo: Periodo[]
}

export function buildFluxoMateriasDb(materias: Materias[]): FluxoMateriasDb {
    const { materiasPorPeriodo } = fetchMateriasSeparadasPorPeriodo(materias)
    return { materias, materiasPorPeriodo }
}
