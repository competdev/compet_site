import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import Fade from '@mui/material/Fade';
import Link from 'next/link';
import React from 'react';
import styles from './MembersCard.module.css';

const LightTooltip = withStyles((_theme: any) => ({
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
  },
}))(Tooltip);


// Função principal exportando o html da pag.
export default function memberCard({ dados, membersPage, socialNetworks }) {

  let firstBlank_space;
  let lastBlank_space;

  return (
    <div className={styles.groupDiv}>
      {dados.slice(0, membersPage).map(data => (firstBlank_space = data.nome.indexOf(' '),
        lastBlank_space = data.nome.lastIndexOf(' '),
        <div className={styles.cardContent} key={data._id}>
          <div className={styles.membersCard}>
            <div className={styles.photoSpace}>
              {renderMemberPhoto(data, socialNetworks)}
            </div>
            {renderMemberName(data, firstBlank_space, lastBlank_space)}
            <div className={styles.infoCompet}>
              {renderInfoCompet(data, socialNetworks)}
            </div>
            {socialNetworks == true ?
              renderSocialNetworks(data) : <></>}
          </div>
        </div>
      ))}
    </div>
  )
}

const renderMemberPhoto = (data, socialNetworks) => {
  return (
    <div>
      {socialNetworks == true ?
        <div className={styles.container}>
          {renderContainerPhoto(data)}
        </div>
        :
        <div className={styles.containerExMembros}>
          {renderContainerPhoto(data)}
        </div>}
    </div>
  )
}

const renderContainerPhoto = (data) => {
  return (
    <>
      <div>
        {renderScrumIntercambio(data)}
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
    </>
  )
}

const renderScrumIntercambio = (data) => {
  return (
    <div>
      {data.scrum_master == false ? <></> :
        <div className={styles.alignPhotoArea}>
          <div className={styles.infoScrum}></div>
        </div>
      }
      {data.intercambio == false ? <></> :
        <div className={styles.infoIntercamb}></div>
      }
    </div>
  )
}

const renderMemberName = (data, firstBlank_space, lastBlank_space) => {
  return (
    <div>
      <p className={styles.infoName}> <strong>{data.nome.substring(0, firstBlank_space) + ' ' +
        data.nome.substring(lastBlank_space, data.nome.length)}</strong></p>
    </div>
  )
}

const renderInfoCompet = (data, socialNetworks) => {
  return (
    <div>
      {((data.data_fim.split("-")[0] != data.data_inicio.split("-")[0]) && (socialNetworks == false)) ?
        <div> COMPET <strong>{data.data_inicio.split("-")[0]} - {data.data_fim.split("-")[0]} </strong></div> :
        <div> COMPET <strong>{data.data_inicio.split("-")[0]} </strong></div>}
    </div>
  )
}

const renderSocialNetworks = (data) => {
  return (
    <div>
      <div className={styles.networkGroup}>
        {data.email != "" ?
          <div>
            <Link href={'mailto:' + data.email}title='Email'>
              <img className={styles.networkFavicon} src="https://i.ibb.co/5ckzrdq/mail-icon.png" />
            </Link>
          </div>
          : <></>}

        {data.lates != "" ?
          <div>
            <Link href={data.lates}title='Lattes'>
              <div><img className={styles.networkFavicon} src="https://i.ibb.co/r438RBd/lattes-icon.png" /></div>
            </Link>
          </div>
          : <></>}


        {data.linkedin != "" ?
          <div>
            <Link href={data.linkedin}title='LinkedIn'>
              <div><img className={styles.networkFavicon} src="https://i.ibb.co/cvRb3nZ/linkedin-icon.png" /></div>
            </Link>
          </div>
          : <></>}
      </div>
    </div>
  )
}