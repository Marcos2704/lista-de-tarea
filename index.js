import  express  from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import UserRouter from "./routes/UserRouter.js"

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

app.use("/api/user", UserRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT , () =>{
    console.log(`Servidor corriendo en ${PORT}`)
})

