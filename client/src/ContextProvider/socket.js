import socketio from 'socket.io-client';
import { createContext } from 'react';

export const socket = socketio.connect('/');
export const SocketContext = createContext();
