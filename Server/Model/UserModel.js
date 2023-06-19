import Mongoose from "mongoose";
const UserSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    }
})
const UserModel=Mongoose.model("Users",UserSchema)
export default UserModel