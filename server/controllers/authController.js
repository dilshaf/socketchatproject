import Admin from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => { 



    try {
      const { username, email, password } = req.body;
      const images=req.file

      console.log(req.body,'body');

      if(!username){
        return res.status(400).json({message:"name is required"})
      }

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
      }
  
     
      if(!images){
        return res.status(400).json({message:"Upload an image"})
    }
    const image=req.file.filename
      




      const saltRounds = 10;
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newAdmin = new Admin({ username, email, password: hash,image:image });
      const savedAdmin = await newAdmin.save();
      res.status(200).json(savedAdmin);
    } catch (error) {
      console.log(error);
      res.status(404).json({message:error.message || null});

    }
  };


  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Validate password
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
      }
  
      const user = await Admin.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      const isPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (isPassword) {
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1 days' });
        res.json({result:user,token:token});
      } else {
        res.status(404).json({ message: "Incorrect password" });
      }
      
    } catch (error) {
      console.log(error);
    }
  };


  export const getUser=async(req,res)=>{
    const { id } = req.params
    try {
      let getUser=await Admin.findById(id)
    const {...others}=getUser._doc
    let user=getUser.friends.map(async(item)=>{   //item =ids of frndz
      
      
      let getUserr=await Admin.findById(item)   //friendsnte details full
      

      let {...others}=getUserr._doc

    
      return others


      
    })
    const result=await Promise.all(user)    //login cheytha usernte details
    others.followers=result 

      res.status(201).json(others)
      // console.log(getUser,"res");
    } catch (error) {
      res.status(404).json({message:error.message || null});
      
    }
  }

  export const getallData = async(req,res) => {
    try {
      const data = await Admin.find()
    res.json(data)
    console.log(data,"data");
    } catch (error) {
      console.log(error.message);
    }
  
  }




  // export const updateUser = async (req, res) => {

  //   const { id } = req.params; 
  //   const { username, email, password } = req.body; 
    
  //   try {
      
  //     let updateFields = { username, email, password };
  //     console.log(req.file,"sdfghjkkjhgfds");
  //     const imagePath = req.file.filename;
  //     updateFields.image = imagePath;

  //        console.log(imagePath,"file");
      
     
  //     const updatedProfile = await Admin.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
  //     console.log(updatedProfile, 'profile');
  
      
  //     res.status(200).json(updatedProfile);
  //   } catch (error) {
  //     console.error(error.message,"hhhhhhhhhhh");
      
  //     res.status(404).json({ message: error.message || null });
  //   }
  // };




  export const updateUser = async(req,res) => {
    const { id } = req.params
    const { username, email, password } = req.body
  
    try {
      let updateFields = {username,email,password}
      // console.log(fields,"hhhhhhhhhh");
      console.log(req.file,"req.file");
      // if(req.file) {
        const image=req.file.filename;
        updateFields.image=image;
        
      // }
      
      const updatedUser =await Admin.findByIdAndUpdate(id , {$set : updateFields}, {new: true});
      console.log(updatedUser,"updated profile picture");
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      console.log(updatedUser,"updatedUser");
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal Server Error' });
      console.log(error.message,"error in updating profile");
    }
  
  }