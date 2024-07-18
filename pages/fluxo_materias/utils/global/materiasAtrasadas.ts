import { Materias } from "./interfaces"

interface Periodo {
    periodo: string,
    obrigatorias: string[],
    optativas: string[],
}

interface materiasAtrasadasRequest {
    ehPreRequisitoDe: { [key: string]: string[] },
    ehCorequisitoDe: { [key: string]: string[] },
    materiasATrancar: string[],
    materiasFeitas: string[],
    materias: Materias[]
}

export function materiasAtrasadas({ ehCorequisitoDe, ehPreRequisitoDe, materiasATrancar, materias, materiasFeitas }: materiasAtrasadasRequest): Periodo[] {

    const ansSet: Set<string> = new Set()
    const stack: string[] = materiasATrancar
    const retorno: Periodo[] = []

    while (stack.length > 0) {

        const curr = stack[stack.length - 1]; stack.pop()

        if (ansSet.has(curr)) continue
        ansSet.add(curr)

        const materia: Materias = materias.find(m => m.nome === curr) as Materias
        const indexAlreadyAdded = retorno.findIndex(retorno => retorno.periodo === materia.periodo.toString())

        if (indexAlreadyAdded === -1) {
            if (materia.natureza === "OB")
                retorno.push({ periodo: materia.periodo.toString(), obrigatorias: [materia.nome], optativas: [] })
            else
                retorno.push({ periodo: materia.periodo.toString(), obrigatorias: [], optativas: [materia.nome] })
        } else {
            if (materia.natureza === "OB")
                retorno[indexAlreadyAdded].obrigatorias.push(materia.nome)
            else
                retorno[indexAlreadyAdded].optativas.push(materia.nome)
        }

        if (ehPreRequisitoDe[curr]) {
            for (const u of ehPreRequisitoDe[curr]) {
                if (!materiasFeitas.includes(u)) {
                    stack.push(u)
                }
            }
        }

        if (ehCorequisitoDe[curr]) {
            for (const u of ehCorequisitoDe[curr]) {
                if (!materiasFeitas.includes(u)) {
                    stack.push(u)
                }
            }
        }

    }

    retorno.sort((a, b) => parseInt(a.periodo) - parseInt(b.periodo))

    return retorno
}