package de.philskat.websocketdemo.controllers;

import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import de.philskat.websocketdemo.models.Greeting;

@Controller
public class GreetingController {
  
  // Send inital data when subscribing to the event
  @SubscribeMapping("/greeting")
  public Greeting[] initalData() {
    Greeting[] initialGreetings = { new Greeting() };

    return initialGreetings;
  }
}
