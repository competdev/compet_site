import styles from './PageHeader.module.css';

export default function PageHeader({ url, caption }) {
  if (caption == false) {
    return (
      <div className={styles.pageHeader}>
        <img src={url} alt="" />
      </div>
    )
  } else {
    return (
      <div className={styles.pageHeader}>
        <img src={url} alt="" />
        <div className={styles.captions}>
          <div className={styles.alignCaption}>
            <div className={styles.infoScrum}></div>
            <div className={styles.captionText}><strong>Scrum Master</strong></div>
          </div>

          <div className={styles.alignCaption}>
            <div className={styles.infoIntercamb}></div>
            <div className={styles.captionText}><strong>Intercâmbio</strong></div>
          </div>
        </div>
      </div>
    )
  }
}
