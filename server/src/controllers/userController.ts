import { Response, Request, NextFunction } from "express";
import { userService } from "../services/userService";

class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const {query} = req.query;
            const users = await userService.getUsers(refreshToken, query as string);
            return res.status(200).json({users});
        } catch (e) {
            next(e)
        }
    }

}

const userController = new UserController();

export {userController}