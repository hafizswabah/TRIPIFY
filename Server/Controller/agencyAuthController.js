import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import AgencyModel from '../Model/AgencyModel.js'
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto'




var salt = bcrypt.genSaltSync(10);


export async function AgencyRegister(req, res){
    try{
        const {name, email, contact, password,regNo}=req.body;
        console.log(req.body.proof);
        const proof=await cloudinary.uploader.upload(req.body.proof,{
            folder:'Tripify'
        })
        console.log(proof)
        const hashPassword = bcrypt.hashSync(password, salt);
        const Agency = await AgencyModel.create({...req.body,password:hashPassword, proof});
        const token = jwt.sign(
            {
                id:Agency._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("AgencyToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })

    }catch(err){
        console.log(err);
        res.json({err:true , error:err, message:"Something Went Wrong"})
    }

}