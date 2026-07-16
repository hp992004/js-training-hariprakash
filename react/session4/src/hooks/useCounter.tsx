import { useReducer } from 'react'

interface UseCounterOptions {
  initial?: number
  min?: number
  max?: number
  step?: number
}

interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function useCounter({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}): UseCounterReturn {
  function reducer(state: number, action: CounterAction): number {
    switch (action.type) {
      case 'increment':
        return Math.min(state + step, max)

      case 'decrement':
        return Math.max(state - step, min)

      case 'reset':
        return initial

      default:
        return state
    }
  }

  const [count, dispatch] = useReducer(reducer, initial)

  function increment(): void {
    dispatch({ type: 'increment' })
  }

  function decrement(): void {
    dispatch({ type: 'decrement' })
  }

  function reset(): void {
    dispatch({ type: 'reset' })
  }

  return { count, increment, decrement, reset }
}

export default useCounter