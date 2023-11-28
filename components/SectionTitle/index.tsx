import styles from "./SectionTitle.module.css"

export default function SectionTitle({ title }) {
    return (
        <header className={styles.title}>
            <h3>{title}</h3>
        </header>
    )
}
