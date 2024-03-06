import { Router } from "express";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";
import { forgotRouter } from "./forgotRouter";

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/forgot', forgotRouter)
mainRouter.use('/users', userRouter)

export {mainRouter}