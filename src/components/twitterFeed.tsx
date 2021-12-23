import { TwitterTimelineEmbed } from "react-twitter-embed"
import SectionTitle from '../components/sectionTitle'
import styles from '../styles/SocialMedia.module.css'

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
