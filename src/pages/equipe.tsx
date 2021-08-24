import axios from 'axios';
import styles from '../styles/Equipe.module.css'
import Menu from '../components/menu'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '../components/footer'


export default function Equipe({ membros, sMaster, totalMembrosAtivos }) {
  const [membersPage, setMembersPage] = useState(8);
  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Membros atuais</title>
      <Menu />
      {renderCabecalho()}
      {renderScrumMaster(sMaster)}
      {renderMembros(membros, membersPage)}
      {membersPage < totalMembrosAtivos ?
        <div onClick={() => setMembersPage(membersPage + 8)} className={styles.loadMore}><strong>Ver mais<hr className={styles.line}></hr></strong></div>
        : <div onClick={() => setMembersPage(8)} className={styles.loadMore}><strong>Recolher<hr className={styles.lineRecolher}></hr></strong></div>
      }
      <Footer />
    </div>
  )
}

const renderCabecalho = () => {
  return (
    <div className={styles.mainHeader}>
      <div>
        {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/equipe/title.png */}
        <div> <img src="https://i.ibb.co/ZGZdZ9b/title.png" /> </div>
      </div>

      <div className={styles.subtitleSpace}>
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
  )
}

const renderCardScrum = (sMaster) => {
  return (
    <div className={styles.membersArea}>
      {sMaster.map(data => (firstBlank_space = data.nome.indexOf(' '),
        lastBlank_space = data.nome.lastIndexOf(' '),

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
                <div>
                  {data.url_imagem.length == 0 ? data.url_imagem = 'https://i.ibb.co/3swTqhQ/default-photo.webp' : <></>}
                  <img className={styles.foto} src={data.url_imagem} />
                </div>
              </div>

            </div>
          </div>
          <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' +
            data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>


          <div className={styles.infoCompet}>
            {data.data_fim.split("-")[0] != data.data_inicio.split("-")[0] ?
              <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div> :
              <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div>}
          </div>
          <div className={styles.networkGroup}>
            {data.email != "" ?
              <div>
                <Link href={'mailto:' + data.email}><a title='Email'>
                  <img className={styles.networkFavicon} src="https://i.ibb.co/YQ64dxd/mail-favicon.png" />
                </a></Link>
              </div>
              : <div className={styles.networkBlank}></div>}

            {data.lates != "" ?
              <div>
                <Link href={data.lates}><a title='Lattes'>
                  <div><img className={styles.networkFavicon} src="https://i.ibb.co/vqS8trk/lattes-favicon.png" /></div>
                </a></Link>
              </div>
              : <div className={styles.networkBlank}></div>}


            {data.linkedin != "" ?
              <div>
                <Link href={data.linkedin}><a title='LinkedIn'>
                  <div><img className={styles.networkFavicon} src="https://i.ibb.co/6DThdTt/linkedin-favicon.png" /></div>
                </a></Link>
              </div>
              : <div className={styles.networkBlank}></div>}
          </div>
        </div>

      ))}
    </div>
  )
}

const renderScrumMaster = (sMaster) => {
  return (
    <div>
      <div className={styles.titleBody}><strong> Scrum Master </strong></div>
      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>
        {renderCardScrum(sMaster)}
        <div className={styles.espHorizontRight}></div>
      </div>
    </div>
  )
}

const renderMembros = (membros, membersPage) => {
  return (
    <div>
      <div className={styles.titleBodyMembers}><strong> Membros </strong></div>
      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>

        <div className={styles.membersArea}>
          {membros.slice(0, membersPage).map(data => (firstBlank_space = data.nome.indexOf(' '),
            lastBlank_space = data.nome.lastIndexOf(' '),

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
                    <div>
                      {data.url_imagem.length == 0 ? data.url_imagem = 'https://i.ibb.co/3swTqhQ/default-photo.webp' : <></>}
                      <img className={styles.foto} src={data.url_imagem} />
                    </div>
                  </div>

                </div>
              </div>
              <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' +
                data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>


              <div className={styles.infoCompet}>
                {data.data_fim.split("-")[0] != data.data_inicio.split("-")[0] ?
                  <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div> :
                  <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div>}
              </div>
              <div className={styles.networkGroup}>
                {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/social_networks/mail-favicon.png */}
                {data.email != "" ?
                  <div>
                    <Link href={'mailto:' + data.email}><a title='Email'>
                      <img className={styles.networkFavicon} src="https://i.ibb.co/YQ64dxd/mail-favicon.png" />
                    </a></Link>
                  </div>
                  : <div></div>}

                {data.lates != "" ?
                  <div>
                    <Link href={data.lates}><a title='Lattes'>
                      <div><img className={styles.networkFavicon} src="https://i.ibb.co/vqS8trk/lattes-favicon.png" /></div>
                    </a></Link>
                  </div>
                  : <div></div>}

                {data.linkedin != "" ?
                  <div>
                    <Link href={data.linkedin}><a title='LinkedIn'>
                      <div><img className={styles.networkFavicon} src="https://i.ibb.co/6DThdTt/linkedin-favicon.png" /></div>
                    </a></Link>
                  </div>
                  : <div></div>}
              </div>
            </div>

          ))}
        </div>
        <div className={styles.espHorizontRight}></div>
      </div>
    </div>
  )
}



Equipe.getInitialProps = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/membros'
  );

  let membrosAtuais = [{}];
  let scrumMaster = [{}]

  let i = 0;
  let j = 0;
  for (var k in response.data) {
    if (response.data[k].membro_ativo == true && response.data[k].scrum_master == true) {
      scrumMaster[j] = response.data[k];
    }
    if (response.data[k].membro_ativo == true && response.data[k].scrum_master == false) {
      membrosAtuais[i] = response.data[k];
      i++;
    }
  }

  function byName(member1, member2) {
    if (member1.nome < member2.nome)
      return -1;
    if (member1.nome > member2.nome)
      return 1;
    return 0;
  }
  membrosAtuais.sort(byName)
  console.log(membrosAtuais)
  return { membros: membrosAtuais, sMaster: scrumMaster, totalMembrosAtivos: i }
};

let firstBlank_space;
let lastBlank_space;

