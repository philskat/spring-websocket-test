package de.philskat.websocketdemo.models;

public class Greeting {
  private String content;

  public Greeting() {
    this.content = "Hello, world!";
  }

  public Greeting(String name) {
    this.content = "Hello, " + name;
  }

  public String getContent() {
    return content;
  }
  
}
