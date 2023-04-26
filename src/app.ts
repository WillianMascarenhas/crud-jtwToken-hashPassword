import "express-async-errors"
import express, { Application } from 'express'
import userRoutes from './routes/users.routes'
import { handleErrors } from './erros'
import loginRouter from "./routes/login.routes"

const app: Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRouter)

app.use(handleErrors)

export default app
