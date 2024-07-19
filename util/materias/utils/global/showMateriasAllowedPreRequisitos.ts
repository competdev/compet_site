import { Materias, Periodo } from "./interfaces"

interface ShowmateriasDisponivelsAgoraRequest {

    materiasFeitas: string[],
    materias: Materias[],
    materiasPorPeriodo: Periodo[]

}

export function showmateriasDisponivelsAgora({ materias, materiasFeitas, materiasPorPeriodo }: ShowmateriasDisponivelsAgoraRequest) {
    const materiasFeitasSet = new Set(materiasFeitas)
    const materiasQueAtendemPreRequisitos = new Set<string>()

    const retorno: Periodo[] = []

    for (const periodo of materiasPorPeriodo) {
        for (const materia of periodo.obrigatorias) {
            if (materiasFeitasSet.has(materia)) continue

            const materiaObj = materias.find(materiaObj => materiaObj.nome === materia) as Materias
            if (materiaObj.prerequisitos.length > 0) {
                let doneAll: boolean = true;
                for (const preRequisito of materiaObj.prerequisitos) {
                    if (!materiasFeitasSet.has(preRequisito)) {
                        doneAll = false;
                        break;
                    }
                }
                if (!doneAll) continue
            }

            materiasQueAtendemPreRequisitos.add(materia)

            const indexAlreadyAdded = retorno.findIndex(retorno => retorno.periodo === periodo.periodo)
            if (indexAlreadyAdded === -1)
                retorno.push({ periodo: periodo.periodo, obrigatorias: [materia], optativas: [] })
            else
                retorno[indexAlreadyAdded].obrigatorias.push(materia)
        }

        for (const materia of periodo.optativas) {
            if (materiasFeitasSet.has(materia)) continue

            const materiaObj = materias.find(materiaObj => materiaObj.nome === materia) as Materias

            if (materiaObj.prerequisitos.length > 0) {
                let doneAll: boolean = true;

                for (const preRequisito of materiaObj.prerequisitos) {
                    if (!materiasFeitasSet.has(preRequisito)) {
                        doneAll = false;
                        break;
                    }
                }
                if (!doneAll) continue
            }

            materiasQueAtendemPreRequisitos.add(materia)

            const indexAlreadyAdded = retorno.findIndex(retorno => retorno.periodo === periodo.periodo)

            if (materiaObj.natureza === "OB") {
                if (indexAlreadyAdded === -1)
                    retorno.push({ periodo: periodo.periodo, obrigatorias: [materia], optativas: [] })
                else
                    retorno[indexAlreadyAdded].obrigatorias.push(materia)
            } else {
                if (indexAlreadyAdded === -1)
                    retorno.push({ periodo: periodo.periodo, obrigatorias: [], optativas: [materia] })
                else
                    retorno[indexAlreadyAdded].optativas.push(materia)
            }
        }
    }

    // ate aqui todas as materias que atendem pre requisitos foram adicionadas

    const materiasVaiVem : Map<string, string[]> = new Map()

    const materiasQueAtendemPreRequisitosArray = Array.from(materiasQueAtendemPreRequisitos)

    for (const materia of materiasQueAtendemPreRequisitosArray) {
    
        const materiaObj = materias.find(materiaObj => materiaObj.nome === materia) as Materias
        if(materiaObj.corequisitos.length == 0) continue

        for (const corequisito of materiaObj.corequisitos) {
            if(materiasFeitasSet.has(corequisito)) continue

            if(materiasVaiVem.has(corequisito)) {
                materiasVaiVem.get(corequisito)?.push(materia)
            } else {
                materiasVaiVem.set(corequisito, [materia])
            }
        }
    }

    for(let i=0; i<=10; i++) {
        if(!retorno.find(a => { return a.periodo === `${i}`}))
            retorno.push(
                {
                    periodo: `${i}`,
                    obrigatorias: [],
                    optativas: [],
                })
    }

    retorno.sort((a, b) => {
        return parseInt(a.periodo) - parseInt(b.periodo);
    });
    

    // ate aqui todas as materias que atendem pre requisitos e corequisitos foram adicionadas

    return retorno
}