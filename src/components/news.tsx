import SectionTitle from '../components/sectionTitle'
import styles from '../styles/SocialMedia.module.css'
import ReactPaginate from 'react-paginate';

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
        {dados.dados.map(dados => (
          <a target="_blank" href={dados.link}>
          <div className={styles.newsContainer}>
            <div className={styles.tituloNews}>
              {dados.titulo}
            </div>
            <div className={styles.dataNews}>
              {convertDate(dados.data)}
            </div>
          </div>
        </a>
        ))}
      </div>
    </div>
  )
}