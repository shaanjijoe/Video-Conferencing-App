import React, { useEffect, useState } from "react";
import avatar from '../assets/avatar2.png'
import { useChat } from "../logicscripts/ChatContext";

const Chats = () => {
  const { chats, setCurrentChat } = useChat();
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatClick = (username) => {
    // Handle the click event for an individual chat
    // console.log(username);
    setCurrentChat(username);
  };

  useEffect(() => {
    // Update chatMessages when chats change
    setChatMessages(chats);
  }, [chats]);

  return (
    <div className="chats">
      {chatMessages && chatMessages.map((user) => {
        const { username, messages } = user;
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

        return (
          <div key={username} className="userChat" onClick={() => handleChatClick(username)}>
            <img src={avatar} alt={avatar} style={{ background: "white" }} />
            <div className="userChatInfo">
              <span>{username}</span>
              <p>{lastMessage ? lastMessage.content : "No messages"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Chats;
