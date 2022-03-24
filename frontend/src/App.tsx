import { Client } from '@stomp/stompjs';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import GreetingDisplay from './components/GreetingDisplay';
import ClientHandler from './utils/ClientHandler';

// Create Stomp client
let clientHandler = new ClientHandler(
  new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/test'), // using SockJS
  })
);

// Context to provice Client in components
export const WebSocketClientContext = createContext(clientHandler);

function App() {
  const [user, setUser] = useState('');

  const handleClick = useCallback(() => {
    if (user === '') {
      return;
    }

    clientHandler.publish({ destination: '/app/addGreeting', body: user });
  }, [user]);

  // On Mount (start of app) active client to connect
  useEffect(() => {
    clientHandler.getClient().activate();
  }, []);

  return (
    <WebSocketClientContext.Provider value={clientHandler}>
      <input
        type='text'
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>
      <GreetingDisplay />
    </WebSocketClientContext.Provider>
  );
}

export default App;
