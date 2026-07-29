import { useMemo } from 'react'
import { useInterns } from '../contexts/intern-context'


function SummaryBar() {
  const { interns, isLoading } = useInterns()

  const summary = useMemo(() => {
    const total = interns.length
    const present = interns.filter(i => i.isPresent).length
    const avg = total > 0 ? Math.round(interns.reduce((sum, i) => sum + i.score, 0) / total) : 0

    return { total, present, avg }
  }, [interns])

  if (isLoading) return <p>Loading summary...</p>

  return (
    <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
      <p>
        Total: {summary.total} | Present: {summary.present} | Avg Score: {summary.avg}
      </p>
    </div>
  )
}

export default SummaryBar

/*
`SummaryBar` depends on the `useInterns` context to get intern data and loading state.
Using the real context in a test can make the test depend on external state or async data.
This may cause tests to become slower or produce different results in different situations.
Mocking the context keeps the test fast, repeatable, and independent of other tests.
*/