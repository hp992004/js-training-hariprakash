import useCounter from '../hooks/useCounter'

function CounterDemo() {
  const basic   = useCounter()
  const bounded = useCounter({ initial: 5, min: 0, max: 10 })
  const stepped = useCounter({ step: 5 })

  return (
    <div>
      <div>
        <p>Basic: {basic.count}</p>
        <button onClick={basic.increment}>+</button>
        <button onClick={basic.decrement}>-</button>
        <button onClick={basic.reset}>Reset</button>
      </div>

      <div>
        <p>Bounded (0–10): {bounded.count}</p>
        <button onClick={bounded.increment}>+</button>
        <button onClick={bounded.decrement}>-</button>
      </div>

      <div>
        <p>Step 5: {stepped.count}</p>
        <button onClick={stepped.increment}>+5</button>
        <button onClick={stepped.decrement}>-5</button>
      </div>
    </div>
  )
}

export default CounterDemo

/*
`useCounter` is a custom hook because it uses React hooks to manage state.
It must start with `use` and can only call hooks at the top level.
Like other hooks, it should only be used inside React components or other custom hooks.
*/