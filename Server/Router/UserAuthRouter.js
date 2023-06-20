import Express from 'express'
import { check, resendOtp, resetPassword, resetUserPassword, userLogin, userLogout, UserSignup, verifyForgotOtp, verifyUser } from '../Controller/UserAuthController.js'
const router=Express.Router()

router.post('/signup',UserSignup)
router.post('/verify',verifyUser)
router.post('/login',userLogin)
router.get("/check",check)
router.get("/logout",userLogout)
router.post("/forgot",resetPassword)
router.post("/verifyOtp",verifyForgotOtp)
router.post("/reset",resetUserPassword)
router.post("/resend-otp",resendOtp)
export default router