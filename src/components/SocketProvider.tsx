import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "../services/auth/sessionServices";

interface SocketContextType {
  socket: Socket | null;
}
export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const url = "wss://chengkev.online";
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connectSocket = async () => {
      const token = await getToken();
      const socketInstance = io(url, {
        transports: ["websocket"],
        autoConnect: true,
        auth: { token: `Bearer ${token}` },
      });

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected Server");
        //socketInstance.emit('joinRoom', { roomName: 'mobile' });
      });

      socketInstance.on("error", (err) => {
        console.error("connect error:", err);
      });
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
