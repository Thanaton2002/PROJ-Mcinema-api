import express from "express"
import cors from "cors"
import error from "./middlewares/error.middleware.js"
import notFound from "./middlewares/notFound.middleware.js"
import authRouter from "./routes/auth.route.js"
import moviesRouter from "./routes/movies.route.js"
import theaterRouter from "./routes/theater.route.js"
import showtimeRouter from "./routes/showtimes.route.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))

app.use("/api/auth", authRouter)
app.use("/api/movies", moviesRouter)
app.use("/api/theaters", theaterRouter)
app.use("/api/showtimes", showtimeRouter)

app.use(error)
app.use(notFound)

export default app