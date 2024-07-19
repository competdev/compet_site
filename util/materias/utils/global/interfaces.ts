export interface Materias {
    nome: string
    periodo: string
    natureza: string
    corequisitos: string[]
    prerequisitos: string[]
}

export interface Periodo {
    periodo: string,
    obrigatorias: string[],
    optativas: string[],
}