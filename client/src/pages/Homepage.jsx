import React from "react";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../componentcss/HomePage.scss"
const HomePage = () => {
    return (
        <Background>
            <div className="home">
                <div className="container2">
                    <Chat/>
                    <Sidebar/>
                </div>
            </div>
        </Background>
    );
}

export default HomePage;