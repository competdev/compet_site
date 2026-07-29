import { Materias } from "./interfaces"
import { obterCorequisitos } from "./findMateriasDependentes"
import { normalizeNome } from "./normalizeNome"

export const CORES_FLUXO = {
    trancar: "#b30606",
    trancarTexto: "#ffffff",
    bloqueada: "#3a1c1ca4",
    bloqueadaTexto: "#ffffff",
    concluida: "#19dd3ac7",
    concluidaTexto: "#000000",
    disponivel: "#ffffff",
    indisponivel: "#929292c2",
} as const

/** Cinza escuro: dependente de matéria trancada (cascata). */
export function estaBloqueadaPorDependenciaTrancada(
    nome: string,
    materiasTrancadasCascata: string[]
): boolean {
    const chave = normalizeNome(nome)
    return materiasTrancadasCascata.some((m) => normalizeNome(m) === chave)
}

function listaContemNome(nomes: string[], nome: string): boolean {
    const chave = normalizeNome(nome)
    return nomes.some((n) => normalizeNome(n) === chave)
}

export function prerequisitosAtendidos(
    nome: string,
    materias: Materias[],
    materiasFeitas: string[]
): boolean {
    const materia = materias.find((m) => normalizeNome(m.nome) === normalizeNome(nome))
    if (!materia?.prerequisitos.length) return true
    return materia.prerequisitos.every((pre) => listaContemNome(materiasFeitas, pre))
}

function corequisitoMutuo(
    materias: Materias[],
    nome: string,
    corequisito: string
): boolean {
    const chave = normalizeNome(nome)
    const materiaCo = materias.find(
        (m) => normalizeNome(m.nome) === normalizeNome(corequisito)
    )
    return materiaCo?.corequisitos.some((c) => normalizeNome(c) === chave) ?? false
}

export function isCorequisitoMutuo(
    materias: Materias[],
    nome: string,
    corequisito: string
): boolean {
    return corequisitoMutuo(materias, nome, corequisito)
}

export function obterCorequisitosMutuos(materias: Materias[], nome: string): string[] {
    return obterCorequisitos(materias, nome).filter((co) =>
        corequisitoMutuo(materias, nome, co)
    )
}

export function corequisitosAtendidosParaConcluir(
    nome: string,
    materias: Materias[],
    materiasFeitas: string[],
    materiasDisponiveis: string[] = [],
    materiasTrancadas: string[] = []
): boolean {
    const materia = materias.find((m) => normalizeNome(m.nome) === normalizeNome(nome))
    if (!materia?.corequisitos.length) return true
    return materia.corequisitos.every((co) => {
        if (listaContemNome(materiasTrancadas, co)) return false
        if (listaContemNome(materiasFeitas, co)) return true
        // Pares mútuos (Lógica↔Lab): concluir "juntos" estando disponíveis.
        if (
            corequisitoMutuo(materias, nome, co) &&
            listaContemNome(materiasDisponiveis, co)
        ) {
            return true
        }
        // Assimétrico no mesmo período (Circuitos→Fundamentos): disponível junto basta.
        const materiaCo = materias.find(
            (m) => normalizeNome(m.nome) === normalizeNome(co)
        )
        if (
            materiaCo &&
            String(materia.periodo ?? "") === String(materiaCo.periodo ?? "") &&
            listaContemNome(materiasDisponiveis, co)
        ) {
            return true
        }
        return false
    })
}

export function podeMarcarTrancar(
    nome: string,
    materiasTrancadasCascata: string[],
    materiasTrancadasInput: string[]
): boolean {
    if (listaContemNome(materiasTrancadasInput, nome)) return true
    return !estaBloqueadaPorDependenciaTrancada(nome, materiasTrancadasCascata)
}

export function podeMarcarConcluida(
    nome: string,
    materias: Materias[],
    materiasFeitas: string[],
    materiasTrancadasCascata: string[],
    materiasTrancadasInput: string[],
    isDisponivel: boolean,
    materiasDisponiveis: string[] = []
): boolean {
    // Permite desmarcar conclusão mesmo em cascata (ex.: Lógica feita, Lab trancado).
    if (listaContemNome(materiasFeitas, nome)) return true
    if (estaBloqueadaPorDependenciaTrancada(nome, materiasTrancadasCascata)) {
        return false
    }
    if (listaContemNome(materiasTrancadasInput, nome)) return true
    return (
        isDisponivel &&
        prerequisitosAtendidos(nome, materias, materiasFeitas) &&
        corequisitosAtendidosParaConcluir(
            nome,
            materias,
            materiasFeitas,
            materiasDisponiveis,
            materiasTrancadasInput
        )
    )
}
