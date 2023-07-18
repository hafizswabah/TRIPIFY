import express from 'express'
import { acceptAgency, blockUser, getAgencies, getAgencyRequests, getBookings, getPackages, getPlans, getUsers, rejectAgency, unblock } from '../Controller/AdminController.js'
const router=express.Router()
router.get("/agency/requests",getAgencyRequests)
router.post("/agency/accept",acceptAgency)
router.post("/agency/reject",rejectAgency)
router.get("/agency",getAgencies)
router.get("/users",getUsers)
router.post("/block-user",blockUser)
router.post("/unblock-user",unblock)
router.get("/plans",getPlans)
router.get("/get-trips",getPackages)
router.get("/get-bookings",getBookings)
export default router