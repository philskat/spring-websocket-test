package de.philskat.websocketdemo.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WebSocketSubscribeEvent implements ApplicationListener<SessionSubscribeEvent> {

  @Autowired
  private SimpMessagingTemplate template;

  // Called on subscription, send inital message to the user that connected
  @Override
  public void onApplicationEvent(SessionSubscribeEvent event) {
    template.convertAndSend("/app/greeting", "Hello");
  }

}
