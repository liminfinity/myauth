import { Router } from "express";
import { authController } from "../controllers/authController";

const authRouter = Router()

authRouter.post('/login', authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/signup', authController.registration)

authRouter.get('/activation/:activationId', authController.activationUser)

authRouter.post('/forgot', authController.forgotPassword)

authRouter.get('/refresh', authController.refresh)


export {authRouter}