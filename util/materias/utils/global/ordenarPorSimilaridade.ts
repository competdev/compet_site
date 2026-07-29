import { Materias } from "./interfaces"
import { normalizeNome } from "./normalizeNome"

const STOPWORDS = new Set([
    "a", "o", "as", "os", "de", "da", "do", "das", "dos", "e", "em", "com",
    "para", "por", "na", "no", "nas", "nos", "um", "uma", "ao", "aos",
    "laboratorio", "lab", "introducao", "topicos", "especiais", "i", "ii",
    "iii", "iv", "v", "vi",
])

/** Famílias temáticas genéricas (radicais), não nomes de matérias. */
const AREAS: string[][] = [
    ["calculo", "geometria", "analitica", "algebra", "gaal", "equacao", "equacoes", "numerico", "numerica"],
    ["algoritmo", "algoritmos", "estrutura", "estruturas", "aed", "aeds"],
    ["programacao", "programa", "orientada", "objeto", "objetos", "software"],
    ["banco", "dados", "dado"],
    ["circuito", "circuitos", "digital", "digitais", "eletronica", "eletrica", "sinais", "sistemas"],
    ["fisica"],
    ["quimica"],
    ["rede", "redes", "computadores", "internet"],
    ["inteligencia", "artificial", "aprendizado", "machine", "visao", "computacional"],
    ["robotica", "controle", "automacao"],
    ["compiladore", "compiladores", "linguagem", "linguagens", "formais"],
    ["sistema", "operacional", "operacionais", "distribuido", "distribuidos"],
    ["engenharia", "requisito", "requisitos", "projeto", "qualidade"],
    ["estatistica", "probabilidade", "probabilidades"],
    ["etica", "sociedade", "humano", "social", "ambiental", "gestao", "pessoas"],
    ["libras"],
]

function tokensDeNome(nome: string): string[] {
    return normalizeNome(nome)
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length >= 2 && !STOPWORDS.has(t) && !/^\d+$/.test(t))
}

function areasDoNome(nome: string): Set<number> {
    const tokens = new Set(tokensDeNome(nome))
    const tokenList = Array.from(tokens)
    const areas = new Set<number>()
    AREAS.forEach((grupo, idx) => {
        if (
            grupo.some(
                (radical) =>
                    tokens.has(radical) ||
                    tokenList.some((t) => t.includes(radical) || radical.includes(t))
            )
        ) {
            areas.add(idx)
        }
    })
    return areas
}

function listaTemNome(lista: string[] | undefined, nome: string): boolean {
    const chave = normalizeNome(nome)
    return (lista ?? []).some((item) => normalizeNome(item) === chave)
}

/** Pontuação de similaridade entre duas matérias (maior = mais próximas). */
export function pontuacaoSimilaridade(a: Materias, b: Materias): number {
    if (normalizeNome(a.nome) === normalizeNome(b.nome)) return Number.POSITIVE_INFINITY

    let score = 0

    if (listaTemNome(a.corequisitos, b.nome) || listaTemNome(b.corequisitos, a.nome)) {
        score += 120
    }

    if (listaTemNome(a.prerequisitos, b.nome) || listaTemNome(b.prerequisitos, a.nome)) {
        score += 45
    }

    const ta = new Set(tokensDeNome(a.nome))
    const tb = new Set(tokensDeNome(b.nome))
    let inter = 0
    Array.from(ta).forEach((t) => {
        if (tb.has(t)) inter += 1
    })
    if (inter > 0) {
        const union = ta.size + tb.size - inter
        score += (inter / Math.max(union, 1)) * 80 + inter * 18
    }

    const areasA = areasDoNome(a.nome)
    const areasB = areasDoNome(b.nome)
    const temAreaEmComum = Array.from(areasA).some((area) => areasB.has(area))
    if (temAreaEmComum) {
        score += 35
    }

    return score
}

const LIMIAR_VIZINHO = 25

/**
 * Ordena matérias para que itens relacionados fiquem adjacentes
 * (corequisitos, nomes parecidos, mesma área temática).
 * Empate / sem relação: ordem alfabética pt-BR.
 */
export function ordenarPorSimilaridade(materias: Materias[]): Materias[] {
    if (materias.length <= 1) return [...materias]

    const restantes = [...materias].sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
    )
    const ordenadas: Materias[] = []

    while (restantes.length > 0) {
        if (ordenadas.length === 0) {
            ordenadas.push(restantes.shift()!)
            continue
        }

        const ancora = ordenadas[ordenadas.length - 1]
        let melhorIdx = 0
        let melhorScore = pontuacaoSimilaridade(ancora, restantes[0])

        for (let i = 1; i < restantes.length; i++) {
            const score = pontuacaoSimilaridade(ancora, restantes[i])
            if (
                score > melhorScore ||
                (score === melhorScore &&
                    restantes[i].nome.localeCompare(restantes[melhorIdx].nome, "pt-BR", {
                        sensitivity: "base",
                    }) < 0)
            ) {
                melhorScore = score
                melhorIdx = i
            }
        }

        if (melhorScore < LIMIAR_VIZINHO) {
            // Nova "ilha": pega a próxima em ordem alfabética e tenta puxar o cluster dela
            ordenadas.push(restantes.shift()!)
            continue
        }

        ordenadas.push(restantes.splice(melhorIdx, 1)[0])
    }

    return ordenadas
}

export function ordenarNomesPorSimilaridade(
    nomes: string[],
    materias: Materias[]
): string[] {
    const porNome = new Map(
        materias.map((m) => [normalizeNome(m.nome), m] as const)
    )
    const objs = nomes
        .map((nome) => porNome.get(normalizeNome(nome)))
        .filter((m): m is Materias => m != null)

    const ordenados = ordenarPorSimilaridade(objs)
    const usados = new Set(ordenados.map((m) => normalizeNome(m.nome)))
    const sobras = nomes.filter((n) => !usados.has(normalizeNome(n)))

    return [...ordenados.map((m) => m.nome), ...sobras]
}
