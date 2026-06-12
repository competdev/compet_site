import { Materias, Periodo } from "./interfaces"

interface FetchMateriasSeparadasPorPeriodoResponse {
  materiasPorPeriodo: Periodo[]
}

// Retorna lista com materias optativas e obrigatórias separadas por periodo de todos os periodos
export function fetchMateriasSeparadasPorPeriodo(materias: Materias[]): FetchMateriasSeparadasPorPeriodoResponse {
  const MAX_PERIODO = 10

  const materiasPorPeriodo: Periodo[] = Array.from({ length: MAX_PERIODO + 1 }, (_, i) => ({
    periodo: i.toString(),
    obrigatorias: [],
    optativas: [],
  }))

  for (const materia of materias) {
    const idx = Number.parseInt(String(materia.periodo).trim(), 10)
    if (!Number.isInteger(idx) || idx < 0 || idx > MAX_PERIODO) continue

    if (materia.natureza === "OP")
      materiasPorPeriodo[idx].optativas.push(materia.nome)
    else
      materiasPorPeriodo[idx].obrigatorias.push(materia.nome)
  }

  const compararNomes = (a: string, b: string) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })

  for (let i = 0; i <= MAX_PERIODO; i++) {
    materiasPorPeriodo[i].obrigatorias.sort(compararNomes)
    materiasPorPeriodo[i].optativas.sort(compararNomes)
  }

  return { materiasPorPeriodo }
}