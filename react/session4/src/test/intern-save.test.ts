import { describe, test, expect } from 'vitest'
import { prepareInternPayload } from '../utils/intern-save'

describe('prepareInternPayload', () => {
  test('prepares the intern request payload', () => {
    const data = {
      name: 'Rahul',
      score: 92,
      isPresent: true,
      role: 'Frontend',
    }

    const result = prepareInternPayload(data)

    expect(result).toBe(JSON.stringify(data))
  })
})