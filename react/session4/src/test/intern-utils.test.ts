import { describe, test, expect } from 'vitest'
import { filterInterns } from '../utils/intern-utils'

const interns = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
  { id: 2, name: 'Priya', score: 85, role: 'Backend', isPresent: true },
  { id: 3, name: 'Amit', score: 78, role: 'Frontend', isPresent: false },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
]

describe('filterInterns', () => {
  test('returns all interns when searchTerm is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  test('returns only interns whose name matches (case-insensitive)', () => {
    const result = filterInterns(interns, 'rahul')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Rahul')
  })

  test('returns only interns whose role matches (case-insensitive)', () => {
    const result = filterInterns(interns, 'frontend')

    expect(result).toHaveLength(2)
    expect(result.every(i => i.role === 'Frontend')).toBe(true)
  })

  test('returns an empty array when no interns match', () => {
    expect(filterInterns(interns, 'DevOps')).toEqual([])
  })

  test('returns interns that match on either name OR role', () => {
    const result = filterInterns(interns, 'amit')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Amit')

    const roleResult = filterInterns(interns, 'frontend')
    expect(roleResult).toHaveLength(2)
  })
})

/*
The filterInterns tests required very little setup—just sample data and direct
function calls. No mocking, providers, rendering, or React hooks were needed.

The hook tests required much more setup because they depended on React,
contexts, rendering utilities, and sometimes mocking. Pure functions are
therefore simpler and easier to test.
*/