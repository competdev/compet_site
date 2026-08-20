import dynamic from "next/dynamic"
import { useState } from "react"
import Modal from "react-modal"
import styles from "./Contato.module.css"
import Head from "next/head"

import Header from "../../components/Header"
import PageTitle from "../../components/PageTitle"
import SectionInfo from "../../components/SectionInfo"
import SocialMediasContact from "../../components/SocialMediasContact"
import Footer from "../../components/Footer"

const Map = dynamic(() => import("../../components/Map"), {
    ssr: false,
})

export default function Contato() {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function openModal(message: string) {
        setModalMessage(message)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "auto",
            minHeight: "100px",
            maxWidth: "min(90vw, 520px)",
            padding: "1.25rem 1.5rem",
            backgroundColor: "#004266",
            color: "#19DD39",
            fontSize: "20px",
            fontFamily: "Codec Pro Regular",
            borderRadius: "25px",
            backdropColor: "green",
            borderWidth: 0,
        },
        overlay: {
            zIndex: 1000,
            background: "#00426688",
        },
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting) return

        const form = e.currentTarget
        const formData = new FormData(form)
        const name = String(formData.get("name") ?? "").trim()
        const email = String(formData.get("email") ?? "").trim()
        const subject = String(formData.get("subject") ?? "").trim()
        const message = String(formData.get("message") ?? "").trim()

        if (!name || !email || !subject || !message) {
            openModal("Preencha todos os campos antes de enviar.")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                }),
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok) {
                throw new Error(data.message || "Erro ao enviar")
            }

            form.reset()
            openModal(data.message || "Mensagem enviada com sucesso.")
        } catch (error) {
            console.error("Erro ao enviar:", error)
            openModal(
                error instanceof Error
                    ? error.message
                    : "Falha ao enviar mensagem. Tente novamente.",
            )
        } finally {
            setIsSubmitting(false)
        }
    }
    const sectionTitle = "Contato"
    const sectionInfo =
        "Entre em contato com a equipe do COMPET através do formulário abaixo ou por meio de uma das redes sociais do grupo listadas logo abaixo. Tentaremos lhe retornar o mais breve possivel."

    return (
        <div className={styles.pageBody}>
            <Head>
                <title>COMPET | Contato</title>
            </Head>
            <Header />
            <PageTitle title={sectionTitle} />
            <SectionInfo info={sectionInfo} />
            <Modal isOpen={modalOpen} onRequestClose={closeModal} style={customStyles}>
                <p>{modalMessage}</p>
            </Modal>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        className={styles.text}
                        placeholder="Seu nome"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className={styles.text}
                        placeholder="Seu email"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        className={styles.text}
                        placeholder="Assunto"
                        required
                    />
                    <textarea
                        name="message"
                        className={styles.text}
                        placeholder="Sua mensagem..."
                        required
                    />
                    <div className={styles.submitArea}>
                        <input
                            type="submit"
                            name="submit"
                            className={styles.submit}
                            value={isSubmitting ? "Enviando..." : "Enviar "}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
                <div className={styles.mapContainer}>
                    <div className={styles.mapAdress}>
                        <strong>Sede do COMPET:</strong> Av. Amazonas 7675, Nova Gameleira. Belo
                        Horizonte
                    </div>
                    <div className={styles.map}>
                        <Map />
                    </div>
                </div>
            </div>
            <div className={styles.socialMediaArea}>
                <div className={styles.socialMediaLine1}>
                    <SocialMediasContact
                        media_type="facebook"
                        text="competcefetmg"
                        url="https://www.facebook.com/competcefetmg/"
                    />
                    <SocialMediasContact
                        media_type="instagram"
                        text="compet.cefet"
                        url="https://www.instagram.com/compet.cefet/"
                    />
                </div>
                <div className={styles.socialMediaLine2}>
                    <SocialMediasContact
                        media_type="twitter"
                        text="compet_cefet"
                        url="https://twitter.com/compet_cefet"
                    />
                    <SocialMediasContact
                        media_type="linkedin"
                        text="competcefetmg"
                        url="https://www.linkedin.com/in/competcefetmg/"
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}
