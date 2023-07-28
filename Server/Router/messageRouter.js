import express from 'express'
import { addChat, getChat } from '../Controller/messageController.js'

const router=express.Router()
router.post("/",addChat)
router.get("/:chatId",getChat)
export default router