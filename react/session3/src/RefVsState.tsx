import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  )
}

export default RefVsState

/*
  `useState` is used for data that should update the UI when it changes.
  `useRef` stores a value or element without causing a re-render.
  Use `useState` for UI state and `useRef` for things like DOM elements or mutable values.
*/