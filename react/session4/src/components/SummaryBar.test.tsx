expect.hasAssertions()
import { render, screen } from '@testing-library/react'
import { vi, test, expect } from 'vitest'
import SummaryBar from '../components/SummaryBar'

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      { id: 1, name: 'Rahul', score: 92, isPresent: true, role: 'Frontend' },
      { id: 2, name: 'Priya', score: 78, isPresent: true, role: 'Backend' },
      { id: 3, name: 'Amit', score: 45, isPresent: false, role: 'Frontend' },
    ],
    isLoading: false,
    addIntern: vi.fn(),
    removeIntern: vi.fn(),
  }),
}))

test('shows the total intern count when there are three interns', () => {

  render(<SummaryBar />)

  const total = screen.getByText(/Total: 3/i)

  expect(total).toBeInTheDocument()
})

test('shows the present intern count as 2', () => {
  render(<SummaryBar />)

  expect(screen.getByText(/Present: 2/i)).toBeInTheDocument()
})

test('shows the average score as 72', () => {

  render(<SummaryBar />)


  expect(screen.getByText(/Avg Score: 72/i)).toBeInTheDocument()
})

/*
Without the mock, the test uses the real `useInterns` context.
Since no `InternProvider` is wrapping the component, the hook throws an error.
Mocking the context provides the data the component needs and keeps the test isolated.
*/


/*
1. No. I only mocked `useInterns` because that's what `SummaryBar` depends on.
   I didn't mock `useState` or `useMemo` since React already handles them.

2. Yes. I mocked `addIntern` and `removeIntern` with `vi.fn()`.
   If `SummaryBar` calls them by mistake, nothing real happens and the test stays safe.

3. If the `Intern` interface changes, TypeScript will usually point out what's missing.
   That makes it easy to update the mock to match the new interface.
*/

/*
The four coverage numbers are Statements, Branches, Functions, and Lines.
Statements show how much code was executed.
Branches check whether all paths, like `if` and `else`, were tested.
Functions and Lines show how many functions and lines were covered.
The lowest coverage here is Branches at 50% in the `contexts` folder.
*/

/*
The `intern-context.tsx` file has partial (yellow) branch coverage.
The condition that isn't fully tested is `if (!context)` inside `useInterns()`.
This branch runs only when `useInterns` is used without an `InternProvider`.
Rendering a component that calls `useInterns` without wrapping it in
`<InternProvider>` would trigger this untested branch and throw the error.
*/


/*
Yes, the branch coverage for `intern-context.tsx` increased from 50% to 100%
after adding the missing test.
The other file, `theme-context.tsx`, did not change and still has 50% branch coverage.
Only the file related to the new test showed an improvement.
*/

/*
The `shows the total intern count as 3` test can be improved.
It partially violates the Independent principle because it relies on
shared mock data defined for the whole file instead of owning its own data.
Using test-specific data would make the test easier to maintain and less
likely to break when other tests or shared mocks are changed.
*/

/*
No tests failed after adding `expect.hasAssertions()`.
This is because each test already executes at least one real assertion.
The check confirms that the tests are actually verifying behavior
instead of running without any expectations.
*/

//Explore :

/*
`npx vitest run --reporter verbose` shows every test individually
along with its pass or fail status.
`npm test` usually gives a shorter summary and watch mode output.
The verbose reporter makes it easier to see exactly which tests ran.
*/

/*
When the branch coverage is below 80%, the coverage check fails.
Vitest reports that the coverage threshold was not met.
The test run finishes with a failure until the missing branches are covered.
*/

/*
When `expect.hasAssertions()` is used and all `expect()` calls are removed,
the test fails.
Vitest reports that the test expected at least one assertion,
but none were actually executed.
*/

/*
Hovering over a red line in the HTML coverage report shows
why that line or branch was not covered by any test.
This helps identify the exact condition or code path
that still needs a test.
*/