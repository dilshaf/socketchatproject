import mongoose,{Schema,model} from 'mongoose'

const postSchema= new Schema(
    {
       
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"mediareglog"
        },


        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },




    
        username:{
            type:String
        },
       
        
        description:{
            type:String,
            required:true
        },
        email:{
            type:String,
        
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

          comments: [
            {
              text:String,
              userid:String

            },
          ],
          privacy: {
            type: String,
            required: true,
          },

         
    // friends: {
    //   type:Array,
    // }

        //   comments:[
        //     {
        //         type:String,
        //         userId:{
        //             type:Schema.Types.ObjectId,
        //             ref:'mediareglog'
        //         }
        //     }
        //   ]

    },{timestamps:true}
)

const Post=model('postdata',postSchema)
export default Post