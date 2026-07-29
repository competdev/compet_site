import { findMateriasDependentesPreRequisito } from "./findMateriasDependentes"
import { Materias } from "./interfaces"
import { normalizeNome } from "./normalizeNome"

interface Periodo {
    periodo: string,
    obrigatorias: string[],
    optativas: string[],
}

interface materiasAtrasadasRequest {
    materiasATrancar: string[],
    materias: Materias[]
}

export function listarMateriasTrancadasCascata(
    materiasATrancar: string[],
    materias: Materias[]
): string[] {
    const inputSet = new Set(materiasATrancar.map((nome) => normalizeNome(nome)))
    const atrasadas = materiasAtrasadas({ materiasATrancar, materias })
    const nomes: string[] = []
    for (const periodo of atrasadas) {
        for (const nome of [...periodo.obrigatorias, ...periodo.optativas]) {
            if (!inputSet.has(normalizeNome(nome))) nomes.push(nome)
        }
    }
    return nomes
}

export function materiasAtrasadas({ materiasATrancar, materias }: materiasAtrasadasRequest): Periodo[] {

    const ansSet: Set<string> = new Set()
    const stack: string[] = [...materiasATrancar]
    const retorno: Periodo[] = []

    while (stack.length > 0) {

        const curr = stack.pop() as string
        const currChave = normalizeNome(curr)

        if (ansSet.has(currChave)) continue
        ansSet.add(currChave)

        const materia = materias.find(
            (m) => normalizeNome(m.nome) === currChave
        )
        if (!materia) continue

        const periodoKey = String(materia.periodo ?? "")
        const indexAlreadyAdded = retorno.findIndex(
            (retorno) => retorno.periodo === periodoKey
        )

        if (indexAlreadyAdded === -1) {
            if (materia.natureza === "OB")
                retorno.push({ periodo: periodoKey, obrigatorias: [materia.nome], optativas: [] })
            else
                retorno.push({ periodo: periodoKey, obrigatorias: [], optativas: [materia.nome] })
        } else {
            if (materia.natureza === "OB")
                retorno[indexAlreadyAdded].obrigatorias.push(materia.nome)
            else
                retorno[indexAlreadyAdded].optativas.push(materia.nome)
        }

        for (const u of findMateriasDependentesPreRequisito(materias, materia.nome)) {
            stack.push(u)
        }

    }

    retorno.sort((a, b) => parseInt(a.periodo) - parseInt(b.periodo))

    return retorno
}