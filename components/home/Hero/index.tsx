import React from "react";
import Link from "next/link";
import OptimizedImage from "../../OptimizedImage";
import { IMAGE_ASSETS } from "../../../util/imageAssets";
import styles from "./Hero.module.css";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>O que é o COMPET?</h1>
                    <p className={styles.heroDescription}>
                        O PET da Engenharia de Computação do CEFET-MG, COMPET, tem como objetivo
                        disseminar informação técnica, construir soluções envolvendo tecnologias
                        computacionais, organizar eventos de cunho tecnológico, estimular a execução
                        de trabalhos científicos na área, engajar os alunos da instituição nos
                        respectivos cursos e realizar atividades sociais.
                    </p>
                    <Link href="/sobre" className={styles.heroButton} prefetch={false}>
                        Saiba mais
                    </Link>
                </div>
                <div className={styles.heroIllustration}>
                    <div className={styles.illustrationContainer}>
                        <OptimizedImage
                            src={IMAGE_ASSETS.logoCompet}
                            alt="Logo COMPET"
                            className={styles.illustrationImage}
                            width={650}
                            height={650}
                            sizes="(max-width: 768px) 300px, 325px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
