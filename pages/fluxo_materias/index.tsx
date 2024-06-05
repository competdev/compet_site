import { useState } from 'react'

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
    console.log(dados)
    const periodos = ["1","2","3","4","5","6","7","8","9","10"]
    const [tipo,setTipo] = useState<string>()
    function handleChange(event) {
        setTipo(event.target.value);
    };
    return (
        <section className={styles.fluxoMaterias}>
            <Header />
            <div className={styles.opcoes}>
                <label>
                    <input 
                    type="radio" className={styles.fez} name="etapa" value="fez"
                    onChange={handleChange}
                    />
                    fez
                </label>
                <label>
                    <input
                    type="radio" className={styles.pretende} name="etapa" value="pretende"
                    onChange={handleChange}
                    />
                    pretende
                </label>
                <label>
                    <input
                    type="radio" className={styles.trancou} name="etapa" value="trancou"
                    onChange={handleChange}
                    />
                    trancou
                </label>
            </div>
            <div className={styles.materias}>
                {periodos.map(periodo=>{
                    return(
                    <div className={styles.materiasColuna}>
                        {dados.map(data=>{
                            if(data.natureza=="OB" && data.periodo==periodo){
                                return(
                                    <CardMateria 
                                        nome={data.nome}
                                        periodo={data.periodo}
                                        natureza={data.natureza}
                                        tipo={tipo}
                                    />
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
                        {dados.map(data=>{
                            if(data.natureza!="OB" && data.periodo==periodo){
                                return(
                                    <CardMateria 
                                        nome={data.nome}
                                        periodo={data.periodo}
                                        natureza={data.natureza}
                                        tipo={tipo}
                                    />
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