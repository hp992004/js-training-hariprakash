import { useMemo } from 'react'
import { useInterns } from '../contexts/intern-context'

function ScoreStats() {
  const { interns, isLoading } = useInterns()

  const stats = useMemo(() => {
    const scores = interns.map(i => i.score)
    return {
      highest: scores.length > 0 ? Math.max(...scores) : 0,
      lowest: scores.length > 0 ? Math.min(...scores) : 0,
      average:
        scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
      passing: interns.filter(i => i.score >= 50).length,
    }
  }, [interns])

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
      <p>Highest: {stats.highest} | Lowest: {stats.lowest} | Avg: {stats.average}</p>
      <p>Passing: {stats.passing} of {interns.length}</p>

      {/* Render intern names so tests can assert data loaded */}
      <div>
        {interns.map(i => (
          <span key={i.id}>{i.name}</span>
        ))}
      </div>
    </div>
  )
}

export default ScoreStats

/*
Without `useMemo`, the stats would be recalculated every time the component re-renders.
This happens even if the intern data hasn't changed.
It can waste time by doing the same calculation over and over.
*/
