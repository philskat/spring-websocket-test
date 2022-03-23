package de.philskat.websocketdemo.controllers;

import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {
  
  // Send inital data when subscribing to the event
  @SubscribeMapping("/greeting")
  public String initalData() {
    return "Hello";
  }
}
