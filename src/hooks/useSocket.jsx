import { useEffect, useState } from 'react';

export function useSocket() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');

    const updateState = (data) => {
      setMessage(data);
    }

    useEffect(() => {
      const ws = new WebSocket('wss://tso-take-home-chat-room.herokuapp.com');

      ws.addEventListener('open', () => {
        console.log("Connected");
      });

      ws.addEventListener('close', event => {
        console.log("Closed connection", event);
      });

      ws.addEventListener('message', event => {
        updateState(event.data);
      });

      setSocket(ws)
    
      return () => {
        if (socket) {
          socket.close();
        }
      }
      }, []);

    return { message };
}