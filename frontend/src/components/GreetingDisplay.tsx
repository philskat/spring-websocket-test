import { FC, useContext, useEffect } from 'react';
import { WebSocketClientContext } from '../App';

const GreetingDisplay: FC = () => {
  // Get stomp client from context
  const stompClient = useContext(WebSocketClientContext);

  useEffect(() => {
    // Subscribe to the greeting event to receive new messages
    stompClient.subscribe('/app/greeting', (msg) => {
      console.log(msg.body);
    });
  }, [stompClient]);

  return <div></div>;
};

export default GreetingDisplay;
