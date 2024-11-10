
import { useEffect, useState } from 'react';
import { Constants } from '@/src/constants/Constants';

export default function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!Constants.URL_WS) {
      console.log('WebSocket URL is not defined')
      return;
    } else {
      const ws = new WebSocket(Constants.URL_WS);

      ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send('client connected')
      };

      ws.onmessage = (event: any) => {
        console.log('Received:', event.data);
      };

      ws.onerror = (error: any) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };
      setSocket(ws);

      return () => {
        ws.close()
        console.log('WebSocket closed during cleanup')
      };
    }
  }, []);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN && message !== null) {
      socket.send(message);
      console.log('Message sent', message)
    } else if (message !== null) {
      console.warn('Unable to send message,websocket is not open', socket?.readyState);
    } else {
      console.log('message is null', message)
    }
  };

  return { socket, sendMessage };
}
