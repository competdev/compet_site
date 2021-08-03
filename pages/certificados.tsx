import axios from "axios";
import styles from "../styles/Certificados.module.css";
import Link from "next/link";
import Menu from './menu'

export default function Certificados({dados}) {

  return (
    <div className={styles.groupDiv}>
      <title>COMPET | Certificados</title>

{/* Bloco que contém o Menu da página ---> Ver constução no menu.tsx */}
      <Menu />

{/* Bloco que contém o Cabeçalho da página */}
      <div className = {styles.mainHeader}>
          <div><img src="https://i.ibb.co/GMSCqJP/title.png"/></div>
      </div>

      <div className={styles.bodyGroup}>
        <div className={styles.espHorizontLeft}></div>

        <div className={styles.certificadoArea}>
          {dados.map(certificado => (
              <div key = {certificado.id} className={styles.certificadoCard}>
                <div className={styles.areaPhoto}>

                  <div className={styles.infoPhoto}>
                    <div className={styles.container}>
                      {/*<img className = {styles.photo} src = {loadPhotos(certificado.compet_talks, certificado.compbio)} /> */} 
                     <img className = {styles.foto} src = "https://i.ibb.co/3swTqhQ/default-photo.webp" />
                    </div>

                  </div>    
                </div>
                  <div className = {styles.infoName}>
                <h1>TESTE</h1>
                </div>
              </div>
          ))}
        </div>
        <div className = {styles.espHorizontRight}></div>
      </div>
    </div>
  );
}

function loadPhotos(CompetTalks:boolean, CompBio:boolean) {
  if(CompetTalks){
    return "../styles/imgs/certificados/Compet_Talks.png"
  }else if(CompBio){
    return "../styles/imgs/certificados/CompBio.png"
  }else{
    return "../styles/imgs/certificados/Certificados_Padrao.png"
  }
}

Certificados.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/certificados");

  return { dados: response.data };
};

let firstBlank_space;
let lastBlank_space;
