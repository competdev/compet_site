/** Ordem de exibição das seções na página Equipe */
export const EQUIPE_ORDER = [
    "Administração",
    "Desenvolvimento",
    "Eventos",
    "Marketing",
] as const

export type EquipeNome = (typeof EQUIPE_ORDER)[number]

const NOME_CANONICO: Record<string, EquipeNome> = {
    administracao: "Administração",
    desenvolvimento: "Desenvolvimento",
    marketing: "Marketing",
    eventos: "Eventos",
}

/** Remove acentos para comparar nomes vindos do banco */
function semAcentos(s: string): string {
    return s
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

/**
 * Converte um trecho (string) do campo equipe para um dos quatro nomes canônicos ou null.
 */
export function normalizarNomeEquipe(raw: string): EquipeNome | null {
    if (!raw || typeof raw !== "string") return null
    const k = semAcentos(raw)
    return NOME_CANONICO[k] ?? null
}

/**
 * Aceita string (uma ou várias separadas por vírgula ou ponto e vírgula), ou array de strings.
 */
export function parseCampoEquipe(equipe: unknown): EquipeNome[] {
    if (equipe == null || equipe === "") return []

    if (Array.isArray(equipe)) {
        const out: EquipeNome[] = []
        for (const item of equipe) {
            const n = normalizarNomeEquipe(String(item))
            if (n) out.push(n)
        }
        return Array.from(new Set(out))
    }

    if (typeof equipe === "string") {
        const partes = equipe.split(/[,;]/).map(p => p.trim()).filter(Boolean)
        const out: EquipeNome[] = []
        for (const p of partes) {
            const n = normalizarNomeEquipe(p)
            if (n) out.push(n)
        }
        return Array.from(new Set(out))
    }

    return []
}

export type BucketsEquipe = Record<EquipeNome | "Outros", any[]>

/**
 * Agrupa membros (já filtrados como “membros comuns”) por equipe.
 * Quem tiver várias equipes no campo aparece em cada seção correspondente.
 * Sem equipe válida vai para "Outros".
 */
export function agruparMembrosPorEquipe(membros: any[]): BucketsEquipe {
    const buckets: BucketsEquipe = {
        Administração: [],
        Desenvolvimento: [],
        Marketing: [],
        Eventos: [],
        Outros: [],
    }

    for (const m of membros) {
        const equipes = parseCampoEquipe(m.equipe)
        if (equipes.length === 0) {
            buckets.Outros.push(m)
        } else {
            for (const eq of equipes) {
                buckets[eq].push(m)
            }
        }
    }

    return buckets
}

export function algumaSecaoTemMaisQue(buckets: BucketsEquipe, limite: number): boolean {
    const chaves: (EquipeNome | "Outros")[] = [...EQUIPE_ORDER, "Outros"]
    return chaves.some(k => buckets[k].length > limite)
}
