# Automation testing
## Section 1:
### Task 1.1

| Layer | Tool | # Tests | Duration |
|--------|------|--------:|----------------:|
| Unit / Hook | Vitest | 45 | 5–10s |
| Component (RTL) | Vitest + React Testing Library (RTL) | 53 | 10–20s |
| End-to-end | Playwright | 84 | 5–10 min |
| Total | — | 182 | 6–11 min |

Comment: 

The test distribution isn't quite like a test pyramid. Usually, there are a lot more unit tests, a moderate number of component (RTL) tests, and only a few end-to-end tests. In this project, the E2E tests are the largest group. Adding more unit tests for business logic, utility functions, and custom hooks would make the test suite better balanced and faster to run.

### Task 1.2

src/test/generate-id.test.ts                → Unit (tests generateId() utility in isolation)
src/test/global-state-fixed.test.ts         → Unit (tests global/localStorage state logic)
src/test/intern-context-id.test.tsx         → Component (renders a component consuming the Intern context and asserts on the DOM)
src/test/intern-save.test.ts                → Unit (tests save/load utility functions)
src/test/intern-utils.test.ts               → Unit (tests intern utility functions, e.g. filtering/classification)
src/test/intern-validation.test.ts          → Unit (tests validation logic, score bounds, name rules)
src/test/self-learning.test.tsx             → Component (renders the SelfLearning component and checks the DOM)
src/test/SummaryBar.test.tsx                → Component (renders SummaryBar and checks displayed values)
src/test/useInternForm-refactor.test.ts     → Unit (tests useInternForm hook logic in isolation)
src/test/useInternSearch-injection.test.ts  → Unit (tests useInternSearch hook logic with dependency injection)
src/test/fixes/fix-1.test.ts                → Unit (tests a fixed utility/logic issue)
src/test/fixes/fix-2.test.ts                → Unit
src/test/fixes/fix-3.test.ts                → Unit
src/test/fixes/fix-4.test.ts                → Unit
src/test/violations/violation-1.test.ts     → Unit (tests a code-smell violation case)
src/test/violations/violation-2.test.ts     → Unit
src/test/violations/violation-3.test.ts     → Unit
src/test/violations/violation-4.test.ts     → Unit
src/hooks/useCounter.test.ts        → Unit (tests hook logic)
src/hooks/useInternForm.test.ts     → Unit (tests hook logic)
src/components/AddInternForm.test.tsx → Component (renders form, types, clicks)
src/components/InternCard.test.tsx  → Component (renders card, checks content)
src/components/InternList.test.tsx  → Component (renders list)
src/components/InternRow.test.tsx   → Component (renders row)
src/components/Navbar.test.tsx      → Component (renders navbar, toggles theme)
src/components/QueryDemo.test.tsx   → Component (renders query demo)
src/components/ScoreStats.test.tsx  → Component (renders stats)
src/components/SummaryBar.test.tsx  → Component (renders + checks values)
src/contexts/Intern-context.test.tsx → Component (renders via provider)
tests/assertions.spec.ts         → E2E (assertions on live page)
tests/intern-dashboard.spec.ts   → E2E (dashboard journeys in real browser)
tests/locators-actions.spec.ts   → E2E (locator chaining + actions)
tests/page-object.spec.ts        → E2E (journeys via Page Object model)
tests/user-journeys.spec.ts      → E2E (full user journeys)
tests/self-learning.spec.ts      → E2E (learning demos: fill/type, screenshots, theming)

Comment:

We think a few of the E2E tests could be replaced with unit or component tests. For example, checks for form validation, rendering, or simple button interactions don't always need a full browser test. They can be tested much faster with Vitest and React Testing Library.

The biggest advantage would be faster test runs and easier debugging when something fails. The trade-off is that we'd lose some confidence that the entire application works correctly from start to finish in a real browser, so we'd still keep E2E tests for the main user flows.

## Section 2:
### Task 2.1

- **Overall statement coverage:** 92.59%
- **Overall branch coverage:** 78.02%
- **File with the lowest branch coverage:** `src/hooks/useCounter.tsx` (33.33%)
- **One branch in that file that is not covered:** One of the conditional branches in `useCounter.tsx` (an `if`/`else` path) is not exercised by the current tests, contributing to the low branch coverage.

Comment:

A useful test to add would be one that exercises the missing conditional path in `useCounter.tsx`. This would help improve branch coverage and make sure the hook behaves correctly in edge cases, not just the normal flow.

**Describe:** `describe("useCounter", () => {})`

**Test:** `test("does not decrement the counter below the minimum value", () => {})`

