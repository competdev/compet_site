import { TwitterTimelineEmbed } from "react-twitter-embed"
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle'

const TwitterFeed: React.FC = () => (
    <section id="Twitter-feed">
        <SectionTitle title={'Twitter'} />
        <article className={styles.socialMediaContainer}>
            <TwitterTimelineEmbed
                sourceType="timeline"
                id=""
                widgetId=""
            />
        </article>
    </section >
)
export default TwitterFeed
