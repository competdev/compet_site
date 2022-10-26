import { TwitterTimelineEmbed } from "react-twitter-embed"
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle'

const TwitterFeed: React.FC = () => (
    <section id="Twitter-feed">
        <SectionTitle title={'Twitter'} />
        <article className={styles.socialMediaContainerTwitter}>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="compet_cefet"
            />
        </article>
    </section >
)
export default TwitterFeed
