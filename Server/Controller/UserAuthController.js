import UserModel from "../Model/UserModel.js"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import sentOtp from "../helper/sentOTP.js"
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10)
export async function UserSignup(req, res) {
    try {
        const { email } = req.body
        console.log(req.body);
        let user = await UserModel.findOne({ email })
        if (user) {
            return res.json({ err: true, message: 'You Already have an account Please Login' })
        }
        if (req.body.name == "" || req.body.email == "" || req.body.password == "" || req.body.confirmPassword == "") {
            return res.json({ err: true, message: "Enter Required Detailes" })
        }
        let otp = Math.ceil(Math.random() * 100000)

        let otpHash = crypto.createHmac('sha256', process.env.OTP_SECRET)
            .update(otp.toString())
            .digest('hex')
        let otpSent = await sentOtp(email, otp)
        const token = jwt.sign(
            {
                otp: otpHash
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 10,
            sameSite: "none"
        }).json({ err: false })
    } catch (err) {
        console.log(err);
        res.json({ err: true, error: err, message: "something went wrong" })
    }
}
export async function verifyUser(req, res) {
    try {
        const { name, email, password, otp, contact } = req.body
        console.log(req.body);
        const tempToken = req.cookies.tempToken
        if (!tempToken) {
            return res.json({ err: true, message: "OTP session Time Out" })
        }
        const verifiedTempToken = jwt.verify(tempToken, process.env.JWT_SECRET_KEY)
        let otpHash = crypto.createHmac('sha256', process.env.OTP_SECRET)
            .update(otp.toString())
            .digest('hex')
        if (otpHash != verifiedTempToken.otp) {
            return res.json({ err: true, message: "Invalid OTP" })
        }
        const hashPassword = bcrypt.hashSync(password, salt)
        const NewUser = new UserModel({ name, email, password: hashPassword, contact })
        await NewUser.save()

        const token = jwt.sign(
            {
                id: NewUser._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })
    }
    catch (err) {
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }

}
export async function userLogin(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body);
        const user = await UserModel.findOne({ email })
        console.log(user);
        if (!user) {
            return res.json({ err: true, message: "User Not Found Please Signup" })
        }
        const userValid = bcrypt.compareSync(password, user.password)
        if (!userValid) {
            return res.json({ err: true, message: "Incorrect Password" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({ err: false, user: user._id })

    } catch (err) {
        console.log(err);
        res.json({ err: true, message: "server error" })
    }
}
export async function check(req, res) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.json({ loggedIn: false })
        }
        const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await UserModel.findById(verifiedJWT.id, { password: 0 })

        if (!user) {
            return res.json({ loggedIn: false })
        } else {
            return res.json({ user, loggedIn: true })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ err: true, message: "something happned" })
    }
}
export async function userLogout(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}
export async function resetPassword(req, res) {
    try {
        const { email } = req.body
        const user = UserModel.findOne({ email })
        if (!user) {
            return res.json({ err: true, message: "User not found" })
        }
        let otp = Math.ceil(Math.random() * 1000000)
        let otpHash = crypto.createHmac('sha256', process.env.OTP_SECRET)
            .update(otp.toString())
            .digest('hex');
        let otpSent = await sentOtp(email, otp)
        const token = jwt.sign(
            {
                otp: otpHash
            },
            process.env.JWT_SECRET_KEY
        )
        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 10,
            sameSite: "none",
        }).json({ err: false })
    }
    catch (err) {
        console.log(err)
        res.json({ err: true, error: err, message: "something went wrong" })
    }
}
export async function verifyForgotOtp(req, res) {
    try {
        const { otp } = req.body;
        const tempToken = req.cookies.tempToken;

        if (!tempToken) {
            return res.json({ err: true, message: "OTP Session Timed Out" });
        }

        const verifiedTempToken = jwt.verify(tempToken, process.env.JWT_SECRET_KEY);
        let otpHash = crypto.createHmac('sha256', process.env.OTP_SECRET)
            .update(otp.toString())
            .digest('hex');
        if (otpHash != verifiedTempToken.otp) {
            return res.json({ err: true, message: "Invalid OTP" });
        }
        return res.json({ err: false })
    }
    catch (err) {
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }
}
export async function resetUserPassword(req, res) {
    try {
        const { email, password, otp } = req.body;
        console.log(req.body);
        const tempToken = req.cookies.tempToken;

        if (!tempToken) {
            return res.json({ err: true, message: "OTP Session Timed Out" });
        }

        const verifiedTempToken = jwt.verify(tempToken, process.env.JWT_SECRET_KEY);
        let otpHash = crypto.createHmac('sha256', process.env.OTP_SECRET)
            .update(otp.toString())
            .digest('hex');
        if (otpHash != verifiedTempToken.otp) {
            return res.json({ err: true, message: "Invalid OTP" });
        }
        const hashPassword = bcrypt.hashSync(password, salt);


        await UserModel.updateOne({ email }, {
            $set: {
                password: hashPassword
            }
        })
        return res.json({ err: false ,message:"password reseted"})
    }
    catch (err) {
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }
}