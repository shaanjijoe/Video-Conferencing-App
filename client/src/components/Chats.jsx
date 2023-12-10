import React from "react";
import avatar from '../assets/avatar2.png'

const Chats =()=>{
    return (
        <div className="chats">
            <div className="userChat">
                <img src= {avatar} alt={avatar} style={{background:"white"}}/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src= {avatar} alt={avatar} style={{background:"white"}}/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src= {avatar} alt={avatar} style={{background:"white"}}/>
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default Chats;