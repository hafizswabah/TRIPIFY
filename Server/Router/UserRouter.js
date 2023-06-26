import express from 'express'
import {GetPkg,searchPkg} from '../Controller/UserController.js'

const router=express.Router()
router.get("/get-pkg",GetPkg)
router.get('/search',searchPkg)

export default router