import { findMateriasDependentes } from "./findMateriasDependentes"
import { Materias } from "./interfaces"
import { normalizeNome } from "./normalizeNome"

interface materiasAtrasadasRequest {
    materias: Materias[]
    anterior: string[],
    atual: string[]
}

interface Response {
    materiasFeitas: string[],
}

function listaContemNome(nomes: string[], nome: string): boolean {
    const chave = normalizeNome(nome)
    return nomes.some((n) => normalizeNome(n) === chave)
}

export function removeDiff({ materias, anterior, atual }: materiasAtrasadasRequest): Response {
    
    const ansSet: Set<string> = new Set();

    const stack: string[] = anterior.filter((materia) => !listaContemNome(atual, materia));

    const materiasRemovidas: string[] = [];

    while (stack.length > 0) {
        const curr = stack.pop() as string;

        const currChave = normalizeNome(curr)
        if (ansSet.has(currChave)) continue;
        ansSet.add(currChave);

        materiasRemovidas.push(curr);

        for (const u of findMateriasDependentes(materias, curr)) {
            if (listaContemNome(anterior, u)) {
                stack.push(u)
            }
        }
    }

    if (materiasRemovidas.length === 0) {
        return { materiasFeitas: anterior }
    }

    return {
        materiasFeitas: anterior.filter((m) => !listaContemNome(materiasRemovidas, m)),
    }
}
