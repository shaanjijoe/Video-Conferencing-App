import React from "react";
import avatar from "../assets/avatar2.png";

const Message = ({ isClient, messageType, content , timestamp}) => {
  const messageClassName = isClient ? "message owner" : "message";

  function extractDateAndTime(timestamp) {
    const dateObj = new Date(timestamp);
  
    // Extract date components
    // const year = dateObj.getFullYear();
    // const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    // const day = String(dateObj.getDate()).padStart(2, '0');
  
    // Extract time components
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    // const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
    // Create formatted date and time strings
    // const formattedDate = `${year}-${month}-${day}`;
    // const formattedTime = `${hours}:${minutes}:${seconds}`;
    const time = `${hours}:${minutes}`;
  
    return  time ;
  }

  return (
    <div className={messageClassName}>
      <div className="messageInfo">
        <img src={avatar} alt={avatar} style={{ background: "white" }} />
        <span>{extractDateAndTime(timestamp)}</span>
      </div>
      <div className="messageContent">
        {messageType === "text" ? (
          <p>{content}</p>
        ) : (
          <img src={content} alt={avatar} style={{ background: "white" }} />
        )}
      </div>
    </div>
  );
}

export default Message;
