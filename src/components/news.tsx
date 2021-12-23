import SectionTitle from '../components/sectionTitle'
import styles from '../styles/SocialMedia.module.css'

export default function News({ dados }) {
  const sectionTitle = "COMPET nas mídias"
  function convertDate(stringDate) {
    const date = new Date(stringDate)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    const formatted = `${day}/${month}`
    return formatted
  }

  return (
    <div>
      <SectionTitle title={sectionTitle} />
      <div className={styles.socialMediaContainer}>
        <a target="_blank" href={dados.dados[0].link}>
          <div className={styles.newsContainer}>
            <div className={styles.tituloNews}>
              {dados.dados[0].titulo}
            </div>
            <div className={styles.dataNews}>
              {convertDate(dados.dados[0].data)}
            </div>
          </div>
        </a>
        <a target="_blank" href={dados.dados[1].link}>
          <div className={styles.newsContainer}>
            <div className={styles.tituloNews}>
              {dados.dados[1].titulo}
            </div>
            <div className={styles.dataNews}>
              {convertDate(dados.dados[1].data)}
            </div>
          </div>
        </a>
        <a target="_blank" href={dados.dados[2].link}>
          <div className={styles.newsContainer}>
            <div className={styles.tituloNews}>
              {dados.dados[2].titulo}
            </div>
            <div className={styles.dataNews}>
              {convertDate(dados.dados[2].data)}
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}