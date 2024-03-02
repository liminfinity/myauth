import { Response, Request, NextFunction } from "express";
import { userService } from "../services/userService";

class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({users});
        } catch (e) {
            next(e)
        }
    }

}

const userController = new UserController();

export {userController}