import  Express  from "express";
import { AgencyRegister } from "../Controller/agencyAuthController.js";
const router=Express.Router()


router.post('/signup',AgencyRegister)
export default router