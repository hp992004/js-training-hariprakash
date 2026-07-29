import { test, expect } from 'vitest'


const interns: { id: number; name: string }[] = []

test('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })
  expect(interns).toHaveLength(1)
})

test('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })
  expect(interns).toHaveLength(2)
})

/*
This violates the Independent principle of the FIRST testing guidelines.
The second test depends on the result or state left by the first test.
When run in isolation with `npx vitest run --reporter verbose`,
the second test fails because the required setup from the first test is missing.
Each test should set up its own data and be able to run independently.
*/