### Task 2.2

Comment:

The coverage report passes all of the configured thresholds. Every metric is above the required minimum, so no additional tests are needed to satisfy the coverage requirements. If we wanted to improve coverage further, we could add more tests for the uncovered branches in `useCounter.tsx`, since it has the lowest branch coverage (33.33%).

## Section 3:

### Task 3.1

- **Which test failed?**
  - `validateInternForm > returns "Name is required" when name is empty string`
  - `validateInternForm > returns "Name is required" when name is only whitespace`
  - The same incorrect message also caused related hook and component tests to fail.

- **What did the "Expected" and "Received" values show?**
  - **Expected:** `"Name is required"`
  - **Received:** `"Wrong message"`

- **How long did it take to catch the bug?**
  - The bug was caught immediately when the test suite was run. The entire test run completed in about **20 seconds**, and the failing tests clearly identified the incorrect validation message.

  Comment:

  Manually finding this bug would have taken longer because we'd need to open the application, navigate to the form, submit it with an empty name, and verify the displayed error message. That process would probably take a minute or two each time, whereas the automated tests caught the issue in about 20 seconds and clearly pointed to the exact problem.

### Task 3.2

- **Which test failed?**
  - The Playwright test that interacts with the **"Add Intern"** button failed (for example, `intern-dashboard.spec.ts` or `user-journeys.spec.ts`, depending on which test clicks the button).

- **Which step in the test failed?**
  - The test failed while trying to locate and click the **"Add Intern"** button, because the button text had been changed to **"Submit Intern"**.

- **What does the failure screenshot show?**
  - The screenshot shows the application with the button labeled **"Submit Intern"** instead of **"Add Intern"**. Since Playwright was searching for a button named **"Add Intern"**, it couldn't find the element, causing the test to fail.

Comment:

A unit test usually gives a very specific failure message, showing the expected and actual values along with the exact line where the assertion failed. This makes it easy to identify the source of the bug.

An E2E test provides more context about how the failure happened from a user's perspective. It shows the step that failed, the page state, screenshots, and sometimes a trace of the browser actions. This is useful for understanding what went wrong during a real user flow, but it may take a little more investigation to find the exact line of code causing the issue.

Overall, unit tests are better for pinpointing the exact code that failed, while E2E tests are better for understanding how the failure affects the application from the user's point of view.

### Task 3.3

The existing test suite passed without any changes after adding the score badge. Since the new feature only added extra UI and did not change the existing behavior, no existing tests needed to be updated. We added new tests to verify the badge displays the correct label based on the intern's score.

**Unit Test**

describe("getScoreLabel", () => {
  test("returns 'Fail' when score is 45", () => {
    expect(getScoreLabel(45)).toBe("Fail")
  })
})
```

**Component Test**

```ts
describe("ScoreBadge", () => {
  test("renders 'Pass' when score is 92", () => {
    render(<ScoreBadge score={92} />)
    expect(screen.getByText("Pass")).toBeInTheDocument()
  })
})

Comment:

The definition of done is more than just seeing the feature render on the screen. A feature is complete only when it works as expected, all existing tests continue to pass, and the new functionality is covered by appropriate tests. This helps ensure that the feature doesn't introduce regressions and is safe to merge into the main branch.

## Section 4:

### Task 4.1

| Stage | What runs | What it checks | Blocks merge if? |
|-------|-----------|---------------|-----------------|
| **On every push** | Unit tests, component tests, linting | Verifies code quality, logic, and component behavior | Yes, if any check fails |
| **On every pull request** | Unit tests, component tests, E2E tests, coverage checks | Ensures new changes don't break existing functionality and meet coverage requirements | Yes, if any test or coverage check fails |
| **Before merge to main** | Full CI pipeline (all tests, coverage, and build) | Confirms the application is stable, all tests pass, and the project is ready for production | Yes, if any required check fails |

Comment:

Unit tests are run on every push because they are fast and provide quick feedback if a change breaks the code. Developers can fix issues immediately without waiting long for the results.

E2E tests take much longer because they launch a real browser and test complete user workflows. Running them on every push would slow down development, so they are usually run on pull requests to verify that the application still works correctly before the changes are merged. The tradeoff is faster feedback during development versus more comprehensive testing before code reaches the main branch.

### Task 4.2

1. What is the trigger for this pipeline? (When does it run?)

The pipeline runs on every push to any branch and on every pull request targeting the `main` branch.

2. Why does `e2e-tests` have `needs: unit-tests`? What happens if unit tests fail?

