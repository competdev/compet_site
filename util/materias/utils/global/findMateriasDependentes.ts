import { Materias } from "./interfaces"
import { normalizeNome } from "./normalizeNome"

function findMateria(materias: Materias[], nome: string): Materias | undefined {
    const chave = normalizeNome(nome)
    return materias.find((m) => normalizeNome(m.nome) === chave)
}

function materiaDependeDePreRequisito(materia: Materias, nome: string): boolean {
    const chave = normalizeNome(nome)
    return materia.prerequisitos.some((p) => normalizeNome(p) === chave)
}

function materiaDependeDe(materia: Materias, nome: string): boolean {
    const chave = normalizeNome(nome)
    return (
        materiaDependeDePreRequisito(materia, nome) ||
        materia.corequisitos.some((c) => normalizeNome(c) === chave)
    )
}

/** Matérias que dependem de `nome` como pré-requisito (somente pré). */
export function findMateriasDependentesPreRequisito(
    materias: Materias[],
    nome: string
): string[] {
    return materias
        .filter((m) => materiaDependeDePreRequisito(m, nome))
        .map((m) => m.nome)
}

/** Matérias que dependem de `nome` como pré ou correquisito. */
export function findMateriasDependentes(materias: Materias[], nome: string): string[] {
    return materias.filter((m) => materiaDependeDe(m, nome)).map((m) => m.nome)
}

/** Correquisitos diretos cadastrados na matéria (só saída; não inverte). */
export function obterCorequisitos(materias: Materias[], nome: string): string[] {
    return findMateria(materias, nome)?.corequisitos ?? []
}

/** @deprecated Use obterCorequisitos — corequisito é direcional no banco. */
export function obterCorequisitosRelacionados(
    materias: Materias[],
    nome: string
): string[] {
    return obterCorequisitos(materias, nome)
}

/** Cadeia transitiva só por pré-requisito (para remover trancar à frente). */
export function listarTodosDependentesPreRequisito(
    materias: Materias[],
    raiz: string
): string[] {
    const vistos = new Set<string>()
    const fila: string[] = [raiz]

    while (fila.length > 0) {
        const atual = fila.shift() as string
        for (const dep of findMateriasDependentesPreRequisito(materias, atual)) {
            if (!vistos.has(dep)) {
                vistos.add(dep)
                fila.push(dep)
            }
        }
    }

    return Array.from(vistos)
}

/** Matérias trancadas (vermelho) que deixam `alvo` só como bloqueada em cascata. */
export function listarTrancarQueBloqueiam(
    materias: Materias[],
    nomesTrancar: string[],
    alvo: string
): string[] {
    const alvoChave = normalizeNome(alvo)
    return nomesTrancar.filter((raiz) =>
        listarTodosDependentes(materias, raiz).some(
            (dep) => normalizeNome(dep) === alvoChave
        )
    )
}

/** Todas as matérias à frente na cadeia de pré/corequisitos (transitivo). */
export function listarTodosDependentes(materias: Materias[], raiz: string): string[] {
    const vistos = new Set<string>()
    const fila: string[] = [raiz]

    while (fila.length > 0) {
        const atual = fila.shift() as string
        for (const dep of findMateriasDependentes(materias, atual)) {
            if (!vistos.has(dep)) {
                vistos.add(dep)
                fila.push(dep)
            }
        }
    }

    return Array.from(vistos)
}
