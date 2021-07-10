import axios from 'axios';
import styles from '../styles/ExMembros.module.css'
import Link from 'next/link'

export default function ExMembros({ dados }) {
  return (

    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>


      <div className={styles.topMenu}>
        {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/menuLogo.png */}
        <div><Link href="http://google.com"><a>
          <img className={styles.menuLogo} src="https://i.ibb.co/DYw82J7/menuLogo.png" />
        </a></Link>
        </div>
        <div className={styles.groupPage}>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Certificados</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Blog</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Sobre nós</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Contato</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Equipe</a></Link></div>
          <div className={styles.singlePage}><Link href="http://google.com"><a>Ex-membros</a></Link></div>
        </div>



      </div>
      <div className={styles.mainHeader}>
        <div>
          {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/exmembros/title.png */}
          <div> <img src="https://i.ibb.co/GMSCqJP/title.png" /> </div>
        </div>
        <div className={styles.legendaSpace}>
          <div className={styles.alignLegend}>
            <div className={styles.infoScrum}></div>
            <div className={styles.scrumMasterStr}><strong>Scrum Master</strong></div>
          </div>
          <p></p>

          <div className={styles.alignLegend}>
            <div className={styles.infoIntercamb}></div>
            <div className={styles.intercambioStr}><strong>Intercâmbio</strong></div>
          </div>
        </div>

      </div>

      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>

        <div className={styles.membersArea}>
          {dados.map(data => (firstBlank_space = data.nome.indexOf(' '),
            lastBlank_space = data.nome.lastIndexOf(' '),
            data.email == "" ? data.email = '-' : data.email = data.email,
            data.linkedin == "" ? data.linkedin = '-' : data.linkedin = data.linkedin,
            data.membro_ativo == false ?

              <div className={styles.membersCard}>
                <div className={styles.areaPhoto}>

                  <div className={styles.infoPhoto}>
                    <div className={styles.container}>
                      <div>
                        {data.scrum_master == false ? <></> :
                          <div className={styles.alignPhotoArea}>
                            <div className={styles.infoScrum}></div>
                            <div className={styles.alignPhotoArea2}></div>
                          </div>
                        }
                        {data.intercambio == false ? <></> :
                          <div className={styles.infoIntercamb}></div>
                        }
                      </div>
                      {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/exmembros/default-photo.webp */}
                      <div>
                        {/* 
                        {data.photo == "" ? <img className={styles.foto} src="https://i.ibb.co/3swTqhQ/default-photo.webp" />
                          : <img className={styles.foto} src={data.photo} />}
                       */}
                        <img className={styles.foto} src="https://i.ibb.co/3swTqhQ/default-photo.webp" />
                      </div>
                    </div>

                  </div>
                </div>
                <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' +
                  data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>


                <div className={styles.infoCompet}>
                  {data.data_fim.split("-")[0] != data.data_inicio.split("-")[0] ?
                    <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} - {data.data_fim.split("-")[0]} </strong> </div> :
                    <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div>}
                </div>


              </div> : <></>

          ))}
        </div>
        <div className={styles.espHorizontRight}> </div>
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