import React from "react";
import dynamic from "next/dynamic";
import styles from "./MediaSection.module.css";
import cardStyles from "../../../styles/MediaCard.module.css";
import NewsFeed from "../../NewsFeed";
import SectionTitle from "../../SectionTitle";

const SlideShow = dynamic(() => import("../../SlideShow"), {
    ssr: false,
    loading: () => (
        <>
            <SectionTitle title={"COMPET no YouTube"} />
            <div className={cardStyles.mediaCard}>
                <div className={cardStyles.mediaCardLoading}>Carregando...</div>
            </div>
        </>
    ),
});

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
                    <NewsFeed dados={newsData ?? []} />
                </div>
            </div>
        </section>
    );
};

export default MediaSection;
