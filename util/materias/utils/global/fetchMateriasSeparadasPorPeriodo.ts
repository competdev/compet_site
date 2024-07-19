import { Materias, Periodo } from "./interfaces"

interface FetchMateriasSeparadasPorPeriodoResponse {
  materiasPorPeriodo: Periodo[]
}

// Retorna lista com materias optativas e obrigatórias separadas por periodo de todos os periodos
export function fetchMateriasSeparadasPorPeriodo(materias: Materias[]): FetchMateriasSeparadasPorPeriodoResponse {

  const materiasPorPeriodo: { periodo: string, obrigatorias: string[], optativas: string[] }[] = []
  materiasPorPeriodo.length = 11
  for (let i = 0; i <= 10; i++)
    materiasPorPeriodo[i] = { obrigatorias: [], optativas: [], periodo: i.toString() }

  for (const materia of materias) {
    if (materia.natureza === "OP")
      materiasPorPeriodo[parseInt(materia.periodo)].optativas.push(materia.nome)
    else
      materiasPorPeriodo[parseInt(materia.periodo)].obrigatorias.push(materia.nome)
  }

  return { materiasPorPeriodo }
}