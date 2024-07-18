import { Materias } from "./interfaces";

interface GerarEhPreCorequisitoRequest {
    materias: Materias[]
}

interface GerarEhPreCorequisitoResponse {
    ehPreRequisitoDe: { [key: string]: string[] };
    ehCorequisitoDe: { [key: string]: string[] };

}

export function gerarEhPreCorequisito({ materias }: GerarEhPreCorequisitoRequest): GerarEhPreCorequisitoResponse {
    const ehPreRequisitoDe: { [key: string]: string[] } = {};
    const ehCorequisitoDe: { [key: string]: string[] } = {};

    for (const materia of materias) {
        if (materia.prerequisitos.length > 0) {
            for (const pre of materia.prerequisitos) {
                if (!ehPreRequisitoDe[pre])
                    ehPreRequisitoDe[pre] = [];
                ehPreRequisitoDe[pre].push(materia.nome);
            }
        }

        if (materia.corequisitos.length > 0) {
            for (const co of materia.corequisitos) {
                if (!ehCorequisitoDe[co])
                    ehCorequisitoDe[co] = [];
                ehCorequisitoDe[co].push(materia.nome);
            }
        }
    }

    return { ehPreRequisitoDe, ehCorequisitoDe }
}