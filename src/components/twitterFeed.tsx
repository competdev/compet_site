import { TwitterTimelineEmbed } from "react-twitter-embed"
import SectionTitle from '../components/sectionTitle'

const TwitterFeed: React.FC = () => (
    <div>
        <SectionTitle title={'Twitter'} />
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="compet_cefet"
            noHeader
            noFooter
            options={{ width: 420, height: 480 }}
        />
    </div>
)

export default TwitterFeed
