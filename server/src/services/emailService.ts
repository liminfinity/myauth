import {createTransport, Transporter} from 'nodemailer'
import { config } from 'dotenv'
import {readFileSync} from 'fs'
import {render} from 'pug'
import {resolve} from 'path'
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
        const pugTemplate = readFileSync(resolve('src/email/activationLink.pug'), 'utf8');
        const htmlTemplate = render(pugTemplate, {
            title: 'Activate your account to verify your identity',
            link: activationLink,
            content: 'Activation link',
            filename: resolve('src/email/*')
        })
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation',
            text: '',
            html: htmlTemplate

        })
    }
    async sendCode(to: string, recoveryCode: string) {
        const pugTemplate = readFileSync(resolve('src/email/sendCode.pug'), 'utf8');
        const htmlTemplate = render(pugTemplate, {
            title: 'Password recovery code',
            code: recoveryCode,
            filename: resolve('src/email/*')
        })
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Send code',
            text: '',
            html: htmlTemplate,
        })
    }
}

const emailService = new EmailService();

export {emailService}