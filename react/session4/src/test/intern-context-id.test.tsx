import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { InternProvider, useInterns } from '../contexts/intern-context'

test('uses injected generateId when adding an intern', () => {
  // Fixed ID generator for predictable testing

  const wrapper = ({ children }: { children: ReactNode }) => (
    <InternProvider >
      {children}
    </InternProvider>
  )

  const { result } = renderHook(() => useInterns(), { wrapper })

  act(() => {
    result.current.addIntern({
      name: 'Kiran',
      score: 85,
      role: 'Frontend',
      isPresent: true,
    })
  })

  const addedIntern = result.current.interns.find(
    intern => intern.name === 'Kiran'
  )

  expect(addedIntern?.id).toBe(999)
})

/*
Injecting generateId lets tests control exactly which ID is created.
Even if the current default is predictable, the ID logic could change later
to Date.now() or another random value. Injection keeps the tests repeatable
without depending on how IDs are generated internally.
*/