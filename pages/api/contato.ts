import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        const { SENDER_EMAIL, SENDER_PASS, RECIPIENT_EMAIL } = process.env

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
            to: [RECIPIENT_EMAIL],
            subject: `[Contato COMPET Site] - ${subject}`,
            text: `${message}\n---\nEnviado por: ${name} <${email}>`,
        }

        await transporter.sendMail(mailOptions)
        return res.status(200).end()
    } catch (err) {
    console.error("Erro:", err)

    return res.status(500).json({
        message: err.message,
        code: err.code,
        response: err.response
    })
}
}
