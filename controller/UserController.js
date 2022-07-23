import User from "../models/User.js"
import genereteId from "../utils/genereteID.js"

const registerUser = async (req, res)=>{

    const {email} = req.body
    const existeEmail = await User.findOne({email:email})

    if(existeEmail){
        const error = new Error ("usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }
  
    try {
        const usuario = new User(req.body)
        usuario.token = genereteId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
        console.log(usuario)

    } catch (error) {
        console.log(`error:${error.message}`)
    }
}

const loginUser = async (req, res)=>{
    res.send("creando usuario")
}

const deleteUser = (req, res)=>{
    res.send("eliminando  usuario")
}

export  {registerUser, loginUser, deleteUser}