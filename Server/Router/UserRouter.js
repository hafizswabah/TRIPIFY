import express from 'express'
import {GetPkg,packageview,searchPkg} from '../Controller/UserController.js'

const router=express.Router()
router.get("/get-pkg",GetPkg)
router.get('/search',searchPkg)
router.get("/package-view/:id",packageview)


export default router