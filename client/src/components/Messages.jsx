import React from "react";
import Message from "./Message";
// import { useChat } from "../logicscripts/ChatContext";
const Messages = () => {
    // const { chats } = useChat();
    // console.log(chats);
    return (
        <div className="messages">
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
    );
}

export default Messages;