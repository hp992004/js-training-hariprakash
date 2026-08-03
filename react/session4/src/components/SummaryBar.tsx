/*
Testability audit — SummaryBar.tsx

Q1 Predictable output?       YES — same intern data always produces the same summary
Q2 No external dependencies? NO — depends on the InternContext for its data
Q3 Dependencies injectable?  YES — the context can be mocked during testing

Verdict: MODERATELY TESTABLE
*/
import { useInterns } from '../contexts/intern-context'

export function SummaryBar({
  total,
  presentCount,
  averageScore,
}: {
  total: number
  presentCount: number
  averageScore: number
}) {
  return (
    <div
      style={{
        padding: '12px',
        background: '#f9f9f9',
        marginBottom: '12px',
      }}
    >
      <p>
        Total: {total} | Present: {presentCount} | Avg Score: {averageScore}
      </p>
    </div>
  )
}

export function SummaryBarContainer() {
  const { interns, isLoading } = useInterns()

  if (isLoading) {
    return <p>Loading summary...</p>
  }

  const total = interns.length

  const presentCount = interns.filter(
    intern => intern.isPresent
  ).length

  const averageScore = interns.length
    ? Math.round(
        interns.reduce((sum, intern) => sum + intern.score, 0) /
          interns.length
      )
    : 0

  return (
    <SummaryBar
      total={total}
      presentCount={presentCount}
      averageScore={averageScore}
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