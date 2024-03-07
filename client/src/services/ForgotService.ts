import { $api } from "../http";
import { AuthResponse } from "../types/response";
import { AuthService } from "./AuthService";

export class ForgotService {
    static async generateNewCode(email: string) {
        return await ForgotService.checkEmail(email);
    }
    static async checkEmail(email: string) {
        const res = await $api.post<{userId: string}>('/forgot/check-email', {email});
        return res.data?.userId != undefined
    }
    static async sendCode(email: string, recoveryCode: string) {
        const res = await $api.post<{codeId: number}>('/forgot/send-code', {email, recoveryCode});
        return res.data?.codeId != undefined
    }
    static async restorePassword(email: string, password: string, confirmPassword: string) {
        const res = await $api.put<AuthResponse>('/forgot/restore-password', {email, password, confirmPassword});
        const user = await AuthService.getUser(res);
        return user;
    }
}