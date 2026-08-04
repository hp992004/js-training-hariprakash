/*
Testability audit — useInternForm.ts

Q1 Predictable output?       YES — same form input always gives the same validation result
Q2 No external dependencies? YES — no API calls, timers, or browser APIs
Q3 Dependencies injectable?  YES — form values are controlled through event inputs

Verdict: HIGHLY TESTABLE
*/

import { useState } from 'react'
import { validateInternForm } from '../utils/intern-validation'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternFormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

interface UseInternFormReturn {
  form: InternFormState
  error: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleReset: () => void
  isValid: () => boolean
  handleSubmit: () => boolean
}

const initialForm: InternFormState = {
  name: '',
  score: 0,
  isPresent: true,
  role: 'Frontend',
}

function useInternForm(
  addIntern: (intern: Intern) => void,
  generateId: () => number = Date.now
): UseInternFormReturn {
  const [form, setForm] = useState<InternFormState>(initialForm)
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

    if (name === 'name' && String(nextValue).trim()) {
      setError('')
    }

    if (
      name === 'score' &&
      Number(nextValue) >= 0 &&
      Number(nextValue) <= 100
    ) {
      setError('')
    }
  }

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    const validationError = validateInternForm(
      form.name,
      form.score
    )

    if (validationError) {
      setError(validationError)
      return false
    }

    setError('')
    return true
  }

  function handleSubmit(): boolean {
    const validationError = validateInternForm(
      form.name,
      form.score
    )

    if (validationError) {
      setError(validationError)
      return false
    }

    addIntern({
      ...form,
      id: generateId(),
    })

    handleReset()

    return true
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
    handleSubmit,
  }
}

export default useInternForm

/*
Using a return type interface clearly defines what the hook returns.
It makes the hook easier to understand and provides better TypeScript type checking.
If the return value changes, TypeScript can catch mistakes automatically.
*/