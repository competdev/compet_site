import { ChangeEventHandler } from "react";
import styles from "./PageHeader.module.css";
interface IPageHeaderProps{
  url: string;
  caption?: boolean;
  sortType?:"name_asc"|"name_desc"|"date_asc"|"date_desc";
  handleSelect?:ChangeEventHandler;
}
export default function PageHeader({ url, caption, sortType, handleSelect }:IPageHeaderProps) {
  if (caption == false) {
    return (
      <div className={styles.pageHeader}>
        <img src={url} alt="" />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.pageHeader}>
          <img src={url} alt="" />
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

        <div className={styles.alignSelect}>
          <select
            value={sortType}
            onChange={handleSelect}
            className={styles.select}
          >
            <option value="name_asc">Nome ascendente</option>
            <option value="name_desc">Nome descendente</option>
            <option value="date_asc">Data de saída ascendente</option>
            <option value="date_desc">Data de saída descendente</option>
          </select>
        </div>
      </>
    );
  }
}
