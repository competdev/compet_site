import React from "react";
import styles from "./Organizacao.module.css";
import SectionTitle from "../../SectionTitle";

interface Area {
    name: string;
    description: string;
    icon: string;
}

const areas: Area[] = [
    {
        name: "Desenvolvimento",
        description: "Responsável por criar e manter soluções tecnológicas, sistemas e aplicações que atendem às necessidades do grupo e da comunidade.",
        icon: "💻"
    },
    {
        name: "Administração",
        description: "Gerencia os recursos, processos internos e a organização geral do grupo, garantindo o funcionamento eficiente de todas as atividades.",
        icon: "📊"
    },
    {
        name: "Eventos",
        description: "Organiza e coordena eventos de cunho tecnológico, workshops, palestras e atividades que promovem o conhecimento e a integração.",
        icon: "🎯"
    },
    {
        name: "Marketing",
        description: "Cuida da comunicação, divulgação e presença digital do COMPET, mantendo a comunidade informada sobre nossas atividades e conquistas.",
        icon: "📢"
    }
];

const Organizacao: React.FC = () => {
    return (
        <section className={styles.organizacao} id="organizacao">
            <SectionTitle title="Nossa Organização" />
            <div className={styles.organizacaoContent}>
                <p className={styles.organizacaoText}>
                    A estrutura organizacional interna do COMPET funciona como se fosse uma empresa. 
                    Os tutores, que coordenam o grupo, atuam como chefes. Um dos COMPETianos é, por 
                    eleição, o Scrum Master que deve liderar todas as equipes, que são divididas em 
                    Desenvolvimento, Administração, Eventos e Marketing. Cada equipe é responsável 
                    por um conjunto de atividades da respectiva área. Semanalmente, há a reunião do 
                    grupo, momento em que as tarefas são assinaladas, discutidas e avaliadas.
                </p>
                <div className={styles.areasGrid}>
                    {areas.map((area, index) => (
                        <div key={index} className={styles.areaCard}>
                            <div className={styles.areaIcon}>{area.icon}</div>
                            <h4 className={styles.areaName}>{area.name}</h4>
                            <p className={styles.areaDescription}>{area.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Organizacao;

