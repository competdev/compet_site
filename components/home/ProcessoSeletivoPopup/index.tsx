import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./ProcessoSeletivoPopup.module.css";




const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScDoT9MBjlEmEIt6rpi1ZJ4z6OgiXi8gVJRlxgdHm4lSzlGSg/viewform?usp=header";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "640px",
        width: "90%",
        maxHeight: "90vh",
        backgroundColor: "#0A2A3B",
        borderRadius: "20px",
        border: "none",
        padding: "0",
        overflow: "auto",
    },
    overlay: {
        zIndex: 1001,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
};

const ProcessoSeletivoPopup: React.FC = () => {
     const ativo = false; // Altere para `true` para ativar o banner e modal do processo seletivo
     if (!ativo) return null;
    const [isOpen, setIsOpen] = useState(false);

    // Abre o modal em toda visita à página inicial; o banner continua disponível para reabrir.
    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <>
            <section
                className={styles.banner}
                aria-label="Divulgação do processo seletivo COMPET"
            >
                <div className={styles.bannerMain}>
                    <span className={styles.badge}>Inscrições abertas</span>
                    <h2 className={styles.bannerTitle}>Processo seletivo COMPET</h2>
                    <p className={styles.bannerSubtitle}>
                        PET de Computação do CEFET-MG — inscreva-se pelo formulário e participe das
                        etapas do processo.
                    </p>
                    <button
                        type="button"
                        className={styles.openDetails}
                        onClick={() => setIsOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                    >
                        Ver informações completas
                    </button>
                </div>
                <div className={styles.bannerActions}>
                    <a
                        href={FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaBanner}
                    >
                        Inscreva-se já
                    </a>
                </div>
            </section>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Processo seletivo COMPET"
                aria={{ labelledby: "ps-modal-title" }}
            >
                <div className={styles.modalContent}>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={() => setIsOpen(false)}
                        aria-label="Fechar"
                    >
                        ×
                    </button>

                    <header className={styles.modalHeader}>
                        <h2 id="ps-modal-title" className={styles.modalTitle}>
                            O COMPET está com processo seletivo aberto!
                        </h2>
                        <p className={styles.modalLead}>
                            Quer desenvolver suas habilidades, participar de projetos incríveis e
                            ainda viver experiências únicas dentro e fora da faculdade? Então essa
                            é a sua oportunidade!
                        </p>
                    </header>

                    <div className={styles.modalBody}>
                        <p className={styles.paragraph}>
                            O COMPET é o PET de Computação do CEFET-MG, um grupo que funciona com
                            base na metodologia Scrum e promove ensino, pesquisa e extensão,
                            atuando em áreas como desenvolvimento, eventos, marketing e gestão.
                        </p>
                        <p className={styles.paragraph}>
                            E não precisa ser aluno de Engenharia de Computação para participar —
                            estudantes de outros cursos também podem se inscrever!
                        </p>
                        <p className={styles.paragraph}>
                            Após a inscrição pelo formulário, o processo terá duas etapas:
                        </p>
                        <ol className={styles.stepsList}>
                            <li>Dinâmica com os membros do COMPET</li>
                            <li>Entrevista com os tutores</li>
                        </ol>
                        <p className={styles.paragraph}>
                            Além de tudo isso, é uma excelente oportunidade de participar de um
                            projeto da faculdade e conquistar horas complementares.
                        </p>
                    </div>

                    <footer className={styles.modalFooter}>
                        <a
                            href={FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                            onClick={() => setIsOpen(false)}
                        >
                            Inscreva-se já
                        </a>
                    </footer>
                </div>
            </Modal>
        </>
    );
};

export default ProcessoSeletivoPopup;
