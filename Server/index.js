import  express  from "express";
import 'dotenv/config'
import DBConnect from "./config/DBconnect.js";
import cookieParser from "cookie-parser";
import UserAuthRouter from './Router/UserAuthRouter.js'
import cors from 'cors'
import path from 'path'
const app=express()
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + "/public"))
app.use(
  cors({
    origin: [
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
DBConnect()
app.use("/user/auth",UserAuthRouter)
app.listen(7777,()=>console.log('server running'))