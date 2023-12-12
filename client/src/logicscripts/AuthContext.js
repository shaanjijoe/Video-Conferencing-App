import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    // State to hold token value
    const [authToken, setAuthToken_] = useState(() => localStorage.getItem('token') || '');
    const [isAuthenticated, AuthenticateUser] = useState(false);
    const [username, setUsername] = useState('');

    // Function to update token value
    const login = (newAuthToken) => {
        setAuthToken_(newAuthToken);
        AuthenticateUser(true);
    };

    const logout = () => {
        setAuthToken_('');
        AuthenticateUser(false);
    }

    // const isAuthenticated = () => {
    //     return !!authToken;
    //   };

    useEffect(()=> {

        if(authToken){
            localStorage.setItem('authToken', authToken);
        } else {
            // localStorage.removeItem('authToken');
        }

    },[authToken]);

    // Memoized value of authentication context
    const contextValue = useMemo(()=>({authToken, login, logout, isAuthenticated, username, setUsername}), [authToken, isAuthenticated, username]);

    return (<AuthContext.Provider value = {contextValue}>
            {children}
        </AuthContext.Provider>);

};


export const useAuth = () => {
    return useContext(AuthContext);
  };


export default AuthProvider;