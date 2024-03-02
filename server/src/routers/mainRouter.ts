import { Router } from "express";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/users', userRouter)

export {mainRouter}