The `needs: unit-tests` dependency ensures that the E2E tests only run after the unit tests complete successfully. If the unit tests fail, the E2E job is skipped, saving time and resources.

3. What commands run in the `unit-tests` job? What do they check?

- `npm ci` – Installs the project's dependencies.
- `npm run test:run` – Runs the unit and component test suite to verify the application logic and UI behavior.
- `npm run test:coverage` – Generates a coverage report and checks whether the project meets the configured coverage thresholds.

4. If `npm run test:coverage` fails the threshold — can the E2E tests still run?

No. Since the `e2e-tests` job depends on the `unit-tests` job, a failure in the coverage step causes the `unit-tests` job to fail, so the E2E tests will not run.

5. What would you add to this pipeline to block a merge if coverage drops below 80%?

We would configure the coverage thresholds to require at least 80% coverage (for example, in `vitest.config.ts`) and make the `unit-tests` job a required status check in the repository settings. This ensures that pull requests cannot be merged if the coverage falls below 80%.

### Task 4.3

| Risk | Yes/No | File or test name |
|------|--------|-----------------|
| Any test that uses `test.skip`? | Yes | `tests/page-object.spec.ts:65` — `test.skip(browserName !== 'chromium', 'This test targets Chromium-specific behaviour only')` |
| Any test that uses `console.log` (not asserted)? | Yes | `src/test/violations/violation-3.test.ts:4` — `console.log('Average:', avg)` |
| Any test that calls `fetch` without mocking? | No | `src/test/fixes/fix-4.test.ts` and `src/test/violations/violation-4.test.ts` both mock `fetch` using `vi.stubGlobal('fetch', ...)` |
| Any test that calls `new Date()` inline? | Yes | `src/test/fixes/fix-2.test.ts:12` and `src/test/violations/violation-2.test.ts:7` |
| Any test over 500ms? (`npx vitest run --reporter verbose`) | Not verified | Requires running `npx vitest run --reporter verbose` |
| Any flaky test (run the suite 3 times — does anything fail once)? | Not verified | Requires running the full test suite three times |

Comment:

The skipped Playwright test should either be completed so it runs on all supported browsers or removed if it is no longer needed. Leaving skipped tests in the suite can hide real issues.

The `console.log` statement should be removed or replaced with an assertion so the test verifies behavior instead of printing output.

The `fetch` calls are already mocked, so no changes are needed. Mocking external requests keeps the tests fast and reliable.

The tests that use `new Date()` inline should use a fixed date or mock the system time (for example, with `vi.setSystemTime`) so the results remain consistent regardless of when the tests are run.

If any tests are found to be slow, we should identify the bottleneck, remove unnecessary waits or setup, and mock expensive dependencies where possible to reduce execution time.

To check for flaky tests, we should run the full suite multiple times. Any test that fails intermittently should be fixed by removing timing dependencies, isolating shared state, or making the assertions more deterministic.

## Section 5

### Task 5.1

| Feature | Unit test? | Component test? | E2E test? | What's missing? |
|---------|------------|-----------------|-----------|-----------------|
| Score validation (0–100) | Yes | No | Yes | Add a component test that verifies the validation error message appears when the score is outside the valid range. |
| Attendance toggle (`isPresent`) | No | No | Yes | Add a component test to verify that toggling the checkbox updates the `isPresent` state correctly. |
| Search filtering by name | Yes | No | Yes | Add a component test to verify that typing in the search box filters the displayed intern list. |
| Add intern form submission | Yes | Yes (render only) | Yes | Add a component test that submits the form and verifies the new intern is added to the displayed list. |

## Section 6:

### Task 6.1

| | Before testing sessions | After testing sessions |
|--|------------------------|----------------------|
| **How do you know a change didn't break anything?** | We had to test the application manually and hope nothing else was affected. | We run the test suite, and if all tests pass, we have much more confidence that existing functionality still works. |
| **How long does it take to verify the app works?** | Several minutes of manually checking different features. | A few seconds for unit and component tests, with E2E tests confirming the full application in a few minutes. |
| **How confident are you to refactor old code?** | Low, because any change could introduce hidden bugs. | Much higher, since the tests quickly catch regressions after refactoring. |
| **How do you find out about a regression?** | Usually by manually testing or after someone reported a bug. | The automated test suite detects regressions immediately during development or in the CI pipeline. |

Comment:

During this training, unit tests were the most useful in catching real bugs. They ran quickly, clearly showed the expected and actual values, and pointed directly to the line of code that caused the failure. Component and E2E tests were also valuable for verifying UI behavior and complete user workflows, but unit tests made it the fastest and easiest to identify and fix logic errors.