import React from "react";
import Attach from "../assets/attach.png"
import Img from "../assets/img.png"
const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' />
            <div className="send">
                {/* <img src={Img} alt="" /> */}

                <input type="image" style={{ display: "none" }} id="image" alt="No"/>
                <label htmLFor="image">
                    <img src={Img} alt={Img} />
                </label>


                <input type="file" style={{ display: "none" }} id="file" />
                <label htmLFor="file">
                    <img src={Attach} alt={Attach} />
                </label>
                <button>Send</button>
            </div>
        </div>
    );
}

export default Input;