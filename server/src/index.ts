import dotenv from 'dotenv'
import express, { RequestHandler } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { mainRouter } from './routers/mainRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js'
dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;
const HOST = process.env.SERVER_HOST || 'localhost';
const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use(cookieParser())
app.use(express.json())


app.use('/', mainRouter)
app.use(errorMiddleware);

app.listen(+PORT, HOST, () => {
    console.log(`server started on ${PORT} port and ${HOST} host`)
})





