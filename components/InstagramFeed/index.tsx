import Feed from "../Feed/Feedei"
import styles from "../../styles/IndexFeeds.module.css"

import SectionTitle from "../SectionTitle"

export default function igFeed() {
    const sectionTitle = "Instagram"
    return (
        <section id="Instagram-Feed">
            <SectionTitle title={sectionTitle} />
            <article className={styles.socialMediaContainer}>
                <Feed />
            </article>
        </section>
    )
}
