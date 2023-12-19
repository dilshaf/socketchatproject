import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/apiService'

const AllPost = () => {
  const[details,setDetails]=useState([])
  const[data,setData]=useState({})
  const [showComments, setShowComments] = useState(false);


  const toggleComments = () => {
    setShowComments(!showComments);
  };


  const getAllPosts=async()=>{
    try {
      let response=await axios.get("http://localhost:5000/api/posts/get")
      console.log(response,'getallpost');

      
      
      setDetails(response.data);
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const fetchData = async()=>{
    const response = await getUserById()
    setData(response)
    console.log(response,'responsegetdata');
  }



  useEffect(()=>{
    getAllPosts()
    fetchData()
  },[])
  return (
    <div>
     <div>
      {
        details.map((items)=>{
          return(
            <div  className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-8">
        <div className="flex items-center mb-4">
          <img src={`http://localhost:5000/uploads/${items.userId.image}`} alt="Profile Image" className="w-10 h-10 rounded-full mr-4" />
          
          <div>
            <h2 className="text-lg font-semibold">{items.userId.username}</h2>
            <p className="text-gray-600">Posted on {new Date(items.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <img src={`http://localhost:5000/uploads/${items.image}`} alt="Post Image" className="mb-4 rounded-lg w-full" />
        <div className="mb-4">
          <p className="text-gray-800">{items.description}</p>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center" style={{display:"contents"}}>
            <div className="mr-4 flex items-center space-x-2">
              {/* <svg className="w-4 h-4 fill-current text-blue-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" />
              </svg> */}
            
              {/* <span > <i class="fa-regular fa-heart"  id="likeIcon"></i> Like 0</span> */}

              <span  onClick={() => likePost(items._id)}><i style={  items.likes.length > 0 ? {color:"red"} : {color:"black"}  } class="fa-regular fa-heart"></i> Like {items.likes.length}</span>
              
            </div>
            <div className="mr-4 flex items-center space-x-2">
              {/* <svg className="w-4 h-4 fill-current text-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" />
              </svg> */}
              <span onClick={toggleComments}><i class="fa-regular fa-comment"></i>Comment 0</span>
            </div>
            <div className="mr-4 flex items-center space-x-2 ">
              {/* <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" />
              </svg> */}
              <span><i class="fa-solid fa-share"></i>Share 0</span>
            </div>
          </div>
          {/* <div className="text-sm">
            <span className="mr-2">42 Likes</span>
            <span className="mr-2">18 Comments</span>
            <span>7 Shares</span>
          </div> */}
        </div>

        {showComments && (
          <div className="comments-section border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="comment mb-4">
              <p className="font-semibold">Commenter Name</p>
              <p>This is a comment on the user post. It can contain text and additional information.</p>
            </div>
            {/* More comments can be added here */}
          </div>
        )}
      </div>
          )
        })
      }

      
    </div>
    </div>
  )
}

export default AllPost