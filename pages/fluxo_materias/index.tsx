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

export default function Fluxo_materias({dados}) {
    const periodos = ["1","2","3","4","5","6","7","8","9","10"]
    const cor = ["","green","blue","red","grey"];
    const vetInicialTipos = dados.map(dado=>{
            if(dado.prerequisitos.length){return(4)}
            return(0)
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
    const materias = dados.map(
        dado=>{
            contador++
            return(
                {
                    pos:contador,
                    nome:dado.nome,
                    natureza:dado.natureza,
                    periodo:dado.periodo,
                    prerequisitos:dado.prerequisitos,
                    tipo:tipos[contador],
                    habilitado:habilitados[contador]
                }
            )
        }
    )
    const [tipo,setTipo] = useState<number>(0)
    React.useEffect(()=>{
        setTipos(tipos)
        setHabilitados(habilitados)
    },[tentativa])
    function handleChange(event) {
        setTipo(event.target.value);
    }
    function mudarTipos(novosTipos:number[]){
        setTipos(novosTipos)
        if(tentativa==novosTipos[0]){
            setTentativa(10)
        }
        else{
            setTentativa(novosTipos[0])
        }
    }
    function mudarHabilitados(novosHabilitados:string[]){
        setHabilitados(novosHabilitados)
        if(tentativa==novosHabilitados[0].length){
            setTentativa(10)
        }
        else{
            setTentativa(novosHabilitados[0].length)
        }
    }
    function fezMateria(nome: string, pos:number){
        materias.forEach((materia) => {
            if(materia.prerequisitos.length){
                let index = materia.prerequisitos.indexOf(nome);
                if (index > -1) {
                    materia.prerequisitos.splice(index, 1);
                    fezMateria(nome,pos)
                }
            }
            else{
                const novosTipos = tipos
                novosTipos[materia.pos]=novosTipos[materia.pos]==1?1:0
                mudarTipos(novosTipos)
                const novosHabilitados = habilitados
                novosHabilitados[materia.pos]=""
                mudarHabilitados(novosHabilitados)
            }
        });
    }
    return (
        <section className={styles.fluxoMaterias}>
            <Header />
            <div className={styles.opcoes}>
                <label>
                    <input 
                    type="radio" className={styles.fez} name="etapa" value={1}
                    onChange={handleChange}
                    />
                    fez
                </label>
                <label>
                    <input
                    type="radio" className={styles.pretende} name="etapa" value={2}
                    onChange={handleChange}
                    />
                    pretende
                </label>
                <label>
                    <input
                    type="radio" className={styles.trancou} name="etapa" value={3}
                    onChange={handleChange}
                    />
                    trancou
                </label>
            </div>
            
            <div className={styles.materias}>
                {periodos.map(periodo=>{
                    return(
                    <div className={styles.materiasColuna}>
                        {materias.map(materia=>{
                            if(materia.natureza=="OB" && materia.periodo==periodo){
                                return(
                                    <div key={materia.nome}
                                        onClick={()=>{
                                            const novosTipos = tipos
                                            novosTipos[materia.pos]=tipo
                                            mudarTipos(novosTipos)
                                            if(tipo==1){
                                                fezMateria(materia.nome,materia.pos)
                                            }
                                        }}
                                    
                                        style={
                                            {
                                                backgroundColor:cor[materia.tipo],
                                                pointerEvents:materia.habilitado
                                            }
                                        }    
                                    >
                                        <CardMateria
                                            props={{
                                                nome:materia.nome,
                                                periodo:materia.periodo,
                                                natureza:materia.natureza,
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    )
                })}
            </div>

            <div className={styles.divisao} />

            <div className={styles.materias}>
                {periodos.map(periodo=>{
                    return(
                    <div className={styles.materiasColuna}>
                        {materias.map(materia=>{
                            if(materia.natureza!="OB" && materia.periodo==periodo){
                                return(
                                    <div key={materia.nome}
                                    onClick={()=>{
                                        let novosTipos = tipos
                                        novosTipos[materia.pos]=tipo
                                        setTipos(novosTipos)
                                    }}>
                                        <CardMateria key={materia.nome}
                                            props={{
                                                nome:materia.nome,
                                                periodo:materia.periodo,
                                                natureza:materia.natureza,
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    )
                })}
            </div>
            <Footer />
        </section>
    )
}