import { renderHook } from '@testing-library/react'
import { test, expect } from 'vitest'
import { useInterns } from '../contexts/intern-context'

test('throws an error when useInterns is used without InternProvider', () => {
  expect(() => {
    renderHook(() => useInterns())
  }).toThrow(
    'useInterns: expected to be called inside <InternProvider>, but no provider was found.'
  )
})

/*
Yes, the branch coverage for `intern-context.tsx` increased from 50% to 100%
after adding the missing test.
The other file, `theme-context.tsx`, did not change and still has 50% branch coverage.
Only the file related to the new test showed an improvement.
*/

/*

test('just to hit the line', () => {
  const form = { name: '', score: 0, isPresent: true, role: 'Frontend' }
  JSON.stringify(form) 
  expect(true).toBe(true) 
})

Yes, this test can increase coverage because it executes the code.
However, it does not improve the quality of the tests.
The assertion is meaningless and doesn't verify any real behavior.
Even if the code is broken, this test would still pass.
It is better to remove tests like this and write tests that check actual results.
*/