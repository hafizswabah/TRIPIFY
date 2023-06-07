import UserModel from "../Model/UserModel.js"
import Crypto from 'crypto'

export async function UserSignup(req,res){
const {email}=req.body
let user=await UserModel.findOne({email})
if(user){
return res.json({err:true,message:'You Already had an account Please Login'})
}
let otp=Math.ceil(Math.random()*100000)
let otpScrete='screteotp'
let otpHash=Crypto.createHmac('sha256',otpScrete)
.update(otp.toString())
.digest('hex')
let otpSent=await 

}