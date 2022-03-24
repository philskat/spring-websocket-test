import { ActivationState, StompSubscription } from '@stomp/stompjs';
import { FC, useContext, useEffect, useReducer, useState } from 'react';
import { WebSocketClientContext } from '../App';
import { GreetingReducer } from '../models/Greeting';
import EventHandler, { StompEvents } from '../utils/ClientHandler';

const GreetingDisplay: FC = () => {
  // Get stomp client from context
  const stompClient = useContext(WebSocketClientContext);
  const [subscriptions, setSubscriptions] = useState<StompSubscription[]>([]);

  // Mange greetings list with actions
  const [greetings, dispatchGreeting] = useReducer<GreetingReducer>(
    (state, action) => {
      switch (action.type) {
        // Inital data
        case 'INIT':
          return action.greetings;

        // New message
        case 'ADD':
          return [...state, action.greeting];

        default:
          return state;
      }
    },
    []
  );

  // OnMount of the component
  useEffect(() => {
    stompClient.addEventListener(StompEvents.Connect, () => {
      stompClient.subscribe('/app/greeting', (msg) => {
        dispatchGreeting({ type: 'INIT', greetings: JSON.parse(msg.body) });
      });

      stompClient.subscribe('/topic/greeting', (msg) => {
        dispatchGreeting({ type: 'ADD', greeting: JSON.parse(msg.body) });
      });
    });
  }, [dispatchGreeting]);

  return (
    <ul>
      {greetings.map((greeting, index) => (
        <li key={index}>{greeting.content}</li>
      ))}
    </ul>
  );
};

export default GreetingDisplay;
