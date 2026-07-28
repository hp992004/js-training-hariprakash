interface ProfileCardProps {
  name?:   string
  role?:   string
  score?:  number
  skills?: string[]
}

function ProfileCard({
  name   = 'Unknown',
  role   = 'Intern',
  score  = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>
      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard

/*
The '?' makes a prop optional, so it does not have to be passed by the parent.
If the prop is missing, the default parameter value is used instead.
This allows the component to work even when optional props are omitted.
*/

/*
Error: 'skills' is possibly 'undefined'.
Without a default value, an optional array prop may be undefined.
Providing a default empty array allows methods like .length to be used safely.
*/