import express from 'express'
import { acceptAgency, getAgencies, getAgencyRequests, getUsers, rejectAgency } from '../Controller/AdminController.js'
const router=express.Router()
router.get("/agency/requests",getAgencyRequests)
router.post("/agency/accept",acceptAgency)
router.post("/agency/reject",rejectAgency)
router.get("/agency",getAgencies)
router.get("/users",getUsers)
export default router