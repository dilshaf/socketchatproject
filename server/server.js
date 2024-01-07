import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './routes/authRoutes.js'
import Postrouter from './routes/postRoutes.js'
import { createServer } from 'http'
import { Server } from 'socket.io';
// import router from './routes/postRoutes.js'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'
import http from 'http';
import {saveSession,findSession,findAllSessions} from "./sessionStorage.js"
import { findMessageForUser, saveMessage } from './messageStorage.js'

import { v4 as uuidV4 } from 'uuid';



const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

const app=express()
const httpServer=http.createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    },
});

dotenv.config()

//MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use(cors())
app.use(morgan("common"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs') // Tell Express we are using EJS
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/api/admin',router)
app.use('/api/posts',Postrouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });


  io.on("connection", (socket) => {
    const transport = socket.conn.transport.name; // in most cases, "polling"
  
    socket.conn.on("upgrade", () => {
      const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
    });
  });
io.use((socket,next)=>{

    const sessionId=socket.handshake.auth.sessionId
    if(sessionId){
        const session=findSession(sessionId)
        if(session){
            socket.sessionId=sessionId
            socket.userId=session.userId
            socket.username=session.username
            return next()

        }else{
            return next(new Error("invalid session"))
        }
    }
    const username=socket.handshake.auth.username
    if(!username){
        return next(new Error("Invalid username"))
    }
    socket.username=username,
    socket.userId=uuidV4()
    socket.sessionId=uuidV4()
    next()
})

function getMessagesForUser({userId}){
        const messagesPerUser=new Map()
        findMessageForUser(userId).forEach((message)=>{
            const {from,to}=message
            const otherUser=userId===from?to:from
            if(messagesPerUser.has(otherUser)){
                messagesPerUser.get(otherUser).push(message)
            }else{
                messagesPerUser.set(otherUser,[message])
            }
        })
}
io.on("connection",async(socket)=>{
    saveSession(socket.sessionId,{
        userId:socket.userId,
        username:socket.username,
        connected:true,
    })

    socket.join(socket.userId)
    const users=[]
    const userMessages=getMessagesForUser(socket.userId)
   findAllSessions().forEach((session)=>{
    if(session.userId!==socket.userId){
    users.push({
        userId:session.userId,
        username:session.username,
        connected:session.connected,
        messages: (userMessages && userMessages[session.userId]) || [],
    })
}
   })
    //socket events
    socket.emit("users",users)
    socket.emit("session",{sessionId:socket.sessionId,userId:socket.userId,username:socket.username})
    socket.broadcast.emit("user connected",{userId:socket.userId,username:socket.username})
    const messages=[]

    socket.on("private message",({content,to})=>{
       const message={
        from:socket.userId,
        to,
        content
       }
       socket.to(to).emit("private message",message)
       saveMessage(message)
    })


    socket.on("user message",({userId,username})=>{
        const userMessages= getMessagesForUser(socket.userId)
        socket.emit("user messages",{
            userId,
            username,
            messages: (userMessages && userMessages[session.userId]) || [],
        })
    })

    socket.on("disconnect",async()=>{
const matchingSockets=await io.in(socket.userId).allSockets()
const isDisconnected=matchingSockets.size===0
if(isDisconnected){
    socket.broadcast.emit("user disconnected",{
        userId:socket.userId,
        username:socket.username
    })
    saveSession(socket.sessionId,{
        userId:socket.userId,
        username:socket.username,
        connected:socket.connected
    })
}
    })
})
httpServer.listen(8009)
console.log("listening to port......");




//MONGODB CONNECT
const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
        
    }
}



//PORT CONNECT
app.listen(process.env.PORT,()=>{
    connect()
    console.log(`Port is connected ${process.env.PORT}`);
})


