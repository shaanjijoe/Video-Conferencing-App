import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';
// "undefined" means the URL will be computed from the `window.location` object
// const { authToken } = useAuth();
const authToken = localStorage.getItem('authToken');
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL, {
    auth: {
      authToken: authToken
    }
  });

//   export const socket = io(URL);