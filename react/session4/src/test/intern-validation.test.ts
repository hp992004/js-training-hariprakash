import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  test('returns "Name is required" when name is empty string', () => {
    expect(validateInternForm('', 50)).toBe('Name is required')
  })

  test('returns "Name is required" when name is only whitespace', () => {
    expect(validateInternForm('   ', 50)).toBe('Name is required')
  })

  test('returns "Score must be 0–100" when score is 101', () => {
    expect(validateInternForm('Rahul', 101)).toBe('Score must be 0–100')
  })

  test('returns "Score must be 0–100" when score is -1', () => {
    expect(validateInternForm('Rahul', -1)).toBe('Score must be 0–100')
  })

  test('returns null when name is "Rahul" and score is 92', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
  })

  test('returns null when score is exactly 0', () => {
    expect(validateInternForm('Rahul', 0)).toBeNull()
  })

  test('returns null when score is exactly 100', () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  })
})

/*
The pure function tests needed almost no Arrange code—typically just one line
to call the function with test inputs. In contrast, testing the same logic
through the hook with renderHook required more setup, including rendering the
hook, managing state, and sometimes using act(). The pure function tests were
simpler, shorter, and easier to understand.
*/