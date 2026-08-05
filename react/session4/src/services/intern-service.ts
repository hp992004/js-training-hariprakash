
import type { Intern, InternFormState } from '../types/intern'
import { assert } from '../utils/assert'

export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {
  if (!form.name.trim()) {
    throw new Error('createIntern: name is required')
  }

  if (form.score < 0 || form.score > 100) {
    throw new Error('createIntern: score must be between 0 and 100')
  }

  if (!form.role.trim()) {
    throw new Error('createIntern: role is required')
  }

  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    isPresent: form.isPresent,
    role: form.role,
  }
}

export function validateInternForm(
  form: InternFormState
): string | null {
  if (!form.name.trim()) {
    return 'Name is required'
  }

  if (form.score < 0 || form.score > 100) {
    return 'Score must be between 0 and 100'
  }

  return null
}

export function calculateAverageScore(
  interns: Intern[]
): number {
  if (interns.length === 0) {
    return 0
  }

  const total = interns.reduce(
    (sum, intern) => sum + intern.score,
    0
  )

  return Math.round(total / interns.length)
}

export function getScoreLabel(
  score: number
): 'Pass' | 'Fail' {
  return score >= 50 ? 'Pass' : 'Fail'
}

export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {
  const search = query.trim().toLowerCase()

  const result = !search
    ? interns
    : interns.filter(
        intern =>
          intern.name.toLowerCase().includes(search) ||
          intern.role.toLowerCase().includes(search)
      )

  assert(
    Array.isArray(result),
    'filterInterns: expected result to be an array'
  )

  return result
}

export function sortInternsByScore(
  interns: Intern[],
  order: 'asc' | 'desc'
): Intern[] {
  return [...interns].sort((a, b) =>
    order === 'asc'
      ? a.score - b.score
      : b.score - a.score
  )
}