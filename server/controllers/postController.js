import Post from "../models/Post.js"
import Admin from "../models/User.js";

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

export const postComment = async (req, res) => {
    const { userid, postid, text,username } = req.body;
  
    try {
      const post = await Post.findById(postid);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
    
  
      
      post.comments.push({ userid, text,username });
     let response = await post.save();
  
      res.json({ message: response, status:true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  

export const getPost=async(req,res)=>{
    const {id}=req.params
    try {
        let response=await Post.find({userId:id})

        // let getUser = response.map(async(user)=>{
        //     console.log(user);
        //     const {...other} = user;
            
        //     const userall = await Admin.findById(user.username);
        //     const {...userOther} = userall;
        //     console.log(userall,"user");
            
        //     return{...other._doc,userData:userOther._doc}
        // })

        // const getData = await Promise.all(getUser);



       

        res.status(201).json(response);
    } catch (error) {
        res.status(401).json({message:error.message})
        
    }
}


export const getAllPost=async(req,res)=>{
    try {
       let response=await Post.find()

    //   response.map(async(post)=>{
    //     // get the post

    //     post.comments.map((comment)=>{
    //         console.log(comment,'comment')
    //     })

    //    let res = await post.comments
       
    
    //    console.log(res,'resss')
    // }

       
       
    //    )
    //    .map(async(item)=>{
    //     // get the comments
    //      let responseForCommentWithUserData =  await Promise.all(item.map(async(comment)=>{
    //         // get the command
    //         const {...other } = comment._doc

    //         const user = await Admin.findById(comment.userid);

    //         const { username,image,...others } = user._doc

    //         other.username = username
    //         other.image = image

    //         return other

    //     }
        
        
    //     ))
    //      return responseForCommentWithUserData
    // })



    let rrr = await Promise.all( response.map(async(post)=>{
      console.log(post,'post you');

        const {comments,...others} = post._doc
        // get one post
        console.log(others,'posts');

        const user = await Admin.findById(post.userId);



       let r =  await Promise.all( post.comments.map(async(comment)=>{
            // get the comment
          
            const {...other } = comment._doc

            const user = await Admin.findById(comment.userid);

            const { username,image,...others } = user._doc

            other.username = username
            other.image = image

            return other
        }))

        console.log(r,'get the comment and user name')
        console.log(others,'othessssssssssssssssssss');


         others.comments = r
         others.username =  user.username; 
         others.profilePic =  user.image; 

         return others


    }))




    // console.log(rrr,'response');

       
    //    return true
       res.status(201).json(rrr)

    } catch (error) {
        res.status(401).json({message:error.message})
        
    }
}
















// export const commentPost=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const {userId}=req.body
//         const post=await Post.findById(id)
//         const isComment=post.comments.get(userId)

//         if(isComment){
//             post.comments.delete(userId)
//         }else{
//             post.comments.set(userId,true)
//         }

//         const updatedPost=await Post.findByIdAndUpdate(id,{comments:post.comments},{new:true})
//         res.status(201).json(updatedPost)
        
//     } catch (error) {
//         res.status(404).json({message:error.message || null});
        
//     }
// }




