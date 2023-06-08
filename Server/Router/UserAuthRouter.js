import Express from 'express'
import { userLogin, UserSignup, verifyUser } from '../Controller/UserController.js'
const router=Express.Router()

router.post('/signup',UserSignup)
router.post('/verify',verifyUser)
router.post('/login',userLogin)
export default router