export interface Materias {
    nome: string
    periodo: string | null
    natureza: string
    carga: number
    corequisitos: string[]
    prerequisitos: string[]
    codigo?: string
    ofertada?: boolean
    professores?: string[]
    semestreOferta?: string | null
    grade?: string
}

export interface Periodo {
    periodo: string,
    obrigatorias: string[],
    optativas: string[],
}
