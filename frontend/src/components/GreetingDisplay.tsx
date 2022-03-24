import { FC, useContext, useEffect, useReducer } from 'react';
import { WebSocketClientContext } from '../App';
import { GreetingReducer } from '../models/Greeting';

const GreetingDisplay: FC = () => {
  // Get stomp client from context
  const stompClient = useContext(WebSocketClientContext);

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
    // Inital data gathering
    stompClient.subscribe('/app/greeting', (msg) => {
      const data = JSON.parse(msg.body);

      console.log('Initial data: ', data);

      // Add greetings to list
      dispatchGreeting({ type: 'INIT', greetings: data });
    });

    // Subscribe to the greeting event to receive new messages
    stompClient.subscribe('/topic/greeting', (msg) => {
      const data = JSON.parse(msg.body);
      console.log('Update: ', data);

      // Add greeting to list
      dispatchGreeting({ type: 'ADD', greeting: data });
    });
  }, [stompClient, dispatchGreeting]);

  return (
    <ul>
      {greetings.map((greeting) => (
        <li>{greeting.content}</li>
      ))}
    </ul>
  );
};

export default GreetingDisplay;
