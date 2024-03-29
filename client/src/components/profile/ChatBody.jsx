import React from 'react'

const ChatBody = ({user,messages}) => {
  return (
    <div>
        <div className='position-relative chat-height overflow-auto' style={{height:"16rem"}}>

    <div className='d-flex flex-column p-4'>
{messages.map((message,index)=>{
    return message.type==="UserStatus" ? <div key={index} className='text-center'>
        {/* <span className='badge bg-info'>
            {message.userId===user.userId ? "You have joined" : `${message.username} has joined`}
        </span> */}
    </div> : (
        <div key={index} className={message.userId===user.userId?"chat-message-right pb-4" : "chat-message-left pb-4"}>
            <div>
                {/* <img src='' className='rounded-circle mr-1' alt={message.username} title={message.username} width="40" height="40"/> */}
              
            </div>
            <div className='flex-shrink-1 bg-light rounded py-2 px-3 ml-3'>
                {/* <div className='font-weight-bold mb-1'>
                    {message.userId===user.userId?"You" :message.username}
                </div> */}
                {message.message}
            </div>

            <div className='text-muted small text-nowrap mt-2'>
                    12:00 AM
                </div>

        </div>
    )
})}
    </div>

</div>
    </div>
  )
}

export default ChatBody