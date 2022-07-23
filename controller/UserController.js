import User from "../models/User.js"

const registerUser = async (req, res)=>{

    const email = req.body.email
    const existeUsuario = User.findOne(email)

    if(existeUsuario){
        const error = new Error ("usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new User(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
        console.log(usuario)

    } catch (error) {
        console.log(`error:${error.message}`)
    }
}

const loginUser = (req, res)=>{
    res.send("creando usuario")
}

const deleteUser = (req, res)=>{
    res.send("eliminando  usuario")
}

export  {registerUser, loginUser, deleteUser}