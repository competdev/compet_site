import { Materias, Periodo } from "./interfaces"
import { normalizeNome } from "./normalizeNome"

interface ShowmateriasDisponivelsAgoraRequest {

    materiasFeitas: string[],
    materias: Materias[],
    materiasPorPeriodo: Periodo[],
    materiasTrancadas?: string[],

}

function feitaOuMarcada(materiasFeitas: string[], nome: string): boolean {
    const chave = normalizeNome(nome)
    return materiasFeitas.some((f) => normalizeNome(f) === chave)
}

function conjuntoContemNome(conjunto: Set<string>, nome: string): boolean {
    const chave = normalizeNome(nome)
    return Array.from(conjunto).some((item) => normalizeNome(item) === chave)
}

function listaContemNome(nomes: string[], nome: string): boolean {
    const chave = normalizeNome(nome)
    return nomes.some((n) => normalizeNome(n) === chave)
}

export function showmateriasDisponivelsAgora({ materias, materiasFeitas, materiasPorPeriodo, materiasTrancadas = [] }: ShowmateriasDisponivelsAgoraRequest) {
    const candidatos = new Set<string>()

    for (const periodo of materiasPorPeriodo) {
        for (const materia of [...periodo.obrigatorias, ...periodo.optativas]) {
            if (feitaOuMarcada(materiasFeitas, materia)) continue

            const materiaObj = materias.find(
                (m) => normalizeNome(m.nome) === normalizeNome(materia)
            )
            if (!materiaObj) continue

            if (materiaObj.prerequisitos.length > 0) {
                const doneAll = materiaObj.prerequisitos.every((pre) =>
                    feitaOuMarcada(materiasFeitas, pre)
                )
                if (!doneAll) continue
            }

            candidatos.add(materia)
        }
    }

    // Corequisito é direcional: M exige coreqs feitos ou também disponíveis (fazer junto).
    let changed = true
    while (changed) {
        changed = false
        for (const materia of Array.from(candidatos)) {
            const materiaObj = materias.find(
                (m) => normalizeNome(m.nome) === normalizeNome(materia)
            )
            if (!materiaObj?.corequisitos.length) continue

            for (const corequisito of materiaObj.corequisitos) {
                if (feitaOuMarcada(materiasFeitas, corequisito)) continue
                if (listaContemNome(materiasTrancadas, corequisito)) {
                    candidatos.delete(materia)
                    changed = true
                    break
                }
                if (!conjuntoContemNome(candidatos, corequisito)) {
                    candidatos.delete(materia)
                    changed = true
                    break
                }
            }
        }
    }

    const retorno: Periodo[] = []

    for (const periodo of materiasPorPeriodo) {
        for (const materia of periodo.obrigatorias) {
            if (!candidatos.has(materia)) continue

            const materiaObj = materias.find(
                (m) => normalizeNome(m.nome) === normalizeNome(materia)
            ) as Materias

            const indexAlreadyAdded = retorno.findIndex(
                (retorno) => retorno.periodo === periodo.periodo
            )
            if (indexAlreadyAdded === -1) {
                retorno.push({ periodo: periodo.periodo, obrigatorias: [materia], optativas: [] })
            } else {
                retorno[indexAlreadyAdded].obrigatorias.push(materia)
            }
        }

        for (const materia of periodo.optativas) {
            if (!candidatos.has(materia)) continue

            const materiaObj = materias.find(
                (m) => normalizeNome(m.nome) === normalizeNome(materia)
            ) as Materias

            const indexAlreadyAdded = retorno.findIndex(
                (retorno) => retorno.periodo === periodo.periodo
            )

            if (materiaObj.natureza === "OB") {
                if (indexAlreadyAdded === -1) {
                    retorno.push({ periodo: periodo.periodo, obrigatorias: [materia], optativas: [] })
                } else {
                    retorno[indexAlreadyAdded].obrigatorias.push(materia)
                }
            } else if (indexAlreadyAdded === -1) {
                retorno.push({ periodo: periodo.periodo, obrigatorias: [], optativas: [materia] })
            } else {
                retorno[indexAlreadyAdded].optativas.push(materia)
            }
        }
    }

    for (let i = 0; i <= 10; i++) {
        if (!retorno.find((a) => a.periodo === `${i}`)) {
            retorno.push({
                periodo: `${i}`,
                obrigatorias: [],
                optativas: [],
            })
        }
    }

    retorno.sort((a, b) => parseInt(a.periodo) - parseInt(b.periodo))

    return retorno
}