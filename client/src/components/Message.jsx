import React from "react";
import avatar from "../assets/avatar2.png"
const Message = () => {
    // If owner in classname of first div tag, the message becomes owner style
    return (
        <div className="message">
            <div className="messageInfo">
                <img src={avatar} alt={avatar} style={{background: "white"}}/>
                <span>Just now</span>
            </div>
            <div className="messageContent">
                {/* <p>Hello</p> */}
                <img src={avatar} alt={avatar} style={{background: "white"}}/>
            </div>
        </div>
        
    )
}

export default Message;