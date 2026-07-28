import { useState, useRef } from 'react'

function StopwatchRef() {
  const [seconds,   setSeconds]   = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart(): void {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  function handleStop(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  function handleReset(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop}  disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default StopwatchRef


/*
  The interval id is stored in `useRef` because changing it doesn't need to update the UI.
  Using `useState` would cause an unnecessary re-render every time the interval id changes.
  `useRef` lets us keep the value without affecting the component's rendering.
*/