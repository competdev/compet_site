import axios from 'axios'
import SectionTitle from '../components/sectionTitle'
import styles from '../styles/SocialMedia.module.css'

{/*News.getInitialProps = async () => {
  const response = await axios.get("http://localhost:3000/api/news");
  return { dados: response.data }
}*/}

export default function News({dados}) {
    const sectionTitle = "COMPET nas mídias"
    console.log(dados[0]);
    return (
      <div>
        <SectionTitle title={sectionTitle} />
        <div className={styles.socialMediaContainer}>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                console.log(dados[0].titulo);
                </div>
                <div className = {styles.dataNews}>
                  console.log(dados[0].data);
                </div>
            </div>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                  dados[1].titulo;
                </div>
                <div className = {styles.dataNews}>
                    dados[1].data;
                </div>
            </div>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                  dados[2].titulo;
                </div>
                <div className = {styles.dataNews}>
                    dados[2].titulo;
                </div>
            </div>
        </div>
      </div>
    )
  }