import styles from "./PageTitle.module.css"

interface PageTitleProps {
    title: string
}

/** Mesmo molde de `site_teste/components/PageLayout.tsx` */
export default function PageTitle({ title }: PageTitleProps) {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.lines} aria-hidden="true">
                <span className={styles.linePrimary} />
                <span className={styles.lineGreen} />
            </div>
        </div>
    )
}
