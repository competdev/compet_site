import React from "react";
import styles from "./MediaSection.module.css";
import SlideShow from "../../SlideShow";
import NewsFeed from "../../NewsFeed";

interface MediaSectionProps {
    newsData: any;
}

const MediaSection: React.FC<MediaSectionProps> = ({ newsData }) => {
    return (
        <section className={styles.mediaSection} id="media-section">
            <div className={styles.mediaGrid}>
                <div className={styles.mediaCard}>
                    <SlideShow />
                </div>
                <div className={styles.mediaCard}>
                    <NewsFeed dados={newsData} />
                </div>
            </div>
        </section>
    );
};

export default MediaSection;

