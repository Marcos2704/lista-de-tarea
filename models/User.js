import mongoose from "mongoose";
import bcrypr from "bcrypt"
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        trim: true
    },
    token:{
        type: String,
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
})


userSchema.pre("save", async function (next){
 
 if(!this.isModified("password")){
    next();
 }   
 const salt = await bcrypr.genSalt(10)
 this.password = await bcrypr.hash(this.password, salt)
})


const User = mongoose.model("User", userSchema)
export default User;