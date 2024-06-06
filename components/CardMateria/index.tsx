import styles from "./CardMateria.module.css"

import { useState } from 'react'

interface ICardMateriaProps {
    props:{
        nome: string
        periodo: string
        natureza: string
    }
}
export default function CardMateria({props}: ICardMateriaProps){
    return (
        <div className={styles.cardMateria}>
            <div>{props.nome}</div>
            <div>{props.periodo}</div>
            <div>{props.natureza}</div>
        </div>
    )
}