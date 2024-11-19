import { useContext } from "react";

import { SocketContext } from "@/src/components/SocketProvider";

export const useWebScoket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useWebScoket must be used within a WebSocketProvider");
  }

  return context;
};
