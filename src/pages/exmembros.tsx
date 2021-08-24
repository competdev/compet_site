import axios from 'axios';
import styles from '../styles/ExMembros.module.css'
import { withStyles } from '@material-ui/core/styles';
import Menu from '../components/menu'
import Footer from '../components/footer'
import { useState } from 'react'
import { Tooltip } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

export default function ExMembros({ dados, totalExMembros }) {
  let [membersPage, setMembersPage] = useState(8);

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Ex-membros</title>
      <Menu />
      {renderCabecalho()}
      {renderBodyPage(dados, membersPage)}
      {renderVerMais(membersPage, setMembersPage, totalExMembros)}
      <Footer />
    </div >
  )
}

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#004266",
    borderRadius: "20px",
    padding: "25px",
    color: "#fdfdfd",
    maxWidth: 500,
    fontFamily: "Verdana",
    fontSize: 15,
    textAlign: "justify"
  },
  arrow: {
    fontSize: 25,
    width: 25,
    "&::before": {
      backgroundColor: "#004266",
      boxSizing: "border-box"
    }
  }
}))(Tooltip);

const renderCabecalho = () => {
  return (
    <div>
      <div className={styles.mainHeader}>
        <div>
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
    </div>
  )
}

const renderMemberArea = (dados, membersPage) => {
  let key;
  let firstBlank_space;
  let lastBlank_space;
  return (
    <div>
      {dados.slice(0, membersPage).map(data => (firstBlank_space = data.nome.indexOf(' '),
        lastBlank_space = data.nome.lastIndexOf(' '), key = data.id,

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

                <div>
                  {data.url_imagem.length == 0 ? data.url_imagem = 'https://i.ibb.co/3swTqhQ/default-photo.webp' : <></>}
                  {data.depoimentos.length != 0 ?
                    <LightTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 700 }} title={data.depoimentos} placement="top" arrow>
                      <img className={styles.foto} src={data.url_imagem} />
                    </LightTooltip>
                    :
                    <img className={styles.fotoSemDep} src={data.url_imagem} />
                  }
                </div>

              </div>


            </div>
          </div>
          <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' +
            data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>

          <div className={styles.infoCompet}>
            {data.data_fim.split("-")[0] != data.data_inicio.split("-")[0] ?
              <div> COMPET <strong className={styles.infoCompet}>{data.data_inicio.split("-")[0]} - {data.data_fim.split("-")[0]} </strong> </div> :
              <div> COMPET <strong className={styles.infoCompetNUM}>{data.data_inicio.split("-")[0]} </strong> </div>}
          </div>

        </div>

      ))}
    </div>
  )
}

const renderBodyPage = (dados, membersPage) => {
  return (
    <div>
      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>
        <div className={styles.membersArea}>
          {renderMemberArea(dados, membersPage)}
        </div>
        <div className={styles.espHorizontRight}></div>
      </div>

    </div>
  )
}

const renderVerMais = (membersPage, setMembersPage, totalExMembros) => {
  return (
    <div>
      {
        membersPage < totalExMembros ?
          <div className={styles.loadArea}>
            <div onClick={() => setMembersPage(membersPage + 8)}
              className={styles.loadMore}>
              <strong>Ver mais<hr className={styles.line}></hr></strong>
            </div>
          </div>
          : <div className={styles.loadArea}>
            <div onClick={() => setMembersPage(8)} className={styles.loadMore}>
              <strong>Recolher<hr className={styles.lineRecolher}></hr></strong>
            </div>
          </div>
      }
    </div>
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




