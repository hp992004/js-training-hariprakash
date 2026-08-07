
import { describe, it, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
  sortInternsByScore,
} from '../services'
import type {
  Intern,
  InternFormState,
} from '../types/intern'

describe('createIntern', () => {
  it('generates an id', () => {
    const form: InternFormState = {
      name: 'Hari',
      score: 80,
      role: 'Frontend',
      isPresent: true,
    }

    const intern = createIntern(form, () => 123)

    expect(intern.id).toBe(123)
  })

  it('trims the name', () => {
    const form: InternFormState = {
      name: '  Hari  ',
      score: 80,
      role: 'Frontend',
      isPresent: true,
    }

    const intern = createIntern(form, () => 1)

    expect(intern.name).toBe('Hari')
  })

  it('rounds the score', () => {
    const form: InternFormState = {
      name: 'Hari',
      score: 82.7,
      role: 'Frontend',
      isPresent: true,
    }

    const intern = createIntern(form, () => 1)

    expect(intern.score).toBe(83)
  })
})

describe('validateInternForm', () => {
  it('returns error for empty name', () => {
    const form: InternFormState = {
      name: '',
      score: 80,
      role: 'Frontend',
      isPresent: true,
    }

    expect(validateInternForm(form)).toBe('Name is required')
  })

  it('returns error for score greater than 100', () => {
    const form: InternFormState = {
      name: 'Hari',
      score: 101,
      role: 'Frontend',
      isPresent: true,
    }

    expect(validateInternForm(form)).toBe(
      'Score must be between 0 and 100'
    )
  })

  it('returns null for valid form', () => {
    const form: InternFormState = {
      name: 'Hari',
      score: 90,
      role: 'Frontend',
      isPresent: true,
    }

    expect(validateInternForm(form)).toBeNull()
  })
})

describe('calculateAverageScore', () => {
  it('returns 0 for an empty list', () => {
    expect(calculateAverageScore([])).toBe(0)
  })

  it('returns the correct average', () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: 'A',
        score: 80,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'B',
        score: 60,
        role: 'Backend',
        isPresent: true,
      },
    ]

    expect(calculateAverageScore(interns)).toBe(70)
  })

  it('rounds the average correctly', () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: 'A',
        score: 80,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'B',
        score: 81,
        role: 'Backend',
        isPresent: true,
      },
    ]

    expect(calculateAverageScore(interns)).toBe(81)
  })
})

describe('sortInternsByScore', () => {
  const interns: Intern[] = [
    { id: 1, name: 'Rahul', score: 80, role: 'Frontend', isPresent: true },
    { id: 2, name: 'Priya', score: 95, role: 'Backend', isPresent: true },
    { id: 3, name: 'Amit', score: 60, role: 'Fullstack', isPresent: false },
  ]

  it('sorts interns in ascending order', () => {
    const sorted = sortInternsByScore(interns, 'asc')
    expect(sorted.map(i => i.score)).toEqual([60, 80, 95])
  })

  it('sorts interns in descending order', () => {
    const sorted = sortInternsByScore(interns, 'desc')
    expect(sorted.map(i => i.score)).toEqual([95, 80, 60])
  })

  it('does not modify the original array', () => {
    sortInternsByScore(interns, 'asc')
    expect(interns.map(i => i.score)).toEqual([80, 95, 60])
  })
})

describe('getScoreLabel', () => {
  it("returns 'Pass' for 50", () => {
    expect(getScoreLabel(50)).toBe('Pass')
  })

  it("returns 'Fail' for 49", () => {
    expect(getScoreLabel(49)).toBe('Fail')
  })

  it("returns 'Pass' for 100", () => {
    expect(getScoreLabel(100)).toBe('Pass')
  })
})

describe('filterInterns', () => {
  const interns: Intern[] = [
    {
      id: 1,
      name: 'Hari',
      score: 90,
      role: 'Frontend',
      isPresent: true,
    },
    {
      id: 2,
      name: 'Priya',
      score: 80,
      role: 'Backend',
      isPresent: true,
    },
    {
      id: 3,
      name: 'Rahul',
      score: 70,
      role: 'Fullstack',
      isPresent: false,
    },
  ]

  it('returns all interns when query is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  it('matches on name', () => {
    expect(filterInterns(interns, 'Hari')).toEqual([interns[0]])
  })

  it('matches on role', () => {
    expect(filterInterns(interns, 'Backend')).toEqual([interns[1]])
  })

  it('is case-insensitive', () => {
    expect(filterInterns(interns, 'frontend')).toEqual([interns[0]])
  })

  
})



