import React, { useCallback, useEffect,useState } from 'react'
import Chat from './Chat'
import NewUser from './NewUser'

const Main = ({socket}) => {
    const[newUser,setNewUser]=useState("")
  const[user,setUser]=useState({})
  const[users,setUsers]=useState([])
  const[message,setMessage]=useState("")
  const[messages,setMessages]=useState([])

  function handleChange(e){
    //console.log(e.target.value);
         setNewUser(e.target.value)
  }
//   useEffect(()=>{
//     socket.on("users",(users)=>{
//         //console.log(users);
//         const messageArr=[]
//         for(const {userId,username} of users){
//          const newMessage={type:"UserStatus",userId,username}
//          messageArr.push(newMessage)
//         }
//  setMessages([...messages,...messageArr])
//  setUsers(users)
//     })
//     socket.on("session",({userId,username})=>{
//         setUser(username,userId)
//     })
//   },[socket,messages])


const checkIfUserExists=useCallback(()=>{
    const sessionId=localStorage.getItem("sessionId")
    if(sessionId){
        socket.auth={sessionId:sessionId}
        socket.connect()
    }
},[socket])
useEffect(() => {

    checkIfUserExists()

    socket.on("connect",()=>{
        //console.log("connected");
    })
    
    socket.on("disconnect", () => {
        //console.log("disconnected");
    });
  
    socket.on("session",({sessionId,userId,username})=>{
        socket.auth={sessionId:sessionId}
        localStorage.setItem("sessionId",sessionId)
        setUser({userId,username})
    })

    socket.on("users", (users) => {
    // //console.log(users)
    setUsers(users);
    });
  
    // socket.on("session", ({ sessionId,userId, username }) => {
    //   // Corrected setUser call
    //   socket.auth={sessionId:sessionId}
    //   localStorage.setItem("sessionId",sessionId)
    //   setUser({ userId, username });
    // });
    // socket.on("user connected",({userId,username})=>{
    //     const newMessage={type:"UserStatus",userId,username}
    //     setMessages([...messages,newMessage])
    // })
    // socket.on("new message",({userId,username,message})=>{
    //     const newMessage={
    //         type:"message",
    //         userId:userId,
    //         username:username,
    //         message
    //     }
    //     setMessages([...messages,newMessage])
    // })
  }, [socket, messages,checkIfUserExists]);
  
 

  const  logNewUser=()=>{
    setUser(newUser)
    socket.auth={username:newUser}
    socket.connect()
  }

  function sendMessage(){
    socket.emit("new message",message)
    const newMessage={type:"message",userId:user.userId,username:user.username,message}
    setMessages([...messages,newMessage])
    setMessage("")
  }

  // //console.log(user,'user');   //currentuser,userId
  // //console.log(users,'setUsers');  //frnds of current user id,connected status,name,message
  // //console.log(messages,'message');  user,messages
  return (
    <div>
          <div className='content'>
      <div className='container mt-3'>
        {user.userId 
       
        &&(
          
         <Chat user={user} setUsers={setUsers} message={message} messages={messages} sendMessage={sendMessage} users={users} socket={socket} setMessages={setMessages}/>
        )}
        {!user.userId && (
       <NewUser newUser={newUser} handleChange={handleChange} logNewUser={logNewUser}/>

        )}
      </div>
    </div>
    </div>
  )
}

export default Main