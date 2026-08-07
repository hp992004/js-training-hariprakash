import { vi } from 'vitest'

test("score report has today's Date", () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-11-15'))

  const report = { date: new Date().toISOString().slice(0, 10) }
  expect(report.date).toBe('2024-11-15')

  vi.useRealTimers()
})

/*
This violates the Repeatable principle of the FIRST testing guidelines.
The test depends on the current system date instead of controlling it.
Because the expected date is hardcoded, the result changes over time.
It will fail the next day after the hardcoded date is no longer today's date.
Using fake timers makes the test repeatable and reliable.
*/