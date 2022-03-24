package de.philskat.websocketdemo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.philskat.websocketdemo.models.Greeting;
import de.philskat.websocketdemo.services.GreetingService;

@RestController
public class UpdateController {
  
  @Autowired
  private SimpMessagingTemplate template;

  @Autowired
  private GreetingService greetingService;

  // Normal REST endpoint that when calles send update to clients
  @GetMapping("/update")
  public ResponseEntity<String> test() {
    Greeting greeting = new Greeting("Update");

    // Add to greeting list
    greetingService.addGreeting(greeting);

    // Send "Update" to connected clients
    template.convertAndSend("/topic/greeting", greeting);
    
    // REST response
    return ResponseEntity.ok("Update");
  }
}
