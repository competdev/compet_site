import axios from "axios";
import styles from "../styles/Certificados.module.css";
import Menu from '../components/menu'
import Footer from '../components/footer';
import Link from 'next/link'
import { useState } from 'react'

Certificados.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/certificados");
  return { dados: response.data }
}

function loadPhotos(CompetTalks: boolean, CompBio: boolean) {
  if (CompetTalks) {
    return "https://i.ibb.co/ydS39Rr/Compet-Talks.png"
  } else if (CompBio) {
    return "https://i.ibb.co/Lv8x2kF/CompBio.png"
  } else {
    return "https://i.ibb.co/cFt0r4m/Certificados-Padrao.png"
  }
}

function convertDate(stringDate) {
  const date = new Date(stringDate)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const formatted = `${day}/${month}/${year}`
  return formatted
}

export default function Certificados({ dados }) {
  let [certificadosPag, setcertificadosPag] = useState(8);

  return (
    <div className={styles.pageContent}>
      <title>COMPET | Certificados</title>
      <Menu />
      {renderCabecalho()}
      {renderCertificados(dados)}
      <Footer />
    </div>
  );
}

const renderCabecalho = () => {
  return (
    <div className={styles.pageHeader}>
      <div><img src="https://i.ibb.co/tsD3xNg/certificados.png" /></div>
    </div>
  )
}

const renderCertificados = (dados) => {
  return (
    <div className={styles.certificadosArea}>
      <div className={styles.certificadosContainer}>
        {dados.map(certificado => (
          <div key={certificado._id} className={styles.certificadoCard}>
            <div ><img src={loadPhotos(certificado.compet_talks, certificado.compbio)} alt="" className={styles.certificadoImg} /></div>
            <div className={styles.certificadoTitulo}>{certificado.titulo}</div>
            <div className={styles.certificadoData}>{convertDate(certificado.data)}</div>
            <div className={styles.certificadoLink}><Link href={certificado.link}><a target="_blank">Acessar</a></Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}





