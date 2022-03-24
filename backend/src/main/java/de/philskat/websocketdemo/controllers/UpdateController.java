package de.philskat.websocketdemo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.philskat.websocketdemo.models.Greeting;

@RestController
public class UpdateController {
  
  @Autowired
  private SimpMessagingTemplate template;

  // Normal REST endpoint that when calles send update to clients
  @GetMapping("/update")
  public ResponseEntity<String> test() {

    // Send "Update" to connected clients
    template.convertAndSend("/topic/greeting", new Greeting("Update"));
    
    // REST response
    return ResponseEntity.ok("Update");
  }
}
