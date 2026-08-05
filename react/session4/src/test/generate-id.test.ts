import { describe, test, expect } from 'vitest'
import { generateInternId } from '../utils/generate-id'

describe('generateInternId', () => {
  test('generates ID with expected format using injected values', () => {
    const id = generateInternId(
      () => 12345,
      () => 0.5
    )

    expect(id).toBe('intern-12345-0.5')
  })

  test('generates identical IDs with the same injected values', () => {
    const now = () => 12345
    const random = () => 0.5

    const id1 = generateInternId(now, random)
    const id2 = generateInternId(now, random)

    expect(id1).toBe(id2)
  })
})