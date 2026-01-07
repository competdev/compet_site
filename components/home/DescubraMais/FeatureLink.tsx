import React from "react";
import Link from "next/link";
import styles from "./FeatureLink.module.css";

interface FeatureLinkProps {
    title: string;
    description: string;
    link: string;
    icon: string;
}

const FeatureLink: React.FC<FeatureLinkProps> = ({ title, description, link, icon }) => {
    return (
        <Link href={link} className={styles.featureLink}>
            <div className={styles.featureIcon}>{icon}</div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDescription}>{description}</p>
        </Link>
    );
};

export default FeatureLink;

