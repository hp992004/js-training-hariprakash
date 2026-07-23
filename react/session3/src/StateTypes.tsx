import { useState } from 'react'

interface Intern {
  id:        number
  name:      string
  isPresent: boolean
}

function StateTypes() {

  const [name,      setName]      = useState('')
  const [score,     setScore]     = useState(0)
  const [isActive,  setIsActive]  = useState(false)

  const [selected,  setSelected]  = useState<Intern | null>(null)
  const [interns,   setInterns]   = useState<Intern[]>([])

  return (
    <div>
      <p>Name: {name || '(none)'}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>Selected: {selected ? selected.name : '(none)'}</p>
      <p>Intern count: {interns.length}</p>
      <button onClick={() => setName('Rahul')}>Set Name</button>
      <button onClick={() => setScore(92)}>Set Score</button>
      <button onClick={() => setIsActive(true)}>Activate</button>
    </div>
  )
}

export default StateTypes


/*
  TypeScript shows an error when calling `setScore("92")`
  because `score` is typed as a number, so a string is not allowed.

  If `setSelected({ id: 1, name: "Rahul" })` is used without `isPresent`,
  TypeScript also throws an error since the required `isPresent` field
  is missing from the object.
*/