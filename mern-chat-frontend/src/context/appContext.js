import {io} from 'socket.io-client';
import React from 'react';
const SOCKET_URL = "http://localhost:5001";
export const socket = io(SOCKET_URL);

//app constext 
export const AppContext = React.createContext();