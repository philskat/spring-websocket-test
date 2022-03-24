package de.philskat.websocketdemo.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import de.philskat.websocketdemo.models.Greeting;
import de.philskat.websocketdemo.services.GreetingService;

@Controller
public class GreetingController {
  
  @Autowired
  private GreetingService greetingService;

  // Send inital data when subscribing to the event
  @SubscribeMapping("/greeting")
  public ArrayList<Greeting> initalData() {
    return greetingService.getGreetings();
  }

  @MessageMapping("/addGreeting")
  @SendTo("/topic/greeting")
  public Greeting addGreeting(String name) {
    Greeting greeting = new Greeting(name);
    greetingService.addGreeting(greeting);

    return greeting;
  }
}
