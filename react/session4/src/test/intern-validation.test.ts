import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm guard clauses', () => {
  test('throws if name is empty', () => {
    expect(() =>
      validateInternForm('', 80)
    ).toThrow(
      'validateInternForm: expected a non-empty name, got: ""'
    )
  })

  test('throws if score is below 0', () => {
    expect(() =>
      validateInternForm('Rahul', -1)
    ).toThrow(
      'validateInternForm: expected score between 0 and 100, got: -1'
    )
  })

  test('throws if score is above 100', () => {
    expect(() =>
      validateInternForm('Rahul', 101)
    ).toThrow(
      'validateInternForm: expected score between 0 and 100, got: 101'
    )
  })

  test('does not throw for valid input', () => {
    expect(() =>
      validateInternForm('Rahul', 80)
    ).not.toThrow()
  })
})

/*
The pure function tests needed almost no Arrange code—typically just one line
to call the function with test inputs. In contrast, testing the same logic
through the hook with renderHook required more setup, including rendering the
hook, managing state, and sometimes using act(). The pure function tests were
simpler, shorter, and easier to understand.
*/