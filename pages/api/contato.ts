import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

export default async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        const { SENDER_EMAIL, SENDER_PASS, RECIPIENT_EMAIL } = process.env

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASS,
            }
        })

        const mailOptions = {
            from: `${name} <${SENDER_EMAIL}>`,
            to: [RECIPIENT_EMAIL],
            subject: `[Contato COMPET Site] - ${subject}`,
            text: `${message}\n---\nEnviado por: ${name} <${email}>`
        }

        await transporter.sendMail(mailOptions)
        return res.status(200).end()
    } catch (err) {
        console.log(`Error sending email: ${err}`)
        return res.status(500).end()
    }
}
