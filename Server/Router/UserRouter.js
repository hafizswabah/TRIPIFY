import express from 'express'
import { paymentOrder, PlanverifyPayment, verifyPayment } from '../Controller/pamentController.js'
import {cancelBooking, findPackages, GetPkg,getuserBooking,packageview,planview,searchPkg} from '../Controller/UserController.js'

const router=express.Router()
router.get("/get-pkg",GetPkg)
router.get('/search',searchPkg)
router.get('/search-packages',findPackages)
router.get("/package-view/:id",packageview)
router.get("/plan-view/:id",planview)
router.post("/payment",paymentOrder)
router.post("/payment/verify",verifyPayment)
router.post("/plan/payment/verify",PlanverifyPayment)
router.get("/booking/:id",getuserBooking)
router.patch("/booking/cancel",cancelBooking)


export default router