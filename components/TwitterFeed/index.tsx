import { TwitterTimelineEmbed } from "react-twitter-embed"
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle'

const TwitterFeed: React.FC = () => (
    <div>
        <SectionTitle title={'Twitter'} />
        <div className={styles.socialMediaContainer}>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="compet_cefet"
                noHeader
                noFooter
                options={{ width: 480, height: 480 }}
            />
        </div>
    </div >
)

export default TwitterFeed
