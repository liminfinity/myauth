import { Router } from "express";
import { authController } from "../controllers/authController";

const authRouter = Router()

authRouter.post('/login', authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/signup', authController.registration)

authRouter.delete('/delete-account', authController.deleteAccount)

authRouter.get('/activation/:activationId', authController.activationUser)

authRouter.get('/refresh', authController.refresh)


export {authRouter}