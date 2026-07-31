/*
Testability audit — useInternSearch.ts

Q1 Predictable output?       YES — same interns and search always produce the same result
Q2 No external dependencies? YES — no API calls, timers, or browser APIs
Q3 Dependencies injectable?  YES — interns are passed as input to the hook

Verdict: HIGHLY TESTABLE
*/

import { useMemo } from 'react'
import { filterInterns } from '../utils/intern-utils'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function useInternSearch(
  interns: Intern[],
  searchTerm: string,
  filter: typeof filterInterns = filterInterns
): Intern[] {
  const filtered = useMemo(
    () => filter(interns, searchTerm),
    [interns, searchTerm, filter]
  )

  return filtered
}

export default useInternSearch

/*
Without `useMemo`, the filtering runs on every render, so "filtering..." is logged repeatedly.
With `useMemo`, filtering only runs when the search text or intern list changes.
This avoids unnecessary work and improves performance.
*/