import { model,Schema } from "mongoose";

const reglogSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    // lastname:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},{ timestamps: true })

const Admin = model("mediareglog", reglogSchema);
export default Admin;