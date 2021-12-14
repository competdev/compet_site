import Feed from "instagram-feed-embed";
import SectionTitle from '../components/sectionTitle';
import styles from '../styles/InstagramFeed.module.css'

export default function igFeed() {
  const sectionTitle = "Instagram"
  return (
    <div>
      <SectionTitle title={sectionTitle} />
      <div className={styles.instagramContainer}>
        <Feed
          userName="compet.cefet"
          limit={5}
          width={420}
          maxContainerHeight={480}
        />
      </div>
    </div>
  )
}