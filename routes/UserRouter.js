import express from "express"
import {registerUser, loginUser, confirmUser, olvidoPassword, comprobarToken, newPassword, perfil} from "../controller/UserController.js"
import checkAuth from "../middleware/checkAuth.js"

const UserRouter = express.Router()

UserRouter.post("/register", registerUser )
UserRouter.post("/login", loginUser)
UserRouter.get("/confirm/:token", confirmUser)
UserRouter.post("/olvido-password", olvidoPassword)
UserRouter.route("/olvido-password/:token").get(comprobarToken).post(newPassword)

UserRouter.get("/perfil", checkAuth, perfil)




export default UserRouter