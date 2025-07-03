import express from "express"
import cors from "cors"
import error from "./middlewares/error.middleware.js"
import notFound from "./middlewares/notFound.middleware.js"
import authRouter from "./routes/auth.route.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))


app.use("/auth", authRouter)

app.use(error)
app.use(notFound)

export default app

