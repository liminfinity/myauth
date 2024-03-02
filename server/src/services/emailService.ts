import {createTransport, Transporter} from 'nodemailer'
import { config } from 'dotenv'
config()
class EmailService {
    private transporter: Transporter
    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, activationLink: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation',
            text: '',
            html: 
                `
                    <main>
                        <h2>Activate your account to verify your identity</h2>
                        <a href='${activationLink}'>Activation link</a>
                    </main>
                `

        })
    }
}

const emailService = new EmailService();

export {emailService}