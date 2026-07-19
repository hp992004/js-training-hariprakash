import { useState } from 'react'

function InternForm() {
  const [name,  setName]  = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />
      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />
      <p>Name: {name} | Score: {score}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternForm

/*
  Even though the input type is "number", `e.target.value`
  is still returned as a string. Using `Number()` converts it
  to a number so it matches the state type.
*/

/*
  A controlled input gets its value from React state.
  Whenever the user types, the state is updated, and the
  input displays the latest value from that state.
*/