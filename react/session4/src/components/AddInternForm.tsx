import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

type AddInternFormProps = {
  onAdd?: (intern: {
    id: number
    name: string
    score: number
    isPresent: boolean
    role: string
  }) => void
  count?: number
}

function AddInternForm(props: AddInternFormProps) {
  // Get dependency from context
  const { addIntern } = useInterns()

  // Inject addIntern into the hook
  const {
    form,
    error,
    handleChange,
    handleReset,
    handleSubmit,
  } = useInternForm(addIntern)

  function onSubmit(e?: React.FormEvent): void {
    e?.preventDefault()

    const success = handleSubmit()

    if (success) {
      // Optional callback can stay in the component
      // if another component/test needs it
    }
  }

  return (
    <form
      role="form"
      aria-label="Add Intern"
      onSubmit={onSubmit}
    >
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="name">Intern Name</label>
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
      <select
        id="role"
        name="role"
        value={form.role}
        onChange={handleChange}
      >
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

      <label htmlFor="present">
        <input
          id="present"
          name="isPresent"
          type="checkbox"
          checked={form.isPresent}
          onChange={handleChange}
        />
        Present
      </label>

      <button type="submit">
        Add Intern
      </button>

      <button
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  )
}

export default AddInternForm