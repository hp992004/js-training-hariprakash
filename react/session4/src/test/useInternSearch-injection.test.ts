import { test, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useInternSearch from '../hooks/useInternSearch'

test('uses the injected filter function', () => {
  const interns = [
    {
      id: 1,
      name: 'Rahul',
      score: 92,
      role: 'Frontend',
      isPresent: true,
    },
  ]

  const customFilter = vi.fn(() => [])

  const { result } = renderHook(() =>
    useInternSearch(interns, 'Rahul', customFilter)
  )

  expect(result.current).toEqual([])

  expect(customFilter).toHaveBeenCalledWith(interns, 'Rahul')
})

/*
For this simple hook, injecting the filter function is probably over-engineering
because filterInterns is already a small, pure, and easy-to-test function.

Dependency injection is more useful when a dependency is external or unpredictable,
such as an API, database, timer, random value, or third-party service.
*/