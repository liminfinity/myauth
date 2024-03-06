import { hash } from "bcrypt";
import { authDAL } from "../dal/authDAL";
import { forgotDAL } from "../dal/forgotDAL";
import { AuthResponse } from "../types/responseTypes";
import { codeGenerator } from "../utils/generators";
import { emailService } from "./emailService";
import { ApiError } from "../errors/ApiError";
import { tokenService } from "./tokenService";



class ForgotService {
    async checkEmail(email: string) {
        const userId = await forgotDAL.checkEmail(email);
        if (!userId) throw new Error("Email isn't exist");
        const recoveryCode = codeGenerator();
        await forgotDAL.deleteCode(email);
        const isSaved = await forgotDAL.saveCode(email, recoveryCode)
        if (!isSaved) throw new Error("Recovery code hadn't been saved");
        await emailService.sendCode(email, recoveryCode);
        return userId;
    }
    async sendCode(email: string, recoveryCode: number) {
        const isExist = await forgotDAL.checkCode(email, recoveryCode);
        if (!isExist) throw new Error("Recovery code isn't exist");
        return isExist
    }
    async restorePassword(email: string, newPassword: string, userAgent: string) {
        const hashPassword = await hash(newPassword, 3);
        const password = await forgotDAL.restorePassword(email, hashPassword);
        await forgotDAL.deleteCode(email);
        await forgotDAL.deleteUserTokens(email);
        if (!password) throw new Error('Server error')

        const user = await authDAL.login(email, newPassword);
        if (!user) throw ApiError.BadRequest(`User hadn't founded`)
        const {accessToken, refreshToken} = tokenService.generateTokens(user)
        await authDAL.saveToken(user.userId, refreshToken, userAgent);

        return {user, accessToken, refreshToken}
    }
}

const forgotService = new ForgotService();

export {forgotService}