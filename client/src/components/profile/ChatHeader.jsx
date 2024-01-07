import React from 'react'

const ChatHeader = ({user}) => {
  return (
    <div>
        <div className='card border-2 border-info w-100'>
            <div className='row vh-95'>
              <div className='d-flex flex-column col-12 col-lg-12 col-xl-12 '>
                <div className='align-items-start py-2 px-4 w-100 border-bottom d-lg-block sticky-top bg-white'>
                  <div className='d-flex align-items-center py-1'>
                    <div className='position-relative'>
                      <img src='' className='rounded-circle mx-2' alt={user.username} width="40" height="40"/>
                    </div>

                    <div className='flex-grow-1'>
                      <strong>Logged in as {user.username}</strong>
                    </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
    </div>
  )
}

export default ChatHeader