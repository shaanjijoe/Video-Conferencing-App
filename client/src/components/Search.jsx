import React from "react";
import avatar from '../assets/avatar.png'

const Search = () => {
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Find User' />
            </div>
            <div className="userChat">
                <img src= {avatar} alt={avatar} style={{background:"white"}}/>
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search;