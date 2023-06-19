import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import AgencyModel from '../Model/AgencyModel.js'
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto'




var salt = bcrypt.genSaltSync(10);


export async function AgencyRegister(req, res) {
    try {
        const { name, email, contact, password, regNo } = req.body;

        const ExistingAgency = await AgencyModel.findOne({ email })
        if (ExistingAgency) {
            return res.json({ err: true, message: "Already Signup please Login" })
        }
        // const proof = await cloudinary.uploader.upload(req.file.path, {
        //     folder: 'Tripify'
        // })
        // console.log(proof)
       let proof = req.file.path
        console.log(proof);
        const hashPassword = bcrypt.hashSync(password, salt);
        const Agency = await AgencyModel.create({ ...req.body, password: hashPassword, proof });
        const token = jwt.sign(
            {
                id: Agency._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("AgencyToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })

    } catch (err) {
        console.log(err);
        res.json({ err: true, error: err, message: "Something Went Wrong" })
    }

}
export async function agencyLogin(req, res) {
    try {
        const { email, password } = req.body;
        const agency = await AgencyModel.findOne({ email})
        if (!agency){
            return res.json({ err: true, message: "No Travel Agency Found" })
        }
        if (agency.block){
            return res.json({ err: true, message: "Your Travel Agency is blocked" })
        }

        const agencyValid = bcrypt.compareSync(password, agency.password);
        if (!agencyValid)
            return res.json({ err: true, message: "wrong Password" })
        const token = jwt.sign(
            {
                id: agency._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("AgencyToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err:true })
    }
}


export const checkAgencyLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.AgencyToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const agency = await AgencyModel.findOne({_id:verifiedJWT.id, block:false}, { password: 0 });
        if (!agency) {
            return res.json({ loggedIn: false });
        }
        return res.json({ agency, loggedIn: true });
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}

export const agencyLogout = async (req, res) => {
    res.cookie("AgencyToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}
