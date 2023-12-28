import express from 'express'
// import {getFeedPosts,getUserPosts,likePost} from '../controllers/posts.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import {  addFriend, createPost,getAllPost,getPost, getUser, likePost, postComment, share, updateComment } from '../controllers/postController.js'
import multer from 'multer'
import path from 'path'

const Postrouter=express.Router()

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
},})

const upload=multer({storage:storage})



Postrouter.post('/search',upload.single('image'),createPost)
//GET
// Postrouter.get('/:id',getUserPost)
Postrouter.get('/get/:id',getPost)
Postrouter.get('/get',getAllPost)


Postrouter.put('/:id',updateComment)
Postrouter.post('/comment',postComment)
// LIKES
Postrouter.post("/like",likePost)

Postrouter.post('/addfriend',addFriend)
Postrouter.get('/:id',getUser)
Postrouter.get('/share/:id',share)

// Postrouter.get('/getfrnd',getFriend)






//UPDATE
// Postrouter.put('/:id/like',verifyToken,likePost)
// Postrouter.put('/:id/comment',verifyToken,commentPost)


export default Postrouter
