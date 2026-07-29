import { test, expect, vi, afterEach } from 'vitest'

afterEach(() => {
  vi.useRealTimers()
})

test("score report has today's date", () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-11-15'))

  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2024-11-15')
})

/*
If you forget to call `vi.useRealTimers()`, fake timers remain active
after the test finishes.
This can cause other tests to use the mocked time unexpectedly,
leading to incorrect results or random test failures.
Restoring the real timers keeps each test isolated and reliable.
*/