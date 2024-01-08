// import React, { useState } from 'react'
// import {io} from 'socket.io-client'
// import Main from './Main'
// // const socket = io("http://localhost:8000");
// const Message = () => {
  

//   return (
//   <Main socket={socket}/>
//   )
// }

// export default Message




import React from 'react';
import { io } from 'socket.io-client';
import Main from './Main';

// Ensure that the URL matches your server's location
const socket = io('ws://localhost:8009', {
  path: '/socket.io',
  transports: ['websocket'],
});

//error avoid 
socket.on("connect", () => {
  const transport = socket.io.engine.transport.name; // in most cases, "polling"

  socket.io.engine.on("upgrade", () => {
    const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
  });
});


const Message = () => {
  return <Main socket={socket} />;
}

export default Message;
