import { useState } from 'react'

interface InternFormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

interface UseInternFormReturn {
  form:         InternFormState
  error:        string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleReset:  () => void
  isValid:      () => boolean
}

const initialForm: InternFormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function useInternForm(): UseInternFormReturn {
  const [form,  setForm]  = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target
    const nextValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : name === 'score'
          ? Number(value)
          : value

    setForm(prev => ({
      ...prev,
      [name]: nextValue,
    }))

    // Clear error as soon as user makes the form potentially valid
    if (name === 'name' && String(nextValue).trim()) {
      setError('')
    }
    if (name === 'score' && Number(nextValue) >= 0 && Number(nextValue) <= 100) {
      setError('')
    }
  }

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    if (!form.name.trim()) {
      setError('Name is required')
      return false
    }

    if (form.score < 0 || form.score > 100) {
      setError('Score must be between 0 and 100')
      return false
    }

    setError('')
    return true
  }

  return { form, error, handleChange, handleReset, isValid }
}

export default useInternForm

/*
Using a return type interface clearly defines what the hook returns.
It makes the hook easier to understand and provides better TypeScript type checking.
If the return value changes, TypeScript can catch mistakes automatically.
*/