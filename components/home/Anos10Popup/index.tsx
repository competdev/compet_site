import React, { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import styles from "./Anos10Popup.module.css";

interface Milestone {
    number: string;
    label: string;
    icon: string;
}

const milestones: Milestone[] = [
    {
        number: "+100",
        label: "Projetos desenvolvidos",
        icon: "🚀"
    },
    {
        number: "+300",
        label: "Alunos impactados",
        icon: "👥"
    },
    {
        number: "3",
        label: "Pilares fundamentais",
        icon: "🎯"
    },
    {
        number: "10",
        label: "Anos de história",
        icon: "🎉"
    }
];

const Anos10Popup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "800px",
            width: "90%",
            maxHeight: "90vh",
            backgroundColor: "#0A2A3B",
            borderRadius: "20px",
            border: "none",
            padding: "0",
            overflow: "auto",
        },
        overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
    };

    return (
        <>
            <div className={styles.anos10Trigger} onClick={openModal}>
                <div className={styles.anos10TriggerContent}>
                    <img 
                        src="/icone_10anos.png" 
                        alt="10 anos COMPET" 
                        className={styles.anos10TriggerIcon}
                    />
                    <div className={styles.anos10TriggerText}>
                        <span className={styles.anos10TriggerTitle}>Celebrando 10 anos de COMPET!</span>
                        <span className={styles.anos10TriggerSubtitle}>
                            Uma década formando líderes, inovadores e profissionais
                        </span>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={isOpen} 
                onRequestClose={closeModal} 
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={closeModal} aria-label="Fechar">
                        ×
                    </button>
                    
                    <div className={styles.modalHeader}>
                        <div className={styles.modalIconContainer}>
                            <img 
                                src="/icone_10anos.png" 
                                alt="Ícone 10 anos COMPET" 
                                className={styles.modalIcon}
                            />
                        </div>
                        <h2 className={styles.modalTitle}>Celebrando 10 anos de COMPET</h2>
                        <p className={styles.modalSubtitle}>
                            Uma década formando líderes, inovadores e profissionais que transformam 
                            a Engenharia de Computação no CEFET-MG.
                        </p>
                    </div>

                    <div className={styles.modalBody}>
                        <p className={styles.modalParagraph}>
                            Ao longo de uma década, o COMPET tem sido fundamental na formação de 
                            estudantes de Engenharia de Computação, proporcionando experiências 
                            que vão além da sala de aula. Nossos 10 anos de história são marcados 
                            por conquistas significativas em ensino, pesquisa e extensão, criando 
                            uma comunidade sólida e um legado duradouro que continua a impactar 
                            positivamente a área de computação.
                        </p>

                        <div className={styles.milestonesGrid}>
                            {milestones.map((milestone, index) => (
                                <div key={index} className={styles.milestoneCard}>
                                    <div className={styles.milestoneIcon}>{milestone.icon}</div>
                                    <div className={styles.milestoneNumber}>{milestone.number}</div>
                                    <div className={styles.milestoneLabel}>{milestone.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <Link 
                            href="https://www.instagram.com/p/DRQG2cDEqqW/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                            onClick={closeModal}
                        >
                            Ver comemoração no Instagram
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Anos10Popup;

