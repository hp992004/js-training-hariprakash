/*interface InternCardProps {
  name:      string
  score:     number
  isPresent: boolean
}

function InternCard({ name, score, isPresent }: InternCardProps) {

  const adjustedScore: number = score >= 90 ? score : score + 5

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Original score: {score}</p>
      <p>Adjusted score: {adjustedScore}</p>
      <p>{isPresent ? 'Present' : 'Absent'}</p>
    </div>
  )
}

export default InternCard
*/

/*
 * Defining the interface separately keeps the component clean and readable.
 * It avoids cluttering the component with inline type definitions.
 * The same interface can also be reused by other components if needed.
 */

/*
  Error: Type 'string' is not assignable to type 'number'.
*/

/*
  Error: Type 'string' is not assignable to type 'boolean'.
*/

/*
Error: Property 'isPresent' is missing in type
name: string; score: number; but required in type 'InternCardProps'.
*/

/*
  Error: Property 'age' does not exist on type 'IntrinsicAttributes & InternCardProps'.
*/

/*
Props are read-only and should never be modified by a component.
Changing them can make the UI behave unpredictably and cause bugs.
Always create a new value instead of mutating the original prop.
*/

import Avatar   from './Avatar'
import Badge    from './Badge'
import ScoreBar from './ScoreBar'

interface InternCardProps {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

function InternCard({ name, score, isPresent, role }: InternCardProps) {
  return (
    <div className="card">
      <Avatar name={name} />
      <h2>{name}</h2>
      <ScoreBar score={score} />
      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
        <Badge label={role} color="#4f46e5" />
        <Badge
          label={isPresent ? 'Present' : 'Absent'}
          color={isPresent ? 'green' : '#e53e3e'}
        />
        {score >= 90 && <Badge label="Top Performer" color="#d97706" />}
      </div>
    </div>
  )
}

export default InternCard

/*
Badge is reusable with different labels and colors for different situations.
It reduces duplicate code and makes updates easier.
TypeScript checks that every Badge receives the correct props.
*/