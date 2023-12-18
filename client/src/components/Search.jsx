import React, { useState } from "react";
import avatar from '../assets/avatar2.png'
import { useChat } from "../logicscripts/ChatContext";
const Search = () => {
    const {allUsers, setSearching, setCurrentChat } = useChat();
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
                <input type="text" placeholder='Find User' onChange={searchHandler} value={search}/>
            </div>
            { search &&  allUsers && allUsers.map((allusers) => {
                const { username, profileImage } = allusers;

                if(username.includes(search))
                return (
                    <div className="userChat" key={username} onClick={() => {setCurrentChat(username);setSearch(''); setSearching(false);}}>
                        <img src= {profileImage} alt={avatar} style={{background:"white"}}/>
                        <div className="userChatInfo">
                            <span>{username}</span>
                        </div>
                    </div>
                );
                else
                    return <div key={username}/>
            })
            }
        </div>
    )
}

export default Search;