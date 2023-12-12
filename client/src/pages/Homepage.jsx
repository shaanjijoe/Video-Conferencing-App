import React from "react";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../componentcss/HomePage.scss"
import ChatProvider from "../logicscripts/ChatContext";
const HomePage = () => {
    return (
        <ChatProvider>
            <Background>
                <div className="home">
                    <div className="container2">
                        <Chat/>
                        <Sidebar/>
                    </div>
                </div>
            </Background>
        </ChatProvider>
    );
}

export default HomePage;