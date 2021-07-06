import axios from 'axios';
import styles from '../styles/ExMembros.module.css'

export default function ExMembros({dados}) {
    return (
      
      <div className={styles.groupDiv}>
          <title>COMPET | Ex-membros</title> 
          <main className={styles.main}>
          <h1 className={styles.title}> Ex-membros</h1>
          </main>
          {dados.map(data => ( data.email == "" ? data.email = '-' : 
            data.linkedin == "" ? data.linkedin = '-' : 
            data.data_inicio.lenght  ? data.data_inicio = '-' :  
            data.membro_ativo == false ?
            <div className={styles.membros}> 
            <p><strong>Nome: </strong> {data.nome} </p>
            <p><strong>Email: </strong> {data.email}</p>
            <p><strong>Linked-In: </strong> {data.linkedin}</p>
            <p><strong>Entrada: </strong> {data.data_inicio}</p>  
            <p><strong>Saída: </strong> {data.data_fim}</p>          
            </div> : <div></div>        
          ))}
      </div>
    )
  }



ExMembros.getInitialProps = async () => {
    const response = await axios.get (
      'http://localhost:3000/api/membros'
    );
    console.log(response);  
    return { dados: response.data }
  };


