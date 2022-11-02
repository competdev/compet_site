import { TwitterTimelineEmbed } from "react-twitter-embed"
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle'

const TwitterFeed: React.FC = () => (
    <section id="Twitter-feed">
        <SectionTitle title={'Twitter'} />
        <article className={styles.socialMediaContainer} >
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="compet_cefet"
                noHeader
                noFooter
                options={{ width: 480, height: 480 }}
                noScrollbar
            />
        </article>
    </section >
)
export default TwitterFeed
