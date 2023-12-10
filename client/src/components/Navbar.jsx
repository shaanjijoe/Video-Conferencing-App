import React from "react";
import avatar from '../assets/avatar.png'
const Navbar = () => {
    return (
        <div className='navbar'>
            <span className="logo">Conference</span>
            <div className="user">
                <img src={avatar} alt="" />
                <span>John</span>
                <button>login</button>
            </div>
        </div>
    );
}

export default Navbar;