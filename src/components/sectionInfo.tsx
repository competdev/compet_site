import styles from '../styles/SectionInfo.module.css';

export default function SectionInfo({ info }) {
  return (
    <div className={styles.info}>
      {info}
    </div>
  )
} 