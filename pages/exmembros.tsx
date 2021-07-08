import axios from 'axios';
import styles from '../styles/ExMembros.module.css'

export default function ExMembros({ dados }) {
  return (

    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <title>COMPET | Ex-membros</title>
      <div className={styles.mainHeader}>
        <div>
          <div> <h1 className={styles.title}> Ex-membros</h1> </div>
          <div> Imagem que ficara em baixo do titulo da pagina </div>
        </div>
        <div className={styles.legenda}> C</div>

      </div>

      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}> A </div>

        <div className={styles.membersArea}>
          {dados.map(data => (firstBlank_space = data.nome.indexOf(' '),
            lastBlank_space = data.nome.lastIndexOf(' '),
            data.email == "" ? data.email = '-' : data.email = data.email,
            data.linkedin == "" ? data.linkedin = '-' : data.linkedin = data.linkedin,
            data.membro_ativo == false ?

              <div className={styles.membersCard}>
                <div className={styles.areaPhoto}>
                  <div>
                    {data.scrum_master == false ? <></> :
                      <div className={styles.alignPhotoArea}>
                        <div className={styles.infoScrum}> </div>
                        <div className={styles.alignPhotoArea2}></div>
                      </div>
                    }
                    {data.intercambio == false ? <></> :
                      <div className={styles.infoIntercamb}> </div>
                    }
                  </div>
                  <div className={styles.infoPhoto}>F</div>
                </div>
                <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' + data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>
                <p className={styles.infoCompet}> COMPET <strong>{ }</strong></p>
              </div> : <></>

          ))}
        </div>
        <div className={styles.espHorizontRight}> B </div>
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
let firstBlank_space;
let lastBlank_space;