import { useState } from 'react'

interface Intern {
  id:   number
  name: string
}

function InternList() {
  const [interns,   setInterns]   = useState<Intern[]>([])
  const [inputName, setInputName] = useState<string>('')
  const [nextId,    setNextId]    = useState<number>(1)

  function handleAdd(): void {
    if (!inputName.trim()) return
    setInterns(prev => [...prev, { id: nextId, name: inputName.trim() }])
    setNextId(prev => prev + 1)
    setInputName('')
  }

  function handleRemove(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <input
        type="text"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
        placeholder="Intern name"
      />
      <button onClick={handleAdd}>Add</button>

      <p>Total: {interns.length}</p>
      <ul>
        {interns.map(i => (
          <li key={i.id}>
            {i.name}
            <button onClick={() => handleRemove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InternList

/*
  We use `[...prev, newIntern]` and `prev.filter(...)` to create
  a new array instead of changing the existing one. This helps
  React detect that the state has changed and update the UI
  correctly. Using `push()` or `splice()` would modify the same
  array, which is not the recommended way to update state.
*/