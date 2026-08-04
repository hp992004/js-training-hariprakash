/*
Testability audit — SummaryBar.tsx

Q1 Predictable output?       YES — same intern data always produces the same summary
Q2 No external dependencies? NO — depends on the InternContext for its data
Q3 Dependencies injectable?  YES — the context can be mocked during testing

Verdict: MODERATELY TESTABLE
*/
import { useInterns } from '../contexts/intern-context'
import {   sortInternsByScore,calculateAverageScore } from '../services/intern-service'
import type { Intern } from '../types/intern'
export function SummaryBar({
  total,
  presentCount,
  averageScore,
  sortedInterns,
}: {
  total: number
  presentCount: number
  averageScore: number
  sortedInterns: Intern[]
}) {
  return (
    <div>
      <p>
        Total: {total} | Present: {presentCount} | Avg Score: {averageScore}
      </p>

      <ul>
        {sortedInterns.map(intern => (
          <li key={intern.id}>
            {intern.name} - {intern.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SummaryBarContainer() {
  const { interns} = useInterns()

  const total = interns.length

  const sortedInterns = sortInternsByScore(interns, 'desc')

  const presentCount = interns.filter(
    intern => intern.isPresent
  ).length

  // Use the service instead of calculating here
  const averageScore = calculateAverageScore(interns)

  return (
    <SummaryBar
      total={total}
      presentCount={presentCount}
      averageScore={averageScore}
      sortedInterns={sortedInterns}
    />
  )
}

export default SummaryBarContainer

/*
`SummaryBar` depends on the `useInterns` context to get intern data and loading state.
Using the real context in a test can make the test depend on external state or async data.
This may cause tests to become slower or produce different results in different situations.
Mocking the context keeps the test fast, repeatable, and independent of other tests.
*/