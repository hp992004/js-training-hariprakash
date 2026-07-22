export interface Intern {
  id:        number
  name:      string
  score:     number
  isPresent: boolean
  skills:    string[]
}

interface InternProfileProps {
  intern: Intern
}

function InternProfile({ intern }: InternProfileProps) {
  return (
    <div className="card">
      <h2>{intern.name}</h2>
      <p>Score: {intern.score}</p>
      <p>{intern.isPresent ? 'Present' : 'Absent'}</p>
      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default InternProfile