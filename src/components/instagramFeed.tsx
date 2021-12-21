import Feed from "instagram-feed-embed";
import { useState } from 'react';
import SectionTitle from '../components/sectionTitle';
import styles from '../styles/InstagramFeed.module.css'
import wSize from '../util/windowSize';

export default function igFeed() {
  const sectionTitle = "Instagram"
  return (
    <div>
      <SectionTitle title={sectionTitle} />
      <div className={styles.instagramContainer}>
        <Feed
          userName="compet.cefet"
          limit={5}
          width="480"
          maxContainerHeight="420"
        />
      </div>
    </div>
  )
}
