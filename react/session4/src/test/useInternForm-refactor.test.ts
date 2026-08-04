import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useInternForm from '../hooks/useInternForm'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  test('validates form data without rendering a hook', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
    expect(validateInternForm('', 92)).toBe('Name is required')
  })
})

describe('useInternForm submit', () => {
  test('calls addIntern with the correct data', () => {
    const addIntern = vi.fn()
    const generateId = () => 999

    const { result } = renderHook(() =>
      useInternForm(addIntern, generateId)
    )

    act(() => {
      result.current.handleChange({
        target: {
          name: 'name',
          value: 'Rahul',
          type: 'text',
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.handleChange({
        target: {
          name: 'score',
          value: '92',
          type: 'number',
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.handleSubmit()
    })

    expect(addIntern).toHaveBeenCalledWith({
      id: 999,
      name: 'Rahul',
      score: 92,
      isPresent: true,
      role: 'Frontend',
    })
  })

  test('does not call addIntern when validation fails', () => {
    const addIntern = vi.fn()

    const { result } = renderHook(() =>
      useInternForm(addIntern, () => 999)
    )

    // Initial name is empty, so validation should fail
    act(() => {
      result.current.handleSubmit()
    })

    expect(addIntern).not.toHaveBeenCalled()
    expect(result.current.error).toBe('Name is required')
  })

  test('clears error after a successful submit', () => {
    const addIntern = vi.fn()

    const { result } = renderHook(() =>
      useInternForm(addIntern, () => 999)
    )

    // First submit fails and creates an error
    act(() => {
      result.current.handleSubmit()
    })

    expect(result.current.error).toBe('Name is required')

    // Fix the invalid name
    act(() => {
      result.current.handleChange({
        target: {
          name: 'name',
          value: 'Rahul',
          type: 'text',
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    // Submit valid form
    act(() => {
      result.current.handleSubmit()
    })

    expect(addIntern).toHaveBeenCalled()
    expect(result.current.error).toBe('')
  })
})


/*
Before the refactor, each test needed more Arrange code to set up the context,
Provider, and mock dependencies.

After the refactor, only a few lines are needed to create vi.fn(), provide a
fixed generateId, and render the hook.

The setup became simpler because dependencies are now passed directly into
the hook instead of being hidden inside it.
*/