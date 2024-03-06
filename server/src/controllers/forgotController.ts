import { Response, Request, NextFunction } from "express";
import { userService } from "../services/userService";
import { emailSchema, passwordSchema, recoveryPasswordSchema } from "../validation/userValidation";
import { forgotService } from "../services/forgotService";
import { AuthResponse } from "../types/responseTypes";

class ForgotController {
    async checkEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = await emailSchema.validate(req.body);
            const userId = await forgotService.checkEmail(email);
            return res.status(200).json({userId})
        } catch (e) {
            next(e)
        }
    }
    async sendCode(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, recoveryCode} = req.body;
            const isExist = await forgotService.sendCode(email, recoveryCode);
            return res.status(200).json({isExist})
        } catch (e) {
            next(e)
        }
    }
    async restorePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {rememberMe} = req.cookies;
            const {email, password} = await recoveryPasswordSchema.validate(req.body);
            const userAgent = req.get('user-agent') as string;
            const authResponse: AuthResponse = await forgotService.restorePassword(email, password, userAgent);
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

const forgotController = new ForgotController();

export {forgotController}