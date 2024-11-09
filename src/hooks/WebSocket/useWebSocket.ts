
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Constants } from '@/src/constants/Constants';

export default function useWebSocket() {
  const socket = useRef<WebSocket | null>(null);
  useEffect(() => {

    socket.current = new WebSocket(Constants.URL_WS);

    socket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.current.onmessage = (event: any) => {
      console.log('Received:', event.data);
    };

    socket.current.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };

    socket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);
  const sendMessage = (message: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
      console.log('Sent:', message);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return { sendMessage };
}
