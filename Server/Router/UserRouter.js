import express from 'express'
import { paymentOrder, verifyPayment } from '../Controller/pamentController.js'
import {GetPkg,packageview,planview,searchPkg} from '../Controller/UserController.js'

const router=express.Router()
router.get("/get-pkg",GetPkg)
router.get('/search',searchPkg)
router.get("/package-view/:id",packageview)
router.get("/plan-view/:id",planview)
router.post("/payment",paymentOrder)
router.post("/payment/verify",verifyPayment)


export default router