import { Materias, Periodo } from "./interfaces"
import { ordenarNomesPorSimilaridade } from "./ordenarPorSimilaridade"

interface FetchMateriasSeparadasPorPeriodoResponse {
  materiasPorPeriodo: Periodo[]
}

/**
 * Agrupa apenas matérias obrigatórias por período.
 * Optativas (natureza === "OP") ficam fora — vão para a seção dedicada.
 */
export function fetchMateriasSeparadasPorPeriodo(materias: Materias[]): FetchMateriasSeparadasPorPeriodoResponse {
  const MAX_PERIODO = 10

  const materiasPorPeriodo: Periodo[] = Array.from({ length: MAX_PERIODO + 1 }, (_, i) => ({
    periodo: i.toString(),
    obrigatorias: [],
    optativas: [],
  }))

  for (const materia of materias) {
    if (materia.natureza === "OP") continue

    const idx = Number.parseInt(String(materia.periodo ?? "").trim(), 10)
    if (!Number.isInteger(idx) || idx < 0 || idx > MAX_PERIODO) continue

    materiasPorPeriodo[idx].obrigatorias.push(materia.nome)
  }

  for (let i = 0; i <= MAX_PERIODO; i++) {
    materiasPorPeriodo[i].obrigatorias = ordenarNomesPorSimilaridade(
      materiasPorPeriodo[i].obrigatorias,
      materias
    )
  }

  return { materiasPorPeriodo }
}
