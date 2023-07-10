import express from 'express'
import { paymentOrder, verifyPayment } from '../Controller/pamentController.js'
import {cancelBooking, GetPkg,getuserBooking,packageview,planview,searchPkg} from '../Controller/UserController.js'

const router=express.Router()
router.get("/get-pkg",GetPkg)
router.get('/search',searchPkg)
router.get("/package-view/:id",packageview)
router.get("/plan-view/:id",planview)
router.post("/payment",paymentOrder)
router.post("/payment/verify",verifyPayment)
router.get("/booking/:id",getuserBooking)
router.patch("/booking/cancel",cancelBooking)


export default router