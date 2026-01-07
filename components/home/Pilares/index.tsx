import React from "react";
import styles from "./Pilares.module.css";
import SectionTitle from "../../SectionTitle";

interface Pilar {
    title: string;
    description: string;
    icon: string;
}

const pilares: Pilar[] = [
    {
        title: "Ensino",
        description: "Promovemos o ensino de qualidade através de atividades educacionais, workshops e capacitações que desenvolvem habilidades técnicas e acadêmicas dos estudantes de Engenharia de Computação.",
        icon: "📚"
    },
    {
        title: "Pesquisa",
        description: "Estimulamos a execução de trabalhos científicos e pesquisas na área de computação, contribuindo para o avanço do conhecimento e o desenvolvimento de soluções inovadoras.",
        icon: "🔬"
    },
    {
        title: "Extensão",
        description: "Realizamos atividades de extensão que conectam a universidade com a sociedade, organizando eventos tecnológicos e desenvolvendo projetos que beneficiam a comunidade.",
        icon: "🌐"
    }
];

const Pilares: React.FC = () => {
    return (
        <section className={styles.pilares} id="pilares">
            <SectionTitle title="Nossos Pilares" />
            <div className={styles.pilaresGrid}>
                {pilares.map((pilar, index) => (
                    <div key={index} className={styles.pilarCard}>
                        <div className={styles.pilarIcon}>{pilar.icon}</div>
                        <h3 className={styles.pilarTitle}>{pilar.title}</h3>
                        <p className={styles.pilarDescription}>{pilar.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pilares;

