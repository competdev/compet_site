import { ChangeEventHandler } from "react";
import styles from "./PageHeader.module.css";
interface IPageHeaderProps{
  url:string;
  caption:boolean;
  sortType?:"name_asc"|"name_desc"|"date_asc"|"date_desc";
  handleSelect?: ChangeEventHandler;
}
export default function PageHeader({ url, caption, sortType = "name_asc", handleSelect = null }:IPageHeaderProps) {
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
