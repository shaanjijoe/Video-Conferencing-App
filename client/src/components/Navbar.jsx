import React from "react";
import avatar from '../assets/avatar.png'
import { useAuth } from "../logicscripts/AuthContext";
import { useChat } from "../logicscripts/ChatContext";
const Navbar = () => {

    const {username} = useAuth();
    const {profilePic} = useChat();
    return (
        <div className='navbar'>
            <span className="logo">Conference</span>
            <div className="user">
                <img src={ profilePic || avatar } alt={avatar} />
                <span>{username}</span>
                {/* <button>login</button> */}
            </div>
        </div>
    );
}

export default Navbar;