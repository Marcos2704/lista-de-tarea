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
        const user = new User(req.body)
        user.token = genereteId()
        const storedUser = await user.save()
        res.json(storedUser)
        console.log(user)

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

const confirmUser = async(req, res)=>{
  const {token} = req.params
  const confirm = await User.findOne({token})
  if(!confirm){
    const  error = new Error ("Token no valido")
    return res.status(404).json({msg: error.message})
  }
  try {
    confirm.confirm = true,
    confirm.token = ""
    await confirm.save()
    res.json({msg: "Usuario confirmado correctamente"})
  } catch (error) {
    console.log(error)
  }
}

const olvidoPassword = async (req, res) =>{
    const {email} = req.body
    const user =  await User.findOne({email})
    if(!user){
        const error = new Error ("el usuario no existe")
        return res.status(405).json({msg: error.message})
    }
    try {
        user.token = genereteId()
        await user.save()
        res.json({msg:"Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }

}

const comprobarToken = async (req, res) =>{
    const {token} = req.params
    const tokenValido =  await User.findOne({token}) 

    if(!tokenValido){
        const error = new Error ("el token no es valido")
        return res.status(406).json({msg: error.message})
    }
    else{
        res.json({msg:"Token valido"})
    }
}

const newPassword = async (req, res) =>{
    const {token} = req.params
    const {password} = req.body

    const user =  await User.findOne({token}) 

    if(user){
        user.password = password
        user.token = ""
        await user.save()
        try {
            res.json({msg:"Usuario modificado correctamente"})
        } catch (error) {
            console.log(error)
        }

    }else{
        const error = new Error ("el token no es valido")
        return res.status(406).json({msg: error.message})
    }        
}

const perfil = async (req, res) =>{
    console.log("Desde perfil")
}


export  {
    registerUser, 
    loginUser, 
    confirmUser, 
    olvidoPassword, 
    comprobarToken, 
    newPassword,
    perfil
}