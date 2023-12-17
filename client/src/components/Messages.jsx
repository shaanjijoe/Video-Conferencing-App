import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChat } from "../logicscripts/ChatContext";
const Messages = () => {
    const { chats , currentChat} = useChat();
    const [selectedUserMessages, setSelectedUserMessages] = useState();
    useEffect(()=>{
        const temp = chats &&  (chats.find((user) => user.username === currentChat)?.messages || []);
        setSelectedUserMessages(temp);
        // console.log(temp);
    },[chats, currentChat])
    // console.log(chats);
    return (
        <div className="messages">
            {selectedUserMessages &&  (selectedUserMessages.map((message, index) => (
                <Message
                    key={index}
                    isClient={message.isClient}  // Replace with the actual property name
                    messageType={message.messageType}  // Replace with the actual property name
                    content={message.content} //sk
                    timestamp={message.timestamp}
                />
            )))}
        </div>
    );
}

export default Messages;