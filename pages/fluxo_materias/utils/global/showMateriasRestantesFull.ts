import { Materias, Periodo } from "./interfaces"

export function showMateriasRestantesFull(materias: Materias[], materiasFeitas: string[]): Periodo[] {

    const retorno: Periodo[] = []

    for (let i = 0; i <= 10; i++) {

        const materiasPeriodo = materias.filter(materia => materia.periodo === i.toString())

        for (const materia of materiasPeriodo) {
            if (!materiasFeitas.find(materiaFeita => materiaFeita === materia.nome)) {

                const indexAlreadyAdded = retorno.findIndex(retorno => retorno.periodo === i.toString())

                if (indexAlreadyAdded === -1) {
                    if (materia.natureza === "OB")
                        retorno.push({ periodo: i.toString(), obrigatorias: [materia.nome], optativas: [] })
                    else
                        retorno.push({ periodo: i.toString(), obrigatorias: [], optativas: [materia.nome] })
                } else {
                    if (materia.natureza === "OB")
                        retorno[indexAlreadyAdded].obrigatorias.push(materia.nome)
                    else
                        retorno[indexAlreadyAdded].optativas.push(materia.nome)
                }
            }
        }
    }

    return retorno
}