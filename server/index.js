import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import morgan from 'morgan'

import usersRouter from './routes/userRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(express.json())
app.use(cookieParser())
if(process.env.MODE === 'development') app.use(morgan('dev'))

app.get('/', (req, res) => res.send('MERN JWT auth template'))

app.use('/api/users', usersRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${PORT}`))