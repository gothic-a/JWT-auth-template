import nodemailer from 'nodemailer'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activate your account`,
            text: '',
            html: 
                `
                    <div>
                        <h4>Follow the link for activate your account</h4>
                        <a href=${link}>${link}</a>
                    </div>
                `
        })
    }
}

export default MailService