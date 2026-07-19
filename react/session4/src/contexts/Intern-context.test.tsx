import { renderHook } from '@testing-library/react'
import { test, expect } from 'vitest'
import { useInterns } from '../contexts/intern-context'

test('throws an error when useInterns is used without InternProvider', () => {
  expect(() => {
    renderHook(() => useInterns())
  }).toThrow('useInterns must be used inside InternProvider')
})



/*
Yes, the branch coverage for `intern-context.tsx` increased from 50% to 100%
after adding the missing test.
The other file, `theme-context.tsx`, did not change and still has 50% branch coverage.
Only the file related to the new test showed an improvement.
*/