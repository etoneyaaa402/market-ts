import { useState, useEffect, useCallback, useRef } from 'react';
import { type ChatMessage } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.ifelse.io');
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    
    socket.onmessage = (event) => {
        const data = event.data;
        if (typeof data === 'string' && data.startsWith('Request served by')) {
          console.log('System message ignored:', data);
          return;
        }
  
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: data,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    return () => socket.close();
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const userMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      socketRef.current.send(text);
    }
  }, []);

  return { messages, sendMessage, isConnected };
};