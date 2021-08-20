import axios from 'axios';
import styles from '../styles/ExMembros.module.css'
import { withStyles } from '@material-ui/core/styles';
import Menu from '../components/menu'
import Footer from '../components/footer'
import { useState } from 'react'
import { Tooltip } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #2e2e2e',
    borderRadius: "18px",
    padding: "30px",
    margin: "50px 0",
    color: "rgb(0, 0, 0)",
    boxShadow: theme.shadows[1],
    maxWidth: 500,
    fontSize: 16,
    textAlign: "justify"
  },
  arrow: {
    fontSize: 25,
    width: 25,
    "&::before": {
      border: "1px solid #000",
      backgroundColor: "#fff",
      boxSizing: "border-box"
    }
  }
}))(Tooltip);



export default function ExMembros({ dados, totalExMembros }) {
  let [openModal, setOpenModal] = useState(false);
  let memberSelected;
  let [membersPage, setMembersPage] = useState(8);
  let key;

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <Menu />
      <div className={styles.mainHeader}>
        <div>
          {/* Adicionar o caminho relativo correto: ---->    ../styles/imgs/exmembros/title.png */}
          <div> <img src="https://i.ibb.co/GMSCqJP/title.png" /> </div>
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


      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>

        <div className={styles.membersArea}>
          {dados.slice(0, membersPage).map(data => (firstBlank_space = data.nome.indexOf(' '),
            lastBlank_space = data.nome.lastIndexOf(' '), key = data.id,
            <LightTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 1000 }} title={data.depoimentos} placement="top" arrow>
              <div className={styles.membersCard}>
                <div className={styles.areaPhoto}>
                  <div className={styles.infoPhoto}>
                    <div className={styles.container}>
                      <div>
                        {data.scrum_master == false ? <div></div> :
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

              </div>
            </LightTooltip>
          ))}
        </div>
        <div className={styles.espHorizontRight}></div>
      </div>
      {
        membersPage < totalExMembros ?
          <div onClick={() => setMembersPage(membersPage + 8)} className={styles.loadMore}><strong>Ver mais<hr className={styles.line}></hr></strong></div>
          : <div onClick={() => setMembersPage(8)} className={styles.loadMore}><strong>Recolher<hr className={styles.lineRecolher}></hr></strong></div>
      }
      <Footer />
    </div >
  )
}

ExMembros.getInitialProps = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/membros'
  );

  let exMembros = [{}];
  let i = 0;
  for (var k in response.data) {
    if (response.data[k].membro_ativo == false) {
      exMembros[i] = response.data[k];
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
  exMembros.sort(byName);
  console.log(exMembros)
  return { dados: exMembros, totalExMembros: i }
};

let firstBlank_space;
let lastBlank_space;


