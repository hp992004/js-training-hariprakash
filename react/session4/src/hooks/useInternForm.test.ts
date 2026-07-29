expect.hasAssertions()
import { renderHook, act } from '@testing-library/react'
import useInternForm from './useInternForm'
import { test, expect } from 'vitest'

test('initialises with empty form state', () => {
  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {
  //Arrange
  const { result } = renderHook(() => useInternForm())

  //Act
  let valid: boolean
  act(() => { valid = result.current.isValid() })

  //Assert
  expect(valid!).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

test('isValid returns true when name and score are valid', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: { name: 'score', value: '92', type: 'number' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  // Set a value, trigger a validation error, then reset
  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => result.current.isValid())
  act(() => result.current.handleReset())

  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})



/*
Hook tests check the logic directly without involving the UI.
This makes it easier to find whether a bug is in the hook or the component.
They are also faster and focus only on the hook's behavior.
*/

/*
Yes, each part has a clear purpose.
Arrange sets up the hook before anything happens.
Act performs the validation by calling `isValid()`.
Assert checks that the result and error message are correct.
Keeping these steps separate makes the test much easier to follow.
*/



test('isValid returns true when the name is Sneha and the score is 88', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Sneha', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)

    result.current.handleChange({
      target: { name: 'score', value: '88', type: 'number' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Act
  let valid: boolean
  act(() => {
    valid = result.current.isValid()
  })

  // Assert
  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleChange updates the name field when a name change event is received', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Sneha', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Assert
  expect(result.current.form.name).toBe('Sneha')
})