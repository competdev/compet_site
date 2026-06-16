import nodemailer from "nodemailer"

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" })
    }

    try {
        const { name, email, subject, message } = req.body
        const { SENDER_EMAIL, SENDER_PASS, RECIPIENT_EMAIL } = process.env

        console.log("EMAIL:", SENDER_EMAIL)
        console.log("PASS EXISTS:", !!SENDER_PASS)
        console.log("RECIPIENT:", RECIPIENT_EMAIL)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASS,
            },
        })

        const mailOptions = {
            from: `${name} <${SENDER_EMAIL}>`,
            to: RECIPIENT_EMAIL,
            subject: `[Contato COMPET Site] - ${subject}`,
            text: `${message}\n---\nEnviado por: ${name} <${email}>`,
        }

        const info = await transporter.sendMail(mailOptions)

        console.log("EMAIL ENVIADO:", info)

        return res.status(200).json({
            success: true,
            message: "Email enviado com sucesso",
        })
    } catch (err) {
        console.error("ERRO COMPLETO:")
        console.error(err)
        console.error(err.stack)

        return res.status(500).json({
            success: false,
            message: err.message,
            code: err.code,
            response: err.response,
        })
    }
}