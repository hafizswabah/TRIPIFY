import express from "express";
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
import UserRouter from './Router/UserRouter.js'
import chatRouter from './Router/chatRouter.js'
import messageRouter from './Router/messageRouter.js'
import { verifyAdmin } from "./middleware/adminMiddleware.js";
import { verifyUser } from "./middleware/userMiddleware.js";
import { Server } from 'socket.io'
import http from "http"
const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static(path.resolve() + "/public"))
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000",]
  },
});

let acitveUsers = []

io.on("connection", (socket) => {

  //add new user
  socket.on("new-user-add", (newUserId) => {
    if (!acitveUsers.some((user) => user.userId === newUserId)) {
      acitveUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", acitveUsers);
    console.log(acitveUsers, "online");

  });

  socket.on("disconnect", () => {
    acitveUsers = acitveUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", acitveUsers);
  });

  socket.on("send-message", (data) => {
    const { recieverId } = data
    console.log(recieverId);
    console.log(data);
    const user = acitveUsers.find((user) => user.userId === recieverId)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);

    }
  })
})


app.use(
  cors({
    origin: [
      "http://localhost:3000"
    ],
    credentials: true,
  })
);

DBConnect()
app.use("/user/auth", UserAuthRouter)
app.use("/chat", verifyUser, chatRouter)
app.use("/message", messageRouter)
app.use("/user", verifyUser, UserRouter)
app.use("/admin/auth", adminAuthRouter)
app.use("/agency/auth", AgencyAuthRouter)
app.use("/admin", verifyAdmin, adminRouter)
app.use("/agency", AgencyRouter)
server.listen(8888, () => console.log('server running at port 8888'))