import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useChat } from "../logicscripts/ChatContext";
const Sidebar =()=>{
    const {searching} = useChat();
    return (
        <div className="sidebar">
            <Navbar/>
            <Search/>
            {!searching && <Chats/>}
        </div>
    );
}

export default Sidebar;