import  Express  from "express";
import { AgencyRegister } from "../Controller/agencyAuthController.js";
import multerUpload from "../middlewares/multerUpload.js";
const router=Express.Router()


router.post('/signup',multerUpload.single('proof'),AgencyRegister)
export default router