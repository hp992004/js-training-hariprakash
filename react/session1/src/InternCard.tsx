function InternCard() {
  const name:      string  = 'Siraj'
  const score:     number  = 60
  const isPresent: boolean = true

  return (
    <div className="intern-card">
      <h2>{name}</h2>

      <p style={{ color: score >= 50 ? 'green' : 'red' }}>
        Score: {score} — {score >= 50 ? 'Pass' : 'Fail'}
      </p>

      {score >= 90 && <span>Top Performer</span>}

      {isPresent
        ? <p>Present today</p>
        : <p>Absent today</p>
      }
    </div>
  )
}

export default InternCard

/*
Use && when you only need to render something if a condition is true.
Use a ternary when you want to choose between two different results.
This keeps the rendering logic clear and easy to understand.
*/