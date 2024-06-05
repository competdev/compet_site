import styles from "./CardMateria.module.css"

import { useState } from 'react'

interface ICardMateriaProps {
    nome: string
    periodo: string
    natureza: string
    tipo:string
}
export default function CardMateria({
    nome,
    periodo,
    natureza,
    tipo
    }: ICardMateriaProps){
    const cor = ["grey","green","blue","red"];
    const [opcao,setOpcao]=useState<number>();
    function mudaCor(){
        if(tipo=="fez"){
            setOpcao(1);
        }
        else if(tipo=="pretende"){
            setOpcao(2);
        }
        else if(tipo=="trancou"){
            setOpcao(3);
        }
        else{
            setOpcao(0);
        }
    }
    return (
        <div className={styles.cardMateria}
            onClick={mudaCor}
            style={{backgroundColor:cor[opcao]}}
        >
            <div>{nome}</div>
            <div>{periodo}</div>
            <div>{natureza}</div>
        </div>
    )
}