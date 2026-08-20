import styles from "./MemberLegend.module.css"

export default function MemberLegend() {
    return (
        <div className={styles.legend} aria-label="Legenda dos membros">
            <span className={styles.legendItem}>
                <span className={styles.legendDotScrum} aria-hidden="true" />
                <strong>Scrum Master</strong>
            </span>
            <span className={styles.legendItem}>
                <span className={styles.legendDotIntercamb} aria-hidden="true" />
                <strong>Intercâmbio</strong>
            </span>
        </div>
    )
}
