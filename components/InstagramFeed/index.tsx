import Feed from "instagram-feed-embed";
import styles from '../../styles/IndexFeeds.module.css'

import SectionTitle from '../SectionTitle';

export default function igFeed() {
  const sectionTitle = "Instagram"
  return (
    <div>
      <SectionTitle title={sectionTitle} />
      <div className={styles.socialMediaContainer}>
        <Feed
          userName="compet.cefet"
          limit={5}
          width="465"
          maxContainerHeight="480"
        />
      </div>
    </div>
  )
}
