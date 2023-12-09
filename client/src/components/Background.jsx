import React from "react";
import BackgroundImage from "../assets/background.png";

const Background = ({children})=>{
    return (
        <div className="sign-in__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
            {children}
        </div>
    );
}

export default Background;