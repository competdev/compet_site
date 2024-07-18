interface materiasAtrasadasRequest {
    ehPreRequisitoDe: { [key: string]: string[] },
    ehCorequisitoDe: { [key: string]: string[] },
    anterior: string[],
    atual: string[]
}

interface Response {
    materiasFeitas: string[],
}

export function removeDiff({ ehCorequisitoDe, ehPreRequisitoDe, anterior, atual }: materiasAtrasadasRequest): Response {
    
    const ansSet: Set<string> = new Set();

    const stack: string[] = anterior.filter(materia => !atual.includes(materia));

    const materiasRemovidas: string[] = [];

    while (stack.length > 0) {
        const curr = stack.pop() as string;

        if (ansSet.has(curr)) continue;
        ansSet.add(curr);

        materiasRemovidas.push(curr);

        if (ehPreRequisitoDe[curr]) {
            for (const u of ehPreRequisitoDe[curr]) {
                if (anterior.includes(u)) {
                    stack.push(u);
                }
            }
        }

        if (ehCorequisitoDe[curr]) {
            for (const u of ehCorequisitoDe[curr]) {
                if (anterior.includes(u)) {
                    stack.push(u);
                }
            }
        }
    }

    anterior = anterior.filter(m => !materiasRemovidas.includes(m));

    return { materiasFeitas: anterior };
}
