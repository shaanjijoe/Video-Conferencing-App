import React from "react";
import avatar from '../assets/avatar.png'
import { useAuth } from "../logicscripts/AuthContext";
const Navbar = () => {

    const {username} = useAuth();

    return (
        <div className='navbar'>
            <span className="logo">Conference</span>
            <div className="user">
                <img src={avatar} alt="" />
                <span>{username}</span>
                {/* <button>login</button> */}
            </div>
        </div>
    );
}

export default Navbar;