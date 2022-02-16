import styles from './SectionTitle.module.css';

export default function SectionTitle({ title }) {
  return (
    <div className={styles.title}>
      {title}
    </div>
  )
} 
