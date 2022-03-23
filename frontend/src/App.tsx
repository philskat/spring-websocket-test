import { Client } from '@stomp/stompjs';
import React, { createContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import GreetingDisplay from './components/GreetingDisplay';

// Create Stomp client
let stompClient = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/test'), // using SockJS
  // a few statuses
  onConnect: () => console.log('Connected'),
  onDisconnect: () => console.log('Disconneced'),
  onWebSocketError: () => console.log('Error'),
});

// Context to provice Client in components
export const WebSocketClientContext = createContext(stompClient);

function App() {
  // State of connection for redering
  const [connected, setConnected] = useState(false);

  // On Mount active client to connect
  useEffect(() => {
    stompClient.activate();

    stompClient.onConnect = () => {
      stompClient.subscribe('/app/greeting', (msg) => {
        console.log('Initial data: ' + msg.body);
      });
      setConnected(true);
    };

    stompClient.onDisconnect = () => {
      setConnected(false);
    };
  }, [setConnected]);

  if (!connected) {
    return <h1>Loading...</h1>;
  }

  return (
    <WebSocketClientContext.Provider value={stompClient}>
      <GreetingDisplay />
    </WebSocketClientContext.Provider>
  );
}

export default App;
