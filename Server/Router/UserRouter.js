import express from 'express'
import { paymentOrder, PlanverifyPayment, verifyPayment } from '../Controller/pamentController.js'
import {addReview, cancelBooking, checkReviewer, editProfile, findPackages, GetPkg,getuserBooking,packageview,planview,searchPkg, userReviews} from '../Controller/UserController.js'

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
router.post("/edit-profile",editProfile)
router.get("/check-reviewer",checkReviewer)
router.post("/add-review",addReview)
router.get("/get-userReview",userReviews)


export default router