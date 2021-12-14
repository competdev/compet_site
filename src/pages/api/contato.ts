import nodemailer from "nodemailer"

export default async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        const { name, email, subject, message } = req.body

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            }
        })

        const info = await transporter.sendMail({
            from: `${name} <${email}>`,
            to: { process.env.EMAIL },
            subject: `Contato Compet Site - ${subject}`,
            text: `${message}`
        })
        console.log(info)
        return res.status(200).end()
    } catch (err) {
        console.log(`Error sending email: ${err}`)
        return res.status(500).end()
    }
}
