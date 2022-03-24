package de.philskat.websocketdemo.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import de.philskat.websocketdemo.models.Greeting;

// Handle Greeting list
@Service
public class GreetingService {
  private ArrayList<Greeting> greetings = new ArrayList<>();

  public ArrayList<Greeting> getGreetings() {
    return greetings;
  }

  public void addGreeting(Greeting greeting) {
    greetings.add(greeting);
  }  
}
