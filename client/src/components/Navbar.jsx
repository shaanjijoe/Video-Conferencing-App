import React from "react";
import avatar from '../assets/avatar.png'
import { useAuth } from "../logicscripts/AuthContext";
import { useChat } from "../logicscripts/ChatContext";
const Navbar = () => {

    const {username} = useAuth();
    const {profileImage} = useChat();
    return (
        <div className='navbar'>
            <span className="logo">Conference</span>
            <div className="user">
                <img src={ profileImage || avatar} alt="" />
                <span>{username}</span>
                {/* <button>login</button> */}
            </div>
        </div>
    );
}

export default Navbar;