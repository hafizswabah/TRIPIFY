import Express from 'express'
import { check, userLogin, userLogout, UserSignup, verifyUser } from '../Controller/UserController.js'
const router=Express.Router()

router.post('/signup',UserSignup)
router.post('/verify',verifyUser)
router.post('/login',userLogin)
router.get("/check",check)
router.get("/logout",userLogout)
export default router