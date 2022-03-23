# Websocket test

This repo contains a test of the websocket functionallity with spring boot and react.

## Setup

To start you need to run `npm install` in folder `frontend`.

## Usage

Start the backend using `mvnw spring-boot:run` in folder `backend`.
Start the frontend using `npm start` in folder `frontend`.

Your browser should open and in the console (using `F12` in Chrome) you should see the message `Hello`.

This message is send by the code in [GreetingController.java](backend/src/main/java/de/philskat/websocketdemo/controllers/GreetingController.java).
The method of the class is fired when the client subscribes to `/app/greeting`.

To set an update to the client open [http://localhost:8080/update](http://localhost:8080/update) in your browser.

The handler for this is defined in [UpdateController.java](backend/src/main/java/de/philskat/websocketdemo/controllers/UpdateController.java).
The Message is send by the `SimpMessagingTemplate` object.
On the client the message is received on `/topic/greeting`.

So we have a split between the initial data and the updates.

## General info

The `/app` space is used to send messages to the backend. \
The `/topic` space is used to receive events.
