import type { Intern } from '../types/intern'

export function validateInternResponse(data: unknown): Intern[] {
  if (!Array.isArray(data)) {
    throw new Error(
      `validateInternResponse: expected array, got: ${typeof data}`
    )
  }

  return data.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(
        `validateInternResponse: item[${index}] must be an object`
      )
    }

    const intern = item as Record<string, unknown>

    if (typeof intern.id !== 'number') {
      throw new Error(
        `validateInternResponse: item[${index}].id must be a number, got: ${typeof intern.id}`
      )
    }

    if (
      typeof intern.name !== 'string' ||
      !intern.name.trim()
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].name is invalid, got: ${JSON.stringify(intern.name)}`
      )
    }

    if (
      typeof intern.score !== 'number' ||
      intern.score < 0 ||
      intern.score > 100
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].score is invalid, got: ${intern.score}`
      )
    }

    if (
      typeof intern.role !== 'string' ||
      !intern.role.trim()
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].role is invalid, got: ${JSON.stringify(intern.role)}`
      )
    }

    if (typeof intern.isPresent !== 'boolean') {
      throw new Error(
        `validateInternResponse: item[${index}].isPresent must be a boolean, got: ${typeof intern.isPresent}`
      )
    }

    return {
      id: intern.id,
      name: intern.name,
      score: intern.score,
      role: intern.role,
      isPresent: intern.isPresent,
    }
  })
}