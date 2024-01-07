import React from 'react'

const ChatContainer = (props) => {
  return (
    <div>
      <div className='row h-100'> {props.children}</div> 
    </div>
  )
}

export default ChatContainer