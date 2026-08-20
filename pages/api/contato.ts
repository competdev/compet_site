import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

type ContatoBody = {
    name?: string
    email?: string
    subject?: string
    message?: string
}

function trimEnv(value: string | undefined): string {
    return (value ?? "").trim().replace(/^["']|["']$/g, "")
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Método não permitido" })
    }

    const { name, email, subject, message } = req.body as ContatoBody

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Preencha nome, e-mail, assunto e mensagem.",
        })
    }

    if (!isValidEmail(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Informe um e-mail válido.",
        })
    }

    const senderEmail = trimEnv(process.env.SENDER_EMAIL)
    const senderPass = trimEnv(process.env.SENDER_PASS).replace(/\s/g, "")
    const recipientEmail = trimEnv(process.env.RECIPIENT_EMAIL)

    if (!senderEmail || !senderPass || !recipientEmail) {
        console.error("Contato: variáveis de ambiente ausentes (SENDER_EMAIL, SENDER_PASS ou RECIPIENT_EMAIL)")
        return res.status(500).json({
            success: false,
            message: "Serviço de e-mail indisponível no momento. Tente novamente mais tarde.",
        })
    }

    if (senderPass.replace(/\s/g, "").length !== 16) {
        console.warn(
            "Contato: SENDER_PASS não parece uma App Password do Google (esperado 16 caracteres).",
        )
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: senderEmail,
                pass: senderPass,
            },
        })

        await transporter.verify()

        const mailOptions = {
            from: `"Contato COMPET" <${senderEmail}>`,
            to: recipientEmail,
            replyTo: `"${name.trim()}" <${email.trim()}>`,
            subject: `[Contato COMPET Site] ${subject.trim()}`,
            text: `${message.trim()}\n\n---\nEnviado por: ${name.trim()} <${email.trim()}>`,
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({
            success: true,
            message: "E-mail enviado com sucesso.",
        })
    } catch (err: unknown) {
        const error = err as { code?: string; message?: string }
        console.error("Erro ao enviar e-mail de contato:", error.code, error.message)

        if (error.code === "EAUTH") {
            console.error(
                "Contato: credenciais Gmail inválidas. Gere uma App Password em https://myaccount.google.com/apppasswords e atualize SENDER_PASS.",
            )
        }

        return res.status(500).json({
            success: false,
            message:
                "Não foi possível enviar a mensagem agora. Tente novamente ou fale conosco pelas redes sociais abaixo.",
        })
    }
}
