import axios from 'axios';
import styles from '../styles/ExMembros.module.css'

export default function ExMembros({ dados }) {
  return (

    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <h1 className={styles.title}> Ex-membros</h1>

      <div className={styles.bodyGroup}>
        <div className={styles.espHorizont}></div>
        <div className={styles.membersArea}>
          {dados.map(data => (data.email == "" ? data.email = '-' : data.email = data.email,
            data.linkedin == "" ? data.linkedin = '-' : data.linkedin = data.linkedin,
            data.membro_ativo == false ?

              <div className={styles.membersCard}>
                <div></div>
                <p className={styles.infoName}> <strong>{data.nome}</strong></p>
                <p className={styles.infoCompet}> COMPET <strong>{ }</strong></p>
              </div> : <></>

          ))}
        </div>
        <div className={styles.espHorizont}></div>
      </div>
    </div>
  )
}



ExMembros.getInitialProps = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/membros'
  );
  //console.log(response);
  return { dados: response.data }
};
