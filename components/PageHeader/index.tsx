import styles from "./PageHeader.module.css";

export default function PageHeader({ url, caption, sortType = "name_asc", handleSelect = null }) {
  return (
    <>
      {caption === false ?
        <img src={url} className={styles.pageHeader} />
        :
        <div className={styles.pageHeader}>
          <img src={url} style={{ objectFit: 'cover' }} />
          <div className={styles.captions}>
            <div className={styles.alignCaption}>
              <div className={styles.infoScrum}></div>
              <div className={styles.captionText}>
                <strong>Scrum Master</strong>
              </div>
            </div>

            <div className={styles.alignCaption}>
              <div className={styles.infoIntercamb}></div>
              <div className={styles.captionText}>
                <strong>Intercâmbio</strong>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
