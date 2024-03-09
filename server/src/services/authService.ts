import { User, UserActivationInfo } from "../types/userTypes";
import {v4 as uuid} from 'uuid'
import {hash} from 'bcrypt'
import { authDAL } from "../dal/authDAL";
import { tokenService } from "./tokenService";
import { UserDTO } from "../dto/userDTO";
import { emailService } from "./emailService";
import { AuthResponse, RegResponse } from "../types/responseTypes";
import { config } from "dotenv";
import { ApiError } from "../errors/ApiError";
import { captchaService } from "./captchaService";

config()

class AuthService {
    async login(email: string, password: string, userAgent: string, captcha: string | null): Promise<AuthResponse> {
        const success = await captchaService.isValidCaptcha(captcha);
        if (!success) throw new Error(`Captcha failed`)
        const isActivated = await authDAL.isActivated(email);
        if (!isActivated) throw ApiError.NotActivatedError();
        const user = await authDAL.login(email, password);
        if (!user) throw ApiError.BadRequest(`User hadn't founded`)
        const {accessToken, refreshToken} = tokenService.generateTokens(user)
        await authDAL.saveToken(user.userId, refreshToken, userAgent);

        return {user, accessToken, refreshToken}
    }  
    async registration(newUser: User, userAgent: string, captcha: string | null): Promise<RegResponse> {
        const success = await captchaService.isValidCaptcha(captcha);
        if (!success) throw new Error(`Captcha failed`)
        const hashPassword = await hash(newUser.password, 3);
        const user: User = {...newUser, password: hashPassword, userId: uuid()};
        const activationInfo: UserActivationInfo = {
            user,
            isActivated: false,
            activationId: uuid()
        }
        await authDAL.createUser(activationInfo);

        await emailService.sendActivationMail(user.email, 
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/activation/${activationInfo.activationId}`);

        const userDTO = new UserDTO(user);
        const {accessToken, refreshToken} = tokenService.generateTokens({...userDTO})
        await authDAL.saveToken(userDTO.userId, refreshToken, userAgent);
        return {email: userDTO.email, accessToken, refreshToken}

    }
    async logout(refreshToken: string, userAgent: string): Promise<string> {
        const deleted_token = await authDAL.logout(refreshToken, userAgent);
        if (!deleted_token) throw new Error(`Server error`);
        return deleted_token;
        
    }
    async activationUser(activationId: string) {
        const userId = await authDAL.activationUser(activationId);
        return userId
    }
    async refresh(refreshToken: string, userAgent: string): Promise<AuthResponse> {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const user = tokenService.verifyRefreshToken(refreshToken);
        const token = await authDAL.refresh(refreshToken, userAgent);

        if (!user || !token) throw ApiError.UnauthorizedError();
        const isActivated = await authDAL.isActivated(user.email);
        if (!isActivated) throw ApiError.NotActivatedError();
        const updatedUser = await authDAL.getUserById(user.userId);
        const {accessToken, refreshToken: newRefreshToken} = tokenService.generateTokens({...updatedUser})
        await authDAL.saveToken(updatedUser.userId, newRefreshToken, userAgent);
        return {user: {...updatedUser}, accessToken, refreshToken: newRefreshToken}
    }
    async deleteAccount(userId: string) {
        const deletedCount = await authDAL.deleteAccount(userId);
        if (!deletedCount) throw new Error(`User hadn't been deleted`)
        return true;
    }
}

const authService = new AuthService();

export {authService}