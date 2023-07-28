import express from 'express'
import {createChat, findChat, userChat} from '../Controller/chatController.js'
const router=express.Router()
router.post("/",createChat)
router.get('/:id',userChat)
router.get('/find/:firstId/:secondId',findChat)
export default router