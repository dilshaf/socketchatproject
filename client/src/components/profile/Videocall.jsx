import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const Room = () => {
  const [myVideoStream, setMyVideoStream] = useState(null);
  const [peers, setPeers] = useState([]);
  const myVideoRef = useRef();

  useEffect(() => {
    const socket = io('/');
    const myPeer = new Peer();
    const peers = [];

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyVideoStream(stream);
        addVideoStream(myVideoRef.current, stream);

        myPeer.on('call', (call) => {
          call.answer(stream);
          const video = document.createElement('video');
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
          peers.push({ call, video });
          setPeers([...peers]);
        });

        socket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream, myPeer);
        });
      });

    myPeer.on('open', (id) => {
      socket.emit('join-room', ROOM_ID, id);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  function connectToNewUser(userId, stream, myPeer) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });

    call.on('close', () => {
      removePeer(call);
    });

    peers.push({ call, video });
    setPeers([...peers]);
  }

  function removePeer(call) {
    const updatedPeers = peers.filter((peer) => peer.call !== call);
    setPeers(updatedPeers);
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  }

  return (
    <div>
      <div id="video-grid">
        <video ref={myVideoRef} muted playsInline />
        {peers.map(({ video }, index) => (
          <video key={index} playsInline autoPlay />
        ))}
      </div>
    </div>
  );
};

export default Room;
