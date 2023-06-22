import  express  from "express";
import 'dotenv/config'
import DBConnect from "./config/DBconnect.js";
import cookieParser from "cookie-parser";
import UserAuthRouter from './Router/UserAuthRouter.js'
import cors from 'cors'
import path from 'path'
import adminAuthRouter from './Router/adminAuthRouter.js'
import AgencyAuthRouter from './Router/AgencyAuthRouter.js'
import adminRouter from './Router/adminRouter.js'
import AgencyRouter from './Router/AgencyRouter.js'
import { verifyToken } from "./middleware/jwtMiddleware.js";
const app=express()
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true,limit:'50mb' }))
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
app.use("/admin/auth",adminAuthRouter)
app.use("/agency/auth",AgencyAuthRouter)
app.use("/admin",verifyToken,adminRouter)
app.use("/agency",AgencyRouter)
app.listen(8888,()=>console.log('server running at port 8000'))