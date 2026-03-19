import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./JunteSe.module.css";

const JUNTE_SE_ICONE_SRC = encodeURI("/junte-se a nós - icone.png");

interface Beneficio {
    text: string;
}

const beneficios: Beneficio[] = [
    { text: "100 horas de atividades" },
    { text: "Experiência sólida" },
    { text: "Pontos para intercâmbio" }
];

const JunteSe: React.FC = () => {
    return (
        <section className={styles.junteSe} id="junte-se">
            <div className={styles.junteSeContent}>
                <div className={styles.junteSeText}>
                    <h2 className={styles.junteSeTitle}>Junte-se a Nós</h2>
                    <p className={styles.junteSeSubtitle}>
                        Faça parte do COMPET e desenvolva suas habilidades enquanto contribui 
                        para a comunidade acadêmica e tecnológica.
                    </p>
                    <ul className={styles.beneficiosList}>
                        {beneficios.map((beneficio, index) => (
                            <li key={index} className={styles.beneficioItem}>
                                <span className={styles.checkIcon}>✓</span>
                                {beneficio.text}
                            </li>
                        ))}
                    </ul>
                    <Link href="/contato" className={styles.junteSeButton}>
                        Quero participar!
                    </Link>
                </div>
                <div className={styles.junteSeIllustration}>
                    <div className={styles.illustrationContainer}>
                        <div className={styles.illustrationPlaceholder}>
                            <Image
                                src={JUNTE_SE_ICONE_SRC}
                                alt="Junte-se ao COMPET"
                                width={400}
                                height={400}
                                className={styles.illustrationImage}
                                sizes="(max-width: 768px) 280px, 400px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JunteSe;

