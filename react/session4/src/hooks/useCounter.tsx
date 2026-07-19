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

function useCounter(
  initialOrOptions: number | UseCounterOptions = 0,
): UseCounterReturn {
  const {
    initial,
    min,
    max,
    step,
  } =
    typeof initialOrOptions === 'number'
      ? { initial: initialOrOptions, min: -Infinity, max: Infinity, step: 1 }
      : {
          initial: initialOrOptions.initial ?? 0,
          min: initialOrOptions.min ?? -Infinity,
          max: initialOrOptions.max ?? Infinity,
          step: initialOrOptions.step ?? 1,
        }

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