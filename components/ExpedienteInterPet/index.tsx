import React from "react";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import styles from "./ExpedienteInterPet.module.css";

const ExpedienteInterPet: React.FC = () => {
    return (
        <section className={styles.expediente}>
            <SectionTitle title="Expediente" />
            <div className={styles.expedienteContent}>
                <div className={styles.logoSection}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="https://i.ibb.co/MhJkY7n/Logo-Interpet.png"
                            alt="Logo InterPET"
                            width={200}
                            height={200}
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.editorChefe}>
                        <span className={styles.label}>Editor chefe</span>
                        <span className={styles.name}>Sandro Renato Dias</span>
                    </div>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoBlock}>
                        <h3 className={styles.blockTitle}>Conselho Editorial</h3>
                        <ul className={styles.personList}>
                            <li>Hermes Augusto Oliveira Rabelo</li>
                            <li>André Rodrigues da Cruz</li>
                            <li>Joana Ancila Pessoa Forte Avelino</li>
                            <li>Sandro Renato Dias</li>
                            <li>Mayk Jonhon de Carvalho Souza</li>
                        </ul>
                        <h3 className={styles.blockTitle}>Autor Corporativo</h3>
                        <ul className={styles.personList}>
                            <li>CEFET MG</li>
                        </ul>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3 className={styles.blockTitle}>Editor Adjunto</h3>
                        <ul className={styles.personList}>
                            <li>Joana Ancila Pessoa Forte Avelino</li>
                        </ul>
                        <h3 className={styles.blockTitle}>Diagramação</h3>
                        <ul className={styles.personList}>
                            <li>Joana Ancila Pessoa Forte Avelino</li>
                        </ul>
                        <h3 className={styles.blockTitle}>Periodicidade</h3>
                        <ul className={styles.personList}>
                            <li className={styles.periodicidade}>ANUAL</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpedienteInterPet;
