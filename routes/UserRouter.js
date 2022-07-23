import express from "express"
import {registerUser, loginUser, deleteUser} from "../controller/UserController.js"

const UserRouter = express.Router()

UserRouter.post("/register", registerUser )

UserRouter.post("/login", loginUser)

UserRouter.put("/", deleteUser)


export default UserRouter