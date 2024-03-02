import { ApiError } from "../errors/ApiError";
import { NextFunction, Response } from "express";
import { tokenService } from "../services/tokenService";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers?.authorization;
        console.log(authHeader)
        if (!authHeader) return next(ApiError.UnauthorizedError());
        const accessToken = authHeader.split(' ')[1];
        const user = tokenService.verifyAccessToken(accessToken);
        if (!user) return next(ApiError.UnauthorizedError());
        return next();

    } catch (e) {
        return next(e);
    }
}