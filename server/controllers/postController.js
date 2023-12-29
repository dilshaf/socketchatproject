import { mongo } from "mongoose";
import Post from "../models/Post.js"
import Admin from "../models/User.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {

    try {
        const {description,userId,privacy}=req.body
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
    if (!privacy) {
      return res.status(400).json({ message: "Privacy setting is required" });
    }
    const image=req.file.filename
    const isPublic = privacy === "public";
    const newAdmin = new Post({ description,image:image,userId,privacy: isPublic });
    console.log(newAdmin,'admin');
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
} catch (error) {
    console.log(error);
    res.status(404).json({message:error.message || null});

  }
}


export const updatedPost=async(req,res)=>{
 
  const { privacy,postid } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postid,
      { privacy },
      { new: true }
    );
    

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post privacy:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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
    const { userid, postid, text,username,image } = req.body;
  
    try {
      const post = await Post.findById(postid);
     
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
    
  
      
      post.comments.push({ userid, text,username,image });
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

export const updateComment = async (req, res) => {
  const { postid, commentid, text } = req.body;

  const { id  } = req.params

  console.log(postid,commentid,text,'reqody');
 

  try {
    // const post = await Post.findById(postid);
    // console.log(post,'post');

    

    // if (!post) {
    //   return res.status(404).json({ error: 'Post not found' });
    // }

    // const commentToUpdate = post.comments.id(commentid);
// console.log(commentToUpdate,'commntupdatae');
// return true
    // if (!commentToUpdate) {
    //   return res.status(404).json({ error: 'Comment not found' });
    // }

   
    // commentToUpdate.text = text;

    
    const updatedPost = await Post.findByIdAndUpdate(postid, {
      $set: {
        'comments.$[elem].text': text,
        'comments.$[elem].userid': id,
      },
    }, {
      new: true,
      arrayFilters: [{ 'elem._id': commentid }],
    });
    console.log(updatedPost, 'updatepost');
    

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


// export const getAllPost=async(req,res)=>{
//     try {
//        let response=await Post.find()

//     //   response.map(async(post)=>{
//     //     // get the post

//     //     post.comments.map((comment)=>{
//     //         console.log(comment,'comment')
//     //     })

//     //    let res = await post.comments
       
    
//     //    console.log(res,'resss')
//     // }

       
       
//     //    )
//     //    .map(async(item)=>{
//     //     // get the comments
//     //      let responseForCommentWithUserData =  await Promise.all(item.map(async(comment)=>{
//     //         // get the command
//     //         const {...other } = comment._doc

//     //         const user = await Admin.findById(comment.userid);

//     //         const { username,image,...others } = user._doc

//     //         other.username = username
//     //         other.image = image

//     //         return other

//     //     }
        
        
//     //     ))
//     //      return responseForCommentWithUserData
//     // })



//     let rrr = await Promise.all( response.map(async(post)=>{
//       console.log(post,'post you');

//         const {comments,...others} = post._doc
//         // get one post
//         console.log(others,'posts');

//         const user = await Admin.findById(post.userId);



//        let r =  await Promise.all( post.comments.map(async(comment)=>{
//             // get the comment
          
//             const {...other } = comment._doc

//             const user = await Admin.findById(comment.userid);
// console.log(user,'userkaanan');
//             const { username,image,...others } = user._doc
            

//             other.username = username
//             other.image = image    //dp

//             return other
//         }))

//         console.log(r,'get the comment and user name')
//         console.log(others,'othessssssssssssssssssss');


//          others.comments = r
//          others.username =  user.username; 
//          others.profilepic =  user.image; 

         

//          return others


//     }))




//     // console.log(rrr,'response');

       
//     //    return true
//        res.status(201).json(rrr)

//     } catch (error) {
//         res.status(401).json({message:error.message})
        
//     }
// }


export const getAllPost = async (req, res) => {
  try {
    let response = await Post.find();

    // console.log(response,'response')
    

    let rrr = await Promise.all(response.map(async (post) => {
      const { comments, ...others } = post._doc;
      const user = await Admin.findOne({_id:new mongoose.Types.ObjectId(post.userId),privacy:true});

      if (!user) {
        // Handle the case when the user is not found
        return null;
      }

      let r = await Promise.all(post.comments.map(async (comment) => {
        const { ...other } = comment._doc;
        const user = await Admin.findById(comment.userid);

        if (!user) {
          // Handle the case when the user for the comment is not found
          return null;
        }

        const { username, image, ...others } = user._doc;

        other.username = username;
        other.image = image;

        return other;
      }));

      // Filter out null values (users or comments not found)
      r = r.filter((item) => item !== null);

      others.comments = r;
      others.username = user.username;
      others.profilepic = user.image;

      return others;
    }));


    console.log(rrr,'ddd')

    // Filter out null values (users or posts not found)
    rrr = rrr.filter((item) => item !== null);

    res.status(201).json(rrr);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


export const addFriend=async(req,res)=>{

  
  const { userId,friendId } = req.body;
  console.log(userId,'userId');
  console.log(friendId,'frndId');

  

  if(userId===friendId){
    res.status(400).json({message:"samu users"})
  }

  const currentUser = await Admin.findById(userId);
  console.log(currentUser,'currentuser');

  
  

  if (!currentUser) {
    return res.status(404).json({ error: 'User not found ' });
  }
  try{
  const existingfollow=currentUser.friends.includes(friendId);


  if (existingfollow) {

    currentUser.friends.pull(friendId)
  await currentUser.save()

     res.status(201).json({message:"pull"})
  }else{

    currentUser.friends.push(friendId);
    
     res.status(201).json({message:"added"})
  }
  await currentUser.save()
}catch(error){
  console.log(error.message);
}
   
  

}


export const getUser=async(req,res)=>{
  const {id} =req.params
  try {
    let getUser=await Admin.findById(id)  //login cheytha usernte details


    

    const {...others}=getUser._doc

  

    let user=getUser.friends.map(async(item)=>{   //item =ids of frndz
      
      
      let getUserr=await Admin.findById(item)   //friendsnte details full
      

      let {...others}=getUserr._doc

    
      return others


      
    })




    const result=await Promise.all(user)    //login cheytha usernte details

    console.log(others,'others');

    // return true
    
    others.followers=result 

   
    
    res.status(201).json(others)
  } catch (error) {
    console.log(error.message);
    
  }
}












export const share=async(req,res)=>{
const {postid}=req.body
  try {
    
    const post = await Post.findById(postid);
  
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
  
    res.status(201).json(post)
  } catch (error) {
    res.status(401).json({message:error.message})
  }
}












