import React from 'react'
import './CommentSection.css'
import OneComment from './OneComment'

const CommentSection = () => {
    
  return (


    <div style={{width: "50%",
        marginLeft: "2rem",overflow:"scroll",height:"300px"}}>
            
        <div className="search-bar">
    <input type="text" placeholder="Comment on this post....."/>
    
</div>

<div className="comments-container">
    <div className="comment">
        <p>Comments</p>

        <div style={{display:"flex"}}>

        <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' className='post-avatar'/>

        <div>
        <div className="comment-author">John Doe</div>
        <div className="comment-text">This is a great post!</div>
        </div>
        </div>



        <div className="comment-actions">
            <button>Like<i class="fa-regular fa-heart"></i></button>
            <button>Reply Comment<i class="fa-regular fa-comment"></i></button>
            <button>Share<i class="fa-solid fa-share"></i></button>
        </div>
        <p style={{textAlign:"center",color:"blue",marginTop:"1rem"}}>View all comments</p>
    </div>

  
 
    

   
</div>
<OneComment/>
    </div>
  )
}

export default CommentSection