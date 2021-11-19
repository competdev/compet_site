import axios from "axios";
import styles from "../styles/Certificados.module.css";
import Menu from '../components/menu'
import Footer from '../components/footer';

Certificados.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/certificados");
  return { dados: response.data }
}

function loadPhotos(CompetTalks: boolean, CompBio: boolean) {
  if (CompetTalks) {
    return "../styles/imgs/certificados/Compet_Talks.png"
  } else if (CompBio) {
    return "../styles/imgs/certificados/CompBio.png"
  } else {
    return "../styles/imgs/certificados/Certificados_Padrao.png"
  }
}

export default function Certificados({ dados }) {
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
    <div className={styles.certificadoArea}>
      
    </div>

  )
}





