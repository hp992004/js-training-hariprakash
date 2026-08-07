## Refactoring Priority List

1. Duplicate code in `src/hooks/useInternForm.ts` — because the validation and error handling logic is repeated in both `isValid()` and `handleSubmit()`. Any future change to validation must be made in multiple places, increasing the risk of bugs.

2. Magic number in `src/utils/intern-validation.ts` — because the score limits (`0` and `100`) are hardcoded. If the valid range changes, developers must search for every occurrence, making the code harder to maintain.

3. Data clump (duplicate `Intern` interface) in `src/hooks/useInternSearch.ts` — because defining the same interface in multiple files can lead to inconsistencies and makes future changes to the model more difficult.

## Full Refactoring Log — handleChange (useInternForm.ts)

Step 1: Ran `npm run test:run` before refactoring → tests green.

Step 2: Extracted the input value conversion logic into `getNextValue()` to give the function a single responsibility → tests green.

Step 3: Extracted the repeated validation error-clearing logic into `clearValidationError()` to remove duplication and improve readability → tests green.

Step 4: Replaced the magic numbers `0` and `100` with named constants (`MIN_SCORE` and `MAX_SCORE`) → tests green.

Final: 3 refactoring changes, 4 test runs (including the initial baseline), all tests passed.

/*
Confidence loop reflection

I performed 4 separate test runs:
1. Before starting the refactoring to establish a green baseline.
2. After extracting getNextValue().
3. After extracting clearValidationError().
4. After replacing the magic numbers with named constants.

No step produced a failing (red) test run. Each refactoring preserved the
existing behavior, so I continued only after confirming the tests remained
green.
*/

/*
Coverage reflection

Statement coverage decreased slightly after the refactoring, while branch and
function coverage remained the same. The decrease is expected because the
refactoring introduced new helper functions and additional lines of code that
are not fully exercised by the existing tests.

Extracting pure functions made the code easier to understand and test in
isolation. It also makes it easier to write focused tests for edge cases that
were previously embedded inside larger functions without affecting the rest of
the hook's behavior.
*/

## Explore 1

After revisiting a file from a previous session, we were able to identify several code smells that were not obvious before. These included duplicate code, magic numbers, primitive obsession, and functions with multiple responsibilities. Before this session, the focus was mainly on whether the code worked; now we also consider readability, maintainability, and testability.

---

## Explore 2

We deliberately renamed a function to a confusing name and ran the test suite. All tests still passed because changing the name did not affect the program's behavior. This showed that tests verify functionality, but they do not measure code readability or naming quality. Clear naming still depends on good coding practices and code reviews.

---

## Explore 3

We reviewed functions for `null` and `undefined` handling. Guard clauses make these cases much clearer by checking invalid inputs at the beginning of a function and returning or throwing early. This keeps the main logic focused on the valid path and makes edge cases easier to understand.

---

## Explore 4

Looking back at recent commits, we found changes where refactoring and feature work were mixed together. If they had been separated, the commit history would have been easier to understand and review. One commit could contain only behavior-preserving refactoring, while another could introduce the new feature or bug fix. This would make debugging, reviewing, and reverting changes much simpler.