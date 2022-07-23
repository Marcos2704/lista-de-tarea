import User from "../models/User.js"
import genereteId from "../utils/genereteID.js"
import genereteJWT from "../utils/genereteJWT.js"

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

const loginUser = async  (req, res)=>{
    const {email, password} = req.body
    const user =  await User.findOne({email})
    if(!user){
        const error = new Error ("el usuario no existe")
        return res.status(400).json({msg: error.message})
    }
    if(!user.confirm){
        const error = new Error ("Tu cuenta no ha sido confirmada")
        return res.status(402).json({msg: error.message})
    }

    if(await user.comprobarPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:genereteJWT(user._id)
        })
    }else{
        return res.status(403).json("El password es incorrecto")
    }
}

const deleteUser = (req, res)=>{
    res.send("eliminando  usuario")
}

export  {registerUser, loginUser, deleteUser}