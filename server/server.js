import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './routes/authRoutes.js'
import Postrouter from './routes/postRoutes.js'
// import router from './routes/postRoutes.js'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

const app=express()
dotenv.config()

//MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use(cors())
app.use(morgan("common"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/admin',router)
app.use('/api/posts',Postrouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))





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


