import styles from '../styles/PageHeader.module.css';

export default function PageHeader({ url, caption }) {
  return (
    <div className={styles.pageHeader}>
      <img src={url} alt="" />
    </div>
  )
}