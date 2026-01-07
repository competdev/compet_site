import React from "react";
import Link from "next/link";
import styles from "./DescubraMais.module.css";
import SectionTitle from "../../SectionTitle";
import FeatureLink from "./FeatureLink";

interface Feature {
    title: string;
    description: string;
    link: string;
    icon: string;
}

const features: Feature[] = [
    {
        title: "Fala COMPET",
        description: "Podcast com discussões sobre tecnologia, carreira e inovação.",
        link: "#",
        icon: "🎙️"
    },
    {
        title: "COMPET Indica",
        description: "Recomendações de conteúdos, ferramentas e recursos úteis.",
        link: "#",
        icon: "⭐"
    },
    {
        title: "COMPET Divulga",
        description: "Divulgação de eventos, oportunidades e novidades do mundo tech.",
        link: "#",
        icon: "📢"
    },
    {
        title: "COMPET Explica",
        description: "Conteúdos educativos que explicam conceitos e tecnologias.",
        link: "#",
        icon: "📚"
    },
    {
        title: "COMPET Talks",
        description: "Palestras e apresentações sobre diversos temas da computação.",
        link: "#",
        icon: "💬"
    }
];

const DescubraMais: React.FC = () => {
    return (
        <section className={styles.descubraMais} id="descubra-mais">
            <SectionTitle title="Descubra mais" />
            <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                    <FeatureLink
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        link={feature.link}
                        icon={feature.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default DescubraMais;

