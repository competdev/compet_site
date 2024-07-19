import styles from "./CardMateria.module.css"
import { useState } from 'react'

interface ICardMateriaProps {
    nome: string
    periodo: string
    natureza: string
}

export default function CardMateria(props: ICardMateriaProps){
    const { nome, periodo, natureza } = props;
    
    return (
        <div className={styles.cardMateria}>
            <div>{nome}</div>
            <div>{periodo}</div>
            <div>{natureza}</div>
        </div>
    )
}