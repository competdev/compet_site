/** Chave estável para comparar nomes de matérias (trim + NFC + hífens unificados). */
export function normalizeNome(nome: string): string {
    return nome
        .trim()
        .normalize("NFC")
        .replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
}
