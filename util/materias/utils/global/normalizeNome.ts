/** Chave estável para comparar nomes (trim, hífens unificados, sem acentos, minúsculas). */
export function normalizeNome(nome: string): string {
    return nome
        .trim()
        .normalize("NFC")
        .replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
}