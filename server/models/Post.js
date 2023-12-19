import mongoose,{Schema,model} from 'mongoose'

const postSchema= new Schema(
    {
       
        userId:{
            type:String,
            required:true,
        },
       
        
        description:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
       
        likes: [
            {
              userid: { type: String, required: true },
              islike: { type: Boolean, default: true },
            },
          ],

    },{timestamps:true}
)

const Post=model('postdata',postSchema)
export default Post