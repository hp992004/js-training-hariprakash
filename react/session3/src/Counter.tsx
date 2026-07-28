import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default Counter

/*
  You can't update the state by writing `count = count + 1`
  because `count` is just the current value of the state.
  React only updates the UI when you use the setter function,
  like `setCount(count + 1)`, which tells React to re-render.
*/