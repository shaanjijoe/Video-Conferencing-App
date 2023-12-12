import React from "react";
import Cam from "../assets/cam.png"
import Add from "../assets/add.png"
import More from "../assets/more.png"
import Messages from "./Messages";
import Input from "./Input";
import connected from "../assets/connected.png"
import notconnected from "../assets/notconnected.png"
import { useChat } from "../logicscripts/ChatContext";
const Chat = () => {

    const {isConnected} = useChat();

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Jane</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                    <img src={isConnected? connected:notconnected} alt="" />
                </div>
            </div>

            <Messages/>
            <Input/>
        </div>
    );
}

export default Chat;