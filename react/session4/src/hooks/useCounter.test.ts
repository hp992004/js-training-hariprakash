import { renderHook, act } from '@testing-library/react'
import useCounter from './useCounter'

test('initialises with the default value of 0', () => {
  const { result } = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)
})

test('initialises with a custom initial value', () => {
  const { result } = renderHook(() => useCounter(10))

  expect(result.current.count).toBe(10)
})

test('increment increases count by 1', () => {
  const { result } = renderHook(() => useCounter())

  act(() => result.current.increment())

  expect(result.current.count).toBe(1)
})

test('decrement decreases count by 1', () => {
  const { result } = renderHook(() => useCounter(5))

  act(() => result.current.decrement())

  expect(result.current.count).toBe(4)
})

test('reset returns count to the initial value', () => {
  const { result } = renderHook(() => useCounter(10))

  act(() => result.current.increment())
  act(() => result.current.increment())
  act(() => result.current.reset())

  expect(result.current.count).toBe(10)
})

/*
`result.current` holds the hook's latest state and functions.
Read it after `act` because `act` applies the state update.
Reading it before `act` gives you the old state.
*/