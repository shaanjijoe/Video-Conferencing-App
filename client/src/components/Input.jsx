import React, { useState } from "react";
import Attach from "../assets/attach.png"
import Img from "../assets/img.png"
import { useChat } from "../logicscripts/ChatContext";
const Input = () => {

    const [textInput, setTextInput] = useState('');
    const { messageInput }= useChat();
    const handler = () => {
        // console.log(textInput);
        if(textInput === '')
            return;

        const data = {};
        data.content = textInput;
        data.messageType = 'text';
        data.timestamp = new Date();
        messageInput(data);
        setTextInput('');
    }
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' onChange={event => {setTextInput(event.target.value)}} value={textInput}/>
            <div className="send">
                {/* <img src={Img} alt="" /> */}

                <input type="image" style={{ display: "none" }} id="image" alt="No" disabled={true}/>
                <label htmlFor="image">
                    <img src={Img} alt={Img} />
                </label>


                <input type="file" style={{ display: "none" }} id="file" disabled={true}/>
                <label htmlFor="file">
                    <img src={Attach} alt={Attach} />
                </label>
                <button onClick={handler}>Send</button>
            </div>
        </div>
    );
}

export default Input;