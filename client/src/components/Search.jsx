import React, { useState } from "react";
import avatar from '../assets/avatar2.png'
import { useChat } from "../logicscripts/ChatContext";
const Search = () => {
    const {setSearching } = useChat();
    const [search, setSearch] = useState('');
    const searchHandler = event =>{
        setSearch(event.target.value);

        if(event.target.value.length===0)
            setSearching(false);
        else
            setSearching(true);
        
    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Find User' onChange={searchHandler}/>
            </div>
            { search &&  <div className="userChat">
                <img src= {avatar} alt={avatar} style={{background:"white"}}/>
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;