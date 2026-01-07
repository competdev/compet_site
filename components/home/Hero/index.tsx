import React from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>O que é o COMPET?</h1>
                    <p className={styles.heroDescription}>
                        O PET da Engenharia de Computação do CEFETMG, COMPET, tem como objetivo
                        disseminar informação técnica, construir soluções envolvendo tecnologias
                        computacionais, organizar eventos de cunho tecnológico, estimular a execução
                        de trabalhos científicos na área, engajar os alunos da instituição nos
                        respectivos cursos e realizar atividades sociais.
                    </p>
                    <Link href="/sobre" className={styles.heroButton}>
                        Saiba mais
                    </Link>
                </div>
                <div className={styles.heroIllustration}>
                    <div className={styles.illustrationContainer}>
                        <img 
                            src="https://i.ibb.co/PY1byp5/Logo-2021-Fundo-Branco-sem-texto.png" 
                            alt="Logo COMPET" 
                            className={styles.illustrationImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

