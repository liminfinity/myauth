
import { Response, Request, NextFunction } from "express";
import { User } from "../types/userTypes";
import { ApiError } from "../errors/ApiError";
import { loginSchema, userSchema } from "../validation/userValidation";
import { authService } from "../services/authService";
import { AuthResponse } from "../types/responseTypes";
import { isEmpty } from "../utils/objectMethods";
import { config } from "dotenv";
config()
class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData = req.body;
            const {email, password} = await loginSchema.validate(loginData);
            const userAgent = req.get('user-agent') as string;
            const authResponse: AuthResponse = await authService.login(email, password, userAgent);
            res.cookie('refreshToken', authResponse.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({...authResponse, refreshToken: undefined});
        } catch (e) {
            next(e)
        }
    }
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            let user: User = req.body;
            const userAgent = req.get('user-agent') as string;
            if (isEmpty(user)) throw ApiError.BadRequest(`User hasn't been founded`);
            user = await userSchema.validate(user);
            const authResponse: AuthResponse = await authService.registration(user, userAgent);
            res.cookie('refreshToken', authResponse.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({...authResponse, refreshToken: undefined});  
        } catch(e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userAgent = req.get('user-agent') as string;
            const deleted_token = await authService.logout(refreshToken, userAgent)
            res.clearCookie('refreshToken');
            res.clearCookie('token');
            return res.status(200).json({deleted_token})
        } catch (e) {
            next(e)
        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (e) {
            next(e)
        }
    }
    async activationUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {activationId} = req.params;
            if (!activationId) throw ApiError.BadRequest(`Incorrect link`);
            const userId = await authService.activationUser(activationId);
            if (!userId) throw new Error(`Server error`);
            return res.redirect(process.env.CLIENT_URL as string);
        } catch (e) {
            next(e)
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userAgent = req.get('user-agent') as string;
            const authResponse: AuthResponse = await authService.refresh(refreshToken, userAgent);
            res.cookie('refreshToken', authResponse.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({...authResponse, refreshToken: undefined});  
        } catch (e) {
            next(e)
        }
    }
}

const authController = new AuthController();

export {authController}
