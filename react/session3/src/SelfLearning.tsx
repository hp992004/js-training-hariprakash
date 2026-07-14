/*
  React.StrictMode runs components and `useEffect` twice in development
  to help detect side effects and potential bugs.
  Because of this, you may notice some effects running twice in the console.
  
  Example:
  useEffect(() => {
  console.log("Loaded");
  }, []);

  console output in development:
  Loaded
  Loaded

  Console output in production:
  Loaded
*/

/*
  `useEffect` runs after the browser updates the screen, while
  `useLayoutEffect` runs before the screen is painted. Use `useEffect`
  for tasks like fetching data, and `useLayoutEffect` when you need to
  measure or update the DOM before the user sees it.

  useLayoutEffect(() => {
  inputRef.current?.focus();
  }, []);
*/

/*
  Without a dependency array, `useEffect` runs after every render.
  If it updates state, the component renders again, which runs the
  effect again and keeps repeating, causing an infinite loop.

  useEffect(() => {
  setCount(count + 1);
  });
*/


/*
  `useState` is best for simple state like a counter, input field, or toggle.
  `useReducer` is a better choice when the state is more complex or when
  multiple state values are updated by different actions. It keeps the update
  logic in one place, making the code easier to read and maintain.
  For small components, `useState` is usually enough and keeps the code simple.
  For larger components with many related updates, `useReducer` can be easier to manage.

  Usestate:

  const [count, setCount] = useState(0);
  <button onClick={() => setCount(count + 1)}>Increment</button>

  Usereducer:

  const initialState = { count: 0 };

function reducer(state: typeof initialState, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

<button onClick={() => dispatch({ type: "increment" })}>
  Increment
</button>
*/


/*
  The cleanup function removes timers and event listeners when they are
  no longer needed. Without it, they keep running in the background,
  which can cause memory leaks and unexpected behavior.
*/


import { useEffect, useState } from "react";

function LiveTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <h2>Seconds: {seconds}</h2>;
}

export default LiveTimer;

/*
  Without the cleanup, the interval keeps running even after the
  component is removed. If the component mounts again, new intervals
  are created, causing multiple timers to run at the same time.
*/