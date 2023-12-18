import React, { useState } from "react";
import Attach from "../assets/attach.png"
import Img from "../assets/img.png"
import Clear from "../assets/clear.png"
import { useChat } from "../logicscripts/ChatContext";
const Input = () => {

    const [textInput, setTextInput] = useState('');
    const [whichContent, setWhichContent] = useState(0);
    const [file, setFile] = useState('');
    const { messageInput }= useChat();
    const clearFunction = () => {
            setTextInput('');
            setFile('');

        setWhichContent(0);
    }
    const handler = () => {
        // console.log(textInput);
        if(whichContent===0)
            return;

        const data = {};
        if(whichContent === 1)
            data.content = textInput;
        else
            data.content = {filename :textInput,file};

        if(whichContent === 1)
            data.messageType = 'text';
        else
        data.messageType = whichContent === 2 ? 'image' : 'file';
        data.timestamp = new Date();
        messageInput(data);
        // setTextInput('');
        clearFunction();
    }
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' 
            onChange={event => {setTextInput(event.target.value); setWhichContent(event.target.value.length>0 ? 1:0)}} 
            value={textInput} disabled={!(whichContent===0 || whichContent===1)}/>
            <div className="send">
                {!(whichContent===0) && <img src={Clear} alt={Clear} onClick={clearFunction}/>}

                <input type="file" style={{ display: "none" }} id="image" disabled={!(whichContent===0 || whichContent===2)} 
                onChange={event => {setFile(event.target.files[0]); setTextInput(event.target.files[0].name);setWhichContent(2)}}/>
                <label htmlFor="image">
                    <img src={Img} alt={Img} />
                </label>


                <input type="file" style={{ display: "none" }} id="file" disabled={!(whichContent===0 || whichContent===3)} 
                onChange={event => {setFile(event.target.files[0]); setTextInput(event.target.files[0].name);setWhichContent(3)}} />
                <label htmlFor="file">
                    <img src={Attach} alt={Attach} />
                </label>
                <button onClick={handler}>Send</button>
            </div>
        </div>
    );
}

export default Input;