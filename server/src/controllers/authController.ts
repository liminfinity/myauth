
import { Response, Request, NextFunction } from "express";
import { User } from "../types/userTypes";
import { ApiError } from "../errors/ApiError";
import { loginSchema, userSchema } from "../validation/userValidation";
import { authService } from "../services/authService";
import { AuthResponse, RegResponse } from "../types/responseTypes";
import { isEmpty } from "../utils/objectMethods";
import { config } from "dotenv";
import { loginReuest, signUpReuest } from "../types/requestTypes";
config()
class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData: loginReuest = req.body;
            const {email, password, rememberMe, captcha} = await loginSchema.validate(loginData);
            const userAgent = req.get('user-agent') as string;
            const authResponse: AuthResponse = await authService.login(email, password, userAgent, captcha);
            res.clearCookie('refreshToken');
            if (rememberMe) {
                res.cookie('refreshToken', authResponse.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
            }
            res.cookie('rememberMe', rememberMe, {
                httpOnly: true
            })
            return res.status(200).json({...authResponse, refreshToken: undefined});
        } catch (e) {
            next(e)
        }
    }
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            let user: signUpReuest = req.body;
            const userAgent = req.get('user-agent') as string;
            if (isEmpty(user)) throw ApiError.BadRequest(`User hasn't been founded`);
            user = await userSchema.validate(user);
            const authResponse: RegResponse = await authService.registration({
                email: user.email,
                password: user.password,
                username: user.username}, 
            userAgent, user.captcha);
            res.clearCookie('refreshToken');
            if (user.rememberMe) {
                res.cookie('refreshToken', authResponse.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
            }
            res.cookie('rememberMe', user.rememberMe, {
                httpOnly: true
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
            res.clearCookie('rememberMe');
            return res.status(200).json({deleted_token})
        } catch (e) {
            next(e)
        }
    }
    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.query
            const isDeleted = await authService.deleteAccount(userId as string)
            return res.status(200).json({isDeleted})
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
            const {refreshToken, rememberMe} = req.cookies
            const userAgent = req.get('user-agent') as string;
            const authResponse: AuthResponse = await authService.refresh(refreshToken, userAgent);
            res.clearCookie('refreshToken');
            if (rememberMe) {
                res.cookie('refreshToken', authResponse.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
            }
            return res.status(200).json({...authResponse, refreshToken: undefined});  
        } catch (e) {
            next(e)
        }
    }
}

const authController = new AuthController();

export {authController}
