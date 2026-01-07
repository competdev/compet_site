import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const InterPetHero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <div className={styles.logoContainer}>
                    <Image
                        src="https://i.ibb.co/MhJkY7n/Logo-Interpet.png"
                        alt="Logo InterPET"
                        width={300}
                        height={300}
                        className={styles.logo}
                        priority
                    />
                </div>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>InterPET</h1>
                    <p className={styles.heroSubtitle}>
                        Encontro de Programas de Educação Tutorial do CEFET-MG
                    </p>
                    <p className={styles.heroDescription}>
                        Um evento realizado desde 2016 nos campus do CEFET-MG, com intuito
                        de discutir e propor mudanças para melhoria dos grupos PET do CEFET-MG,
                        contribuindo para intercâmbio de conhecimento entre os grupos, além de fomentar
                        a formação acadêmica dos petianos.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default InterPetHero;

