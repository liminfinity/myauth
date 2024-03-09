import axios from "axios";
import { config } from "dotenv";
config()
class CaptchaService {
    async isValidCaptcha(captcha: string | null) {
        const res = await axios.post<{success: boolean}>(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.ReCAPTCHA_SECRET}&response=${captcha}`)
        console.log(res.data.success)
        return res.data.success
    }
}

const captchaService = new CaptchaService();

export {captchaService}