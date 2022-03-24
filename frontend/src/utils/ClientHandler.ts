import {
  Client,
  IPublishParams,
  messageCallbackType,
  StompHeaders,
  StompSubscription,
} from '@stomp/stompjs';
import { StringMappingType } from 'typescript';

export enum StompEvents {
  Connect,
  Disconnect,
  WebSocketDisconnect,
  Error,
  StompError,
  WebSocketError,
}

export default class ClientHandler {
  stompClient: Client;
  subscriptions: StompSubscription[];
  events: { [key: string]: Function[] };
  constructor(stompClient: Client) {
    this.stompClient = stompClient;
    this.subscriptions = [];
    this.events = {};

    this.stompClient.onConnect = () => this.emit(StompEvents.Connect);

    this.stompClient.onDisconnect = () => {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });

      this.subscriptions = [];
      this.emit(StompEvents.Disconnect);
    };

    this.stompClient.onStompError = () => this.emit(StompEvents.Error);
    this.stompClient.onWebSocketError = () =>
      this.emit(StompEvents.WebSocketError);
    this.stompClient.onWebSocketClose = () =>
      this.emit(StompEvents.WebSocketDisconnect);
  }

  getClient(): Client {
    return this.stompClient;
  }

  subscribe(
    destination: string,
    callback: messageCallbackType,
    headers?: StompHeaders
  ): StompSubscription {
    let subscription = this.stompClient.subscribe(
      destination,
      callback,
      headers
    );

    this.subscriptions.push(subscription);

    return subscription;
  }

  publish(params: IPublishParams) {
    this.stompClient.publish(params);
  }

  addEventListener(eventName: StompEvents, fn: Function) {
    if (!this.events[eventName.toString()]) {
      this.events[eventName.toString()] = [];
    }

    this.events[eventName.toString()].push(fn);
  }

  private emit(eventName: StompEvents, ...args: any) {
    if (!this.events[eventName.toString()]) {
      return;
    }

    this.events[eventName.toString()].forEach((fn) => {
      fn(...args);
    });
  }
}
