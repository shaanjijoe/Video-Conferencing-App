import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { socket } from './socket'

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [profilePic, setProfilePic] = useState('');

    // Function to update token value
    // const login = (newAuthToken) => {
    //     setAuthToken_(newAuthToken);
    //     AuthenticateUser(true);
    // };

   

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
          }

            socket.on('initiate-response', (responseData) => {
              // Process the data returned by the server
              console.log(responseData.profileImage);
              setProfilePic(responseData.profileImage);
            });
      
          socket.on('connect', onConnect);
          socket.on('disconnect', onDisconnect);
          socket.on('foo', onFooEvent);
      
          return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
          };
    },[]);

    // Memoized value of authentication context
    const contextValue = useMemo(()=>({isConnected, fooEvents, profilePic}), [isConnected, fooEvents, profilePic]);

    return (<ChatContext.Provider value = {contextValue}>
            {children}
        </ChatContext.Provider>);

};


export const useChat = () => {
    return useContext(ChatContext);
  };


export default ChatProvider;