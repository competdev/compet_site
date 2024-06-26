import React, { useState } from 'react'

import axios from "axios";
import { NEXT_URL } from "../../util/config";

import CardMateria from '../../components/CardMateria';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./materias.module.css"

Fluxo_materias.getInitialProps = async () => {
    const response = await axios.get(NEXT_URL + "/api/materias")
    return { dados: response.data }
}


export default function Fluxo_materias({ dados }) {
    const periodos = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const cor = ["", "#19dd3ac7", "#0042669a", "#ff0000c2", "#929292c2"];

    const vetInicialTipos = dados.map(dado => {
        if (dado.prerequisitos.length) { return (4) }
        return (0)
    }
    )
    const vetInicialHabilitado = vetInicialTipos.map(dado=>{
            if(dado==4){return("none")}
            return("")
        }
    )
    const [tipos, setTipos] = useState<number[]>(vetInicialTipos);
    const [habilitados, setHabilitados] = useState<string[]>(vetInicialHabilitado);
    let contador = -1;
    const [tentativa, setTentativa] = useState(0)
    const vetPrerequisitos = dados.map(
        dado=>{
            return dado.prerequisitos
        }
    )
    const materias = dados.map(
        dado=>{
            contador++
            return(
                {
                    pos:contador,
                    nome:dado.nome,
                    natureza:dado.natureza,
                    periodo:dado.periodo,
                    prerequisitos:vetPrerequisitos[contador],
                    tipo:tipos[contador],
                    habilitado:habilitados[contador]
                }
            )
        }
    )
    const [tipo,setTipo] = useState<number>(0)
    const [atualiza,setAtualiza] = useState<string>("a")
    React.useEffect(()=>{
        setTipos(tipos)
        setHabilitados(habilitados)
    },[habilitados,atualiza])
    function handleChange(event) {
        setTipo(event.target.value);
    }
    const [vetFeitas,setVetFeitas] = useState<String[]>([])
    const [fez,setFez] = useState<String>("a")
    React.useEffect(()=>{
        materias.forEach((materia)=>{
            let novosTipos = tipos
            let habilitado = "", temPrerequisito = false
            
            materia.prerequisitos.forEach((prerequisito)=>{
                if(vetFeitas.indexOf(prerequisito)==-1){
                    temPrerequisito = true
                }
            })
            if(temPrerequisito){
                habilitado = "none"
                novosTipos[materia.pos]=4
            }
            else{
                novosTipos[materia.pos]=novosTipos[materia.pos]==1?1:novosTipos[materia.pos]==2?2:novosTipos[materia.pos]==3?3:0;
            }
            setTipos(novosTipos)
            let novosHabilitados = habilitados
            novosHabilitados[materia.pos]=habilitado
            setHabilitados(novosHabilitados)
            if(atualiza=="a"){
                setAtualiza("b")
            }
            else{
                setAtualiza("a")
            }
        })
    },[fez])
    
    function fezMateria(nome: string, pos:number){
        
        let novasFeitas = vetFeitas
        if(tipo!=3){
            novasFeitas.push(nome)
        }
        else{
            let index = novasFeitas.indexOf(nome)
            if (index > -1) {
                novasFeitas.splice(index, 1);
            }
        }
        setVetFeitas(novasFeitas)
        if(fez=="a"){
            setFez("b")
        }
        else{
            setFez("a")
        }
    }


    /* MATÉRIAS E OPÇÕES */
    return (
        <section className={styles.fluxoMaterias}>
            <Header />
            <div className={styles.opcoes}>
                <label className="radioButtons">
                    <input
                        type="radio" className={styles.fez} name="etapa" value={1}
                        onChange={handleChange}
                    />
                    Concluída
                </label>
                <label>
                    <input
                        type="radio" className={styles.pretende} name="etapa" value={2}
                        onChange={handleChange}
                    />
                    Farei
                </label>
                <label>
                    <input
                        type="radio" className={styles.trancou} name="etapa" value={3}
                        onChange={handleChange}
                    />
                    Desejo trancar
                </label>
            </div>
            <div className={styles.divisoria} />

            <div className={styles.rolamento}>
                {/* MATÉRIAS OBRIGATÓRIAS */}
                <div className={styles.obrigatoriedade}>OBRIGATÓRIAS</div>
                {<div className={styles.materias}>
                    {periodos.map(periodo => {

                        return (
                            <div className={styles.colunaMateriasObrigatorias}>
                                <div className={styles.periodoMateria}>{periodo}º PERÍODO</div>
                                {materias.map(materia => {

                                    if (materia.natureza == "OB" && materia.periodo == periodo) {
                                        return (

                                            <div key={materia.nome} className={styles.cardMaterias}
                                                onClick={() => {
                                                    const novosTipos = tipos
                                                    novosTipos[materia.pos] = tipo
                                                    setTipos(novosTipos)
                                                    if (tipo == 1 || 2 || 3) {
                                                        fezMateria(materia.nome, materia.pos)
                                                    }
                                                }}

                                                style={
                                                    {
                                                        backgroundColor: cor[materia.tipo],
                                                        pointerEvents: materia.habilitado
                                                    }
                                                }

                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderWidth = "3px";
                                                    e.currentTarget.style.borderColor = cor[tipo];
                                                    e.currentTarget.style.pointerEvents = materia.habilitado;

                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderWidth = "1px";
                                                    e.currentTarget.style.borderColor = 'black';
                                                    e.currentTarget.style.pointerEvents = 'auto';
                                                }}
                                            >
                                                <div className={styles.nomeMateria}>{materia.nome}</div>
                                                {/* <div className={styles.periodoMateria}>Período: {materia.periodo}º</div>
                                                <div className={styles.naturezaMateria}>{materia.natureza}</div> */}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>}

                {/* MATÉRIAS OPTATIVAS */}
                <div className={styles.obrigatoriedade}>OPTATIVAS</div>
                {<div className={styles.materias}>
                    <div className={styles.espacamento} />
                    {periodos.map(periodo => {
                        return (
                            <div className={styles.colunaMateriasOptativas}>
                                {materias.map(materia => {
                                    if (materia.natureza != "OB" && materia.periodo == periodo) {
                                        return (
                                            <div key={materia.nome} className={styles.cardMaterias}
                                                onClick={() => {
                                                    const novosTipos = tipos
                                                    novosTipos[materia.pos] = tipo
                                                    setTipos(novosTipos)
                                                    if (tipo == 1 || 2 || 3) {
                                                        fezMateria(materia.nome, materia.pos)
                                                    }
                                                }}

                                                style={
                                                    {
                                                        backgroundColor: cor[materia.tipo],
                                                        pointerEvents: materia.habilitado
                                                    }
                                                }

                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderWidth = "3px";
                                                    e.currentTarget.style.borderColor = cor[tipo];
                                                    e.currentTarget.style.pointerEvents = materia.habilitado;

                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderWidth = "1px";
                                                    e.currentTarget.style.borderColor = 'black';
                                                    e.currentTarget.style.pointerEvents = 'auto';
                                                }}
                                            >
                                                <div className={styles.nomeMateria}>{materia.nome}</div>
                                                {/* <div className={styles.periodoMateria}>Período: {materia.periodo}º</div>
                                                <div className={styles.naturezaMateria}>{materia.natureza}</div> */}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>}

            </div>
            <Footer />
        </section>
    )
}