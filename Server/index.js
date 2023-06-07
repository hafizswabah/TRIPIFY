import  Express  from "express";
import DBConnect from "./config/DBconnect.js";
const app=Express()
DBConnect()
app.listen(7000,()=>console.log('server running'))