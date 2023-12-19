import Post from "../models/Post.js"

export const createPost = async (req, res) => {

    try {
        const {description,userId}=req.body
        const images=req.file
        console.log(req.body,'body');
        if(!description){
            return res.status(400).json({message:"description is required"})
          }
          
      if(!images){
        return res.status(400).json({message:"Upload an image"})
    }
    if(!userId){
        return res.status(400).json({message:"id not defined"})
    }
    const image=req.file.filename
    
    const newAdmin = new Post({ description,image:image,userId });
    console.log(newAdmin,'admin');
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
} catch (error) {
    console.log(error);
    res.status(404).json({message:error.message || null});

  }
}





// export const getUserPost=async(req,res)=>{
//     const {userId}=req.params
//     try {
//         let response=await Post.findById({userId})
//         res.status(201).json(response) 
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({message:error.message})
        
//     }
// }


export const likePost=async(req,res)=>{
    const { userid, postid } = req.body;
    console.log(userid,postid,'idddddddd');

    try {
        
        const post = await Post.findById(postid);
        console.log(post,'postttttttttt');

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        const existingLike = post.likes.find((item) => item.userid === userid);

        if(existingLike){
        post.likes.pull({userid:userid,islike:true})
        await post.save();
        res.json({ message: 'unliked' });

        }else{

            post.likes.push({userid:userid,islike:true})
            await post.save();
        res.json({ message: 'Post liked successfully' });

        }
        

        // likes: [
        //     {
        //       userid: userid,
        //       islike:true,
        //     },
        //   ],
    
    //   post.likes.find((item)=>{
    //       console.log(item,'item');
    //     })

        // return true
        // res.json({message:"suucessfullt liked"})
        
        
        // if (existingLike) {
        //     return res.status(400).json({ error: 'User already liked the post' });
        // }
    
       
        // post.likes.push({ userid, islike: true });
    
        
       
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
}

export const disLike=async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
          req.params.postId,
          { $inc: { likes: -1 } },
          { new: true }
        );
        res.json(post);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}



export const getPost=async(req,res)=>{
    const {id}=req.params
    try {
        let response=await Post.find({userId:id})
        res.status(201).json(response)
    } catch (error) {
        res.status(401).json({message:error.message})
        
    }
}




export const commentPost=async(req,res)=>{
    try {
        const {id}=req.params
        const {userId}=req.body
        const post=await Post.findById(id)
        const isComment=post.comments.get(userId)

        if(isComment){
            post.comments.delete(userId)
        }else{
            post.comments.set(userId,true)
        }

        const updatedPost=await Post.findByIdAndUpdate(id,{comments:post.comments},{new:true})
        res.status(201).json(updatedPost)
        
    } catch (error) {
        res.status(404).json({message:error.message || null});
        
    }
}

