import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

type AddInternFormProps = {
  // Called with the new intern payload after a successful submit
  onAdd?: (intern: { id: number; name: string; score: number; isPresent: boolean; role: string }) => void
  count?: number
}

function AddInternForm(props: AddInternFormProps) {
  const { form, error, handleChange, handleReset, isValid } = useInternForm()
  const { addIntern, interns } = useInterns()

  function handleSubmit(): void {
    if (!isValid()) return

    const newIntern = { id: interns.length + 1, ...form }
    addIntern(newIntern)
    props.onAdd?.(newIntern)
    handleReset()
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />

      {/* Tab order expected by tests: name -> role -> score */}
      <label htmlFor="role">Role</label>
      <select id="role" name="role" value={form.role} onChange={handleChange}>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <label htmlFor="score">Score</label>
      <input
        id="score"
        name="score"
        type="number"
        value={form.score}
        onChange={handleChange}
        placeholder="Score"
      />

      <input
        name="isPresent"
        type="checkbox"
        checked={form.isPresent}
        onChange={handleChange}
      />
      <label>Present</label>

      <button onClick={handleSubmit}>Add Intern</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default AddInternForm

