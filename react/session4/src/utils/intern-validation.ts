import { assert } from './assert'

export function validateInternForm(
  name: string,
  score: number
): void {

   assert(
    typeof name === 'string',
    `validateInternForm: expected name to be a string, got: ${typeof name}`
  )

  assert(
    typeof score === 'number',
    `validateInternForm: expected score to be a number, got: ${typeof score}`
  )

  if (!name.trim()) {
   throw new Error( `validateInternForm: expected a non-empty name, got: "${name}"` )
  }

  if (score < 0 || score > 100) {
   throw new Error( `validateInternForm: expected score between 0 and 100, got: ${score}` )
  }
}
