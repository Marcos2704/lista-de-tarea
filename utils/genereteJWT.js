import jwt from "jsonwebtoken"

const genereteJWT = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: "10d"
    })
    
}
export default genereteJWT
