import  Express  from "express";
import { agencyLogin, agencyLogout, AgencyRegister, checkAgencyLoggedIn } from "../Controller/agencyAuthController.js";
import multerUpload from "../middleware/multerUpload.js";
const router=Express.Router()


router.post('/signup',multerUpload.single('proof'),AgencyRegister)
router.get("/check",checkAgencyLoggedIn)
router.post("/login",agencyLogin)
router.get("/logout",agencyLogout)

export default router