import React from 'react'
import './OneComment.css'

const OneComment = () => {
  return (
    <div className='comments-container'>
          <div className="comment">

            <div style={{display:'flex'}}>
            
          <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' className='post-avatar'/>


         <div>

        <div className="comment-author">Jane Smith</div>
        <div className="comment-text">I agree with John, excellent content!</div>
        </div>

        </div>




        <div className="comment-actions">
        <button>Like<i class="fa-regular fa-heart"></i></button>
            <button>Reply Comment<i class="fa-regular fa-comment"></i></button>
            <button>Share<i class="fa-solid fa-share"></i></button>
        </div>
    </div>



    <div className="comment">

<div style={{display:'flex'}}>

<img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' className='post-avatar'/>


<div>

<div className="comment-author">Jane Smith</div>
<div className="comment-text">I agree with John, excellent content!</div>
</div>

</div>




<div className="comment-actions">
<button>Like<i class="fa-regular fa-heart"></i></button>
<button>Reply Comment<i class="fa-regular fa-comment"></i></button>
<button>Share<i class="fa-solid fa-share"></i></button>
</div>
</div>
    </div>
  )
}

export default OneComment