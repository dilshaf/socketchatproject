import React from 'react'
import './PostSession.css'
import { Link } from 'react-router-dom'
import CommentSection from './CommentSection'


const PostSession = () => {
  
  return (
    <div>
        <div className="post-container">
    <div className="post-header">
      <img className="post-avatar" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="User Avatar"/>
      <div className="post-user-info">
        <div className="post-user-name">User Name</div>
        <div className="post-posted-time">Posted on: October 10, 2023</div>
      </div>
    </div>
    <div className="post-content">
      <img src='https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg' alt=''/>
    </div>
    <div className="post-actions">
      <div className="action-button">
        <div className="action-icon"><i class="fa-regular fa-heart"></i></div>
        Like
      </div>



      

      <Link to={'comments'}>
      <div className="action-button">
       <div className="action-icon"><i class="fa-regular fa-comment"></i></div>
        Comment
      </div>
      </Link>






      <div className="action-button">
        <div className="action-icon"><i class="fa-solid fa-share"></i></div>
        Share
      </div>
    </div>
  </div>






  <div className="post-container">
    <div className="post-header">
      <img className="post-avatar" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="User Avatar"/>
      <div className="post-user-info">
        <div className="post-user-name">User Name</div>
        <div className="post-posted-time">Posted on: October 10, 2023</div>
      </div>
    </div>
    <div className="post-content">
      <img src='https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg' alt=''/>
    </div>
    <div className="post-actions">
      <div className="action-button">
        <div className="action-icon"><i class="fa-regular fa-heart"></i></div>
        Like
      </div>



      

      {/* <Link to={'comments'}> */}
      <div className="action-button">
       <div className="action-icon" onClick={<CommentSection/>}><i class="fa-regular fa-comment"></i></div>
        Comment
      </div>
      {/* </Link> */}






      <div className="action-button">
        <div className="action-icon"><i class="fa-solid fa-share"></i></div>
        Share
      </div>
    </div>
  </div>


  
    </div>
  )
}

export default PostSession