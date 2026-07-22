function ScoreCard() {
  const name:  string = 'Priya'
  const score: number = 92

  return (
    <div>
      <h2>{name}</h2>

      {/* Render different text */}
      <p>{score >= 50 ? 'Pass' : 'Fail'}</p>

      {/* Render different styles */}
      <p style={{ color: score >= 50 ? 'green' : 'red' }}>
        Score: {score}
      </p>

      {/* Render different elements */}
      {score >= 90
        ? <span>Top Performer</span>
        : <span>Keep it up!</span>
      }
    </div>
  )
}

export default ScoreCard

/*
A ternary is useful for simple conditions when rendering content in TSX.
It keeps the code short and easy to read.
For more complex logic, an if statement is usually a better choice.
*/