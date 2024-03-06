import { Router } from "express";
import { forgotController } from "../controllers/forgotController";


const forgotRouter = Router()

forgotRouter.post('/check-email', forgotController.checkEmail)
forgotRouter.post('/send-code', forgotController.sendCode)
forgotRouter.put('/restore-password',forgotController.restorePassword)

export {forgotRouter}