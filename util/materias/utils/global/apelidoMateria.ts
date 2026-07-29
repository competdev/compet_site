import { normalizeNome } from "./normalizeNome"

function extrairSufixoRomano(nomeNorm: string): string {
    const match = nomeNorm.match(/\b(i{1,3}|iv|vi{0,3}|ix|x)\b\s*$/)
    if (!match) return ""
    return match[1].toUpperCase()
}

function ehLab(nomeNorm: string): boolean {
    return (
        nomeNorm.startsWith("laboratorio ") ||
        nomeNorm.startsWith("laboratorio de ") ||
        nomeNorm.includes(" laboratorio de ")
    )
}

/**
 * Apelidos curtos usados no curso (OFT, AEDs, AOC…).
 * Se não houver apelido conhecido, devolve o nome original.
 */
export function apelidoMateria(nome: string): string {
    const n = normalizeNome(nome)
    const lab = ehLab(n)
    const romano = extrairSufixoRomano(n)
    const sufixo = romano ? ` ${romano}` : ""

    // Física experimental / OFT / MOFT / EOFM
    if (n.includes("moft") || (n.includes("fisica experimental") && n.includes("moft"))) {
        return "MOFT"
    }
    if (n.includes("eofm") || (n.includes("fisica experimental") && n.includes("eofm"))) {
        return "EOFM"
    }
    if (
        n.includes("(oft)") ||
        (n.includes("oscilacoes") &&
            n.includes("fluidos") &&
            n.includes("termodinamica") &&
            !n.includes("experimental") &&
            !n.includes("mecanica"))
    ) {
        return "OFT"
    }

    if (n.includes("algoritmos e estruturas de dados")) {
        return lab ? `Lab AEDs${sufixo}` : `AEDs${sufixo}`
    }

    if (n.includes("arquitetura e organizacao de computadores")) {
        return lab ? `Lab AOC${sufixo}` : `AOC${sufixo}`
    }

    if (n.includes("geometria analitica") && n.includes("algebra linear")) {
        return "GAAL"
    }

    if (n.includes("programacao orientada a objetos")) {
        return lab ? "Lab POO" : "POO"
    }

    if (n.includes("sistemas digitais")) {
        return lab ? "Lab SD" : "SD"
    }

    if (n.includes("banco de dados")) {
        return lab ? `Lab BD${sufixo}` : `BD${sufixo}`
    }

    if (n.includes("engenharia de software")) {
        return lab
            ? `Lab Engenharia de Software${sufixo}`
            : `Engenharia de Software${sufixo}`
    }

    if (n.includes("redes de computadores")) {
        return lab ? `Lab Redes${sufixo}` : `Redes${sufixo}`
    }

    if (n.includes("calculo com funcoes de uma variavel")) {
        return "Cálculo I"
    }
    if (n.includes("calculo com funcoes de varias variaveis ii")) {
        return "CFVV2"
    }
    if (n.includes("calculo com funcoes de varias variaveis")) {
        return "CFVV1"
    }

    if (n.includes("equacoes diferenciais")) {
        return "EDO"
    }

    if (n.includes("logica de programacao")) {
        return lab ? "Lab Lógica" : "Lógica"
    }

    if (n.includes("sinais e sistemas")) {
        return lab ? "Lab Sinais" : "Sinais"
    }

    if (n.includes("sistemas operacionais")) {
        return "SO"
    }

    if (n.includes("linguagens formais")) {
        return "LFA"
    }

    if (n.includes("microcontroladores")) {
        return lab ? "Lab Micro" : "Micro"
    }

    if (n.includes("sistemas de controle")) {
        return lab ? "Lab Controle" : "Controle"
    }

    if (n.includes("eletronica para computacao")) {
        return lab ? "Lab Eletrônica" : "Eletrônica"
    }

    if (n.includes("interacao humano")) {
        return "IHC"
    }

    if (n.includes("inteligencia artificial")) {
        return "IA"
    }

    if (n.includes("aprendizado de maquina")) {
        return "AM"
    }

    if (n.includes("computacao grafica")) {
        return "CG"
    }

    if (n.includes("contexto social")) {
        return "Contexto Social"
    }

    if (n.includes("eletromagnetismo")) {
        return "Eletromagnetismo"
    }

    if (n.includes("metodos numericos")) {
        return "Métodos Numéricos"
    }

    if (n.includes("linguagens de programacao")) {
        return "LP"
    }

    if (n.includes("integracao e series")) {
        return "Integração e Séries"
    }

    if (n.includes("sistemas distribuidos")) {
        return "Sistemas Distrib."
    }

    return nome
}
