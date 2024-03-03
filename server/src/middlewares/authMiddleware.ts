import { ApiError } from "../errors/ApiError";
import { NextFunction, Response } from "express";
import { tokenService } from "../services/tokenService";
import { authDAL } from "../dal/authDAL";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) return next(ApiError.UnauthorizedError());
        const accessToken = authHeader.split(' ')[1];
        const user = tokenService.verifyAccessToken(accessToken);
        if (!user) return next(ApiError.UnauthorizedError());
        const isActivate = authDAL.isActivated(user.email);
        if (!isActivate) return next(ApiError.NotActivatedError());
        return next();
    } catch (e) {
        return next(e);
    }
}