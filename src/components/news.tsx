import SectionTitle from '../components/sectionTitle';
import styles from '../styles/SocialMedia.module.css'

export default function news() {
    const sectionTitle = "COMPET nas mídias"
    return (
      <div>
        <SectionTitle title={sectionTitle} />
        <div className={styles.socialMediaContainer}>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                  Título da notícia
                </div>
                <div className = {styles.dataNews}>
                    01/01
                </div>
            </div>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                  Título da notícia
                </div>
                <div className = {styles.dataNews}>
                    01/01
                </div>
            </div>
            <div className={styles.newsContainer}>
                <div className =  {styles.tituloNews}>
                  Título da notícia
                </div>
                <div className = {styles.dataNews}>
                    01/01
                </div>
            </div>
        </div>
      </div>
    )
  }