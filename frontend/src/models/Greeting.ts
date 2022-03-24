export type Greeting = {
  content: String;
};

export type GreetingAction = GreetingInitAction | GreetingAddAction;

export type GreetingReducer = (
  state: Greeting[],
  action: GreetingAction
) => Greeting[];

type GreetingInitAction = {
  type: 'INIT';
  greetings: Greeting[];
};

type GreetingAddAction = {
  type: 'ADD';
  greeting: Greeting;
};
