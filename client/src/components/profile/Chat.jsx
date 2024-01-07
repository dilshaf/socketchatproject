import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput"; //53:04
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
import ChatBody from "./ChatBody";
import "./Chat.css";

// import ScrollableFeed from "react-scrollable-feed"

const Chat = ({ user, messages, setMessages, socket, users, setUsers }) => {
  const [message, setMessage] = useState("");
  const [selecteduser, setSelectedUser] = useState({});
  const currentSelectedUser = useRef({});

  const findUser = useCallback(
    (userId) => {
      const userIndex = users.findIndex((user) => user.userId === userId);
      return userIndex >= 0;
    },
    [users]
  );
  const handleConnectionStatus = useCallback(
    (userId, status, newUser) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      if (userIndex >= 0) {
        users[userIndex].connected = true;
        setUsers([...users, newUser]);
      }
    },
    [users, setUsers]
  );
  const userConnected = useCallback(
    ({ userId, username }) => {
      if (user.userId !== userId) {
        const userExists = findUser(userId);
        if (userExists) {
          handleConnectionStatus(userId, true);
        } else {
          const newUser = { userId, username, connected: true };
          setUsers([...users, newUser]);
        }
      }
    },
    [user, users, setUsers, handleConnectionStatus, findUser]
  );

  const userDisconnected = useCallback(
    ({ userId }) => handleConnectionStatus(userId, false),
    [handleConnectionStatus]
  );

  const handleNewMessageStatus = useCallback(
    (userId, status) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      if (userIndex >= 0) {
        users[userIndex].hasNewMessage = status;
        setUsers([...users]);
      }
    },
    [setUsers, users]
  );
  const privateMessage = useCallback(
    ({ content, from, to }) => {
      if (currentSelectedUser.current.userId) {
        if (currentSelectedUser.current.userId === from) {
          const newMessage = {
            userId: from,
            // username:from.username,
            message: content,
          };
          setMessages([...messages, newMessage]);
        } else {
          handleNewMessageStatus(from, true);
        }
      } else {
        handleNewMessageStatus(from, true);
      }
    },
    [setMessages, messages, handleNewMessageStatus, selecteduser]
  );

  const userMessages = useCallback(({ messages }) => {
    const chatMessages = [];
    messages.forEach(({ content, from }) => {
      chatMessages.push({ userId: from, message: content });
      setMessages([...chatMessages]);
    });
  }, [setMessages]);
  useEffect(() => {
    socket.on("user connected", (user) => userConnected(user));

    socket.on("user disconnected", (user) => userDisconnected(user));

    socket.on("private message", (message) => privateMessage(message));
    socket.on("user messages", (message) => userMessages(messages));
  }, [socket, userConnected, userDisconnected, privateMessage,userMessages]);

  const sendMessage = () => {
    socket.emit("private message", {
      content: message,
      to: selecteduser.userId,
    });

    const newMessage = {
      userId: user.userId,
      username: user.username,
      message,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const selectedUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
    currentSelectedUser.current = user;
    socket.emit("user message", user);
    handleNewMessageStatus(user.userId, false);
  };

  return (
    <ChatContainer>
      <div className="d-flex flex-column col-4 col-lg-4 col-xl-4 pe-0">
        <div className="card border-2 border-info w-100">
          <div className="row vh-95">
            <div className="d-flex flex-column col-12 col-lg-12 col-xl-12 ">
              <div className="align-items-start py-2 px-4 w-100 border-bottom d-lg-block sticky-top bg-white"></div>
              <div className="flex-grow-1">{user.username}</div>
            </div>
            <div className="text-center bg-primary">Connected users</div>
            {users?.length > 0 ? (
              users.map((user, index) => {
                console.log(user.username, "user");
                return (
                  <div
                    key={index}
                    className="py-2 px-2 border-bottom"
                    onClick={() => selectedUser(user)}
                  >
                    <div className="d-flex  flex-column align-items-center py-1">
                      <div className="position-relative">
                        <img
                          src=""
                          className="rounded-circle mx-2"
                          alt={user.username}
                          width="40"
                          height="40"
                        />
                      </div>
                      <span
                        className={user.connected ? "online" : "offline"}
                      ></span>
                      <div className="flex-grow-1">
                        <strong>{user?.username}</strong>
                      </div>
                      <span
                        className={
                          user.hasNewMessage ? "new-message-alert" : ""
                        }
                      ></span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="d-flex justify-content-center align-items-center ">
                No users connected
              </div>
            )}
          </div>
        </div>
      </div>
      {selecteduser.userId && (
        <div className="d-flex flex-column col-8 col-lg-8 col-xl-8 ps-0 ">
          <ChatHeader user={selecteduser} />

          <ChatBody user={user} messages={messages} />
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </ChatContainer>
  );
};

export default Chat;
