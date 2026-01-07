import React from "react";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import styles from "./AboutInterPet.module.css";

const AboutInterPet: React.FC = () => {
    return (
        <section className={styles.about}>
            <SectionTitle title="Sobre" />
            <div className={styles.aboutContent}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://i.ibb.co/fGszj1d/inter-Pet-sobre.jpg"
                        alt="InterPET"
                        fill
                        className={styles.aboutImage}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.textWrapper}>
                    <p className={styles.aboutText}>
                        O Interpet é um evento realizado desde 2016 nos campus do CEFET-MG, com intuito
                        de discutir e propor mudanças para melhoria dos grupos PET do CEFET-MG,
                        contribuindo para intercâmbio de conhecimento entre os grupos, além de fomentar
                        a formação acadêmica dos petianos.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutInterPet;
