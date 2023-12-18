import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { socket } from './socket'
import { useAuth } from "./AuthContext";
import processMessages from "./processMessages";
const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const { username } = useAuth();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [profilePic, setProfilePic] = useState('');
    const [chats, setChats] = useState();
    const [searching, setSearching] = useState(false);
    const [currentChat, setCurrentChat] = useState();
    const [allUsers, setAllUsers] = useState([]);

    // Function to update token value
    // const login = (newAuthToken) => {
    //     setAuthToken_(newAuthToken);
    //     AuthenticateUser(true);
    // };

    const messageInput = (data) => {
      data.receiver = currentChat;
      data.sender = username;
      // console.log(data);

      if(isConnected){
        socket.emit('message-input', data);
      }
    }

   

    useEffect(()=> {
        function onConnect() {
            setIsConnected(true);
          }
      
          function onDisconnect() {
            setIsConnected(false);
          }
      
          function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
          }

          if(isConnected){
            socket.emit('initiate');
            socket.emit('getcontent');
          }

            socket.on('initiate-response', (responseData) => {
              setProfilePic(responseData.profileImage);
              setAllUsers(responseData.allUsers);
              // console.log(responseData.allUsers);
            });

            socket.on('getcontent-response', (texts) => {
              // console.log(texts.texts);
              setChats(processMessages(texts.texts,username));
            });

            socket.on('message-update', () => {
              socket.emit('getcontent');
            })
      
          socket.on('connect', onConnect);
          socket.on('disconnect', onDisconnect);
          socket.on('foo', onFooEvent);
      
          return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
            socket.off('initiate-response');
            socket.off('getcontent-response');
            socket.off('message-update');
          };
    },[]);

    // Memoized value of authentication context
    const contextValue = useMemo(()=>({isConnected, fooEvents, profilePic, chats, 
      setSearching, searching, setCurrentChat, currentChat, messageInput, allUsers}), [isConnected, fooEvents, profilePic, chats, searching,currentChat, allUsers]);

    return (<ChatContext.Provider value = {contextValue}>
            {children}
        </ChatContext.Provider>);

};


export const useChat = () => {
    return useContext(ChatContext);
  };


export default ChatProvider;