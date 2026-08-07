# Fail-Fast Activity Task

## Section 1

### Task 1.1

Silent failure audit — useInternForm.ts

Pattern 1: Validation failure — handleSubmit returns false when validation fails instead of throwing or returning detailed error information.

Pattern 2: Error state reset — handleChange clears the error as soon as the input looks valid, which may hide other validation issues until the next submit.

Pattern 3: Default ID generation — generateId defaults to Date.now(), silently choosing an ID generator when none is provided.

Silent failure audit — useInternSearch.ts

No silent failure patterns found.

The hook delegates filtering to the injected filter function and returns the result directly.
It contains no error handling, default fallbacks, or swallowed exceptions.


Silent failure audit — intern-context.tsx

Pattern 1: No silent failures found.

The context throws an error if useInterns is used outside the provider,
and it delegates business logic and state management to the service and
repository layers instead of silently handling failures.

Silent failure audit — intern-validation.ts

Pattern 1: Error return value — validateInternForm returns an error string or null instead of throwing an exception. The caller must check the return value; otherwise, validation failures could be ignored.

Comment:

The most likely silent failure is returning false when validation fails instead of throwing an error. If the caller forgets to check the return value, the validation failure can be ignored, making it difficult to understand why an intern was not added.

## Section 2

### Task 2.1

Comment:

We removed two null checks—one in isValid() and one in handleSubmit(). This shows that the function's null return value was relied on in multiple places. By changing the function to throw instead, we removed repeated null-checking logic and made validation failures explicit, reducing the chance of callers accidentally ignoring an invalid result.

### Task 2.2

Comment:

The original function would have returned `undefined`, and the caller would likely have continued execution without realizing that an error occurred. Instead of failing immediately, the application could silently display an empty list or incorrect data, making the root cause difficult to identify. Throwing an error instead causes the failure to happen at the source, making debugging much easier.

### Task 2.3

Comment:

The default value was not the correct value because the field was required for creating a valid intern. Using a default would only hide the fact that the caller failed to provide the required data. A good way to tell the difference is to ask whether the application can still behave correctly without the value. If the value is essential for the business logic, the code should fail fast by throwing an error instead of silently substituting a default.

## Section 3

### Task 3.1

Comment:

The original function generated an ID, trimmed the name, and rounded the score before validating the input. If validation failed, some work had already been done unnecessarily, which could waste resources or lead to unintended side effects in more complex code. In the refactored version, the first thing that runs on every call is the guard clauses that validate the input. If any validation fails, the function immediately throws an error and performs no further work.

### Task 3.3

Comment:

Testing each guard clause directly was much easier than testing the same logic through a hook or component. The validation function could be called with simple inputs and its behavior verified using toThrow() or not.toThrow() without rendering a component or hook. Testing through a hook or component requires extra setup, such as rendering, simulating user interactions, and managing React state, whereas testing the validation function focuses only on the business logic.

## Section 4

### Task 4.2

Comment:

Improving the error messages did not require changing the function signature because the actual values (`name` and `score`) were already available within the function's scope. This made it easy to include the received values in the error messages. The only changes needed were to update the `throw new Error(...)` statements and adjust the corresponding test assertions to match the new messages.

## Section 5

### Task 5.2

Comment:

The `assert` checks verify the function's assumptions, such as receiving the correct input types. They throw immediately if those assumptions are violated because the function cannot safely continue with invalid input types. The validation logic below checks whether the values satisfy the application's business rules, such as requiring a non-empty name and a score between 0 and 100. The `assert` statements fail unconditionally when a programming error occurs, while the validation logic enforces expected user input rules.

### Task 5.3

Comment:

The postcondition is unlikely to fail because `Array.prototype.filter()` always returns an array. In this case, the assertion mainly serves as documentation by making the function's guarantee explicit. Such assertions become valuable when the implementation changes in the future, the function depends on external code, or a refactor accidentally violates the expected behavior. They help detect broken assumptions early and make debugging easier.

## Section 6

### Task 6.1

Comment:

Without boundary validation, malformed API data could be added to the intern list and stored in the application's state. This can lead to incorrect UI output, runtime errors, or failures later in the application that are difficult to trace back to the original cause. With fail-fast validation, the invalid data is rejected immediately, an informative error is thrown, and the intern list is never updated with malformed data. This prevents corrupted state and makes the source of the problem much easier to identify.

### Task 6.2

Comment:

This check runs at **import time**, when the application first loads the `config.ts` module. If a required configuration value is missing or invalid, the application throws an error immediately and stops starting. This follows the fail-fast principle because configuration problems are detected before any other code runs. If the check were performed only on demand, the application might start successfully, process requests, or update state before eventually failing when the configuration is first used, making the root cause harder to diagnose.



# Explore:

# Explore 1

**Function:** `handleSubmit()` in `useInternForm.ts`

`handleSubmit()` calls `addIntern()` without checking a return value because `addIntern()` returns `void`. The assumption being made is that if `addIntern()` does not throw an error, the intern has been added successfully. This assumption is not explicitly documented.

An assertion can be added to document this expectation:

```ts
addIntern({
  ...form,
  id: generateId(),
})

// Assumption: addIntern completes successfully.
assert(true, 'handleSubmit: addIntern completed successfully')
````

The assumption is that `addIntern()` either completes successfully or throws an error.

---

# Explore 2

Example function with a postcondition violation:

```ts
function sortNumbers(numbers: number[]): number[] {
  const result =
    numbers.length > 3
      ? numbers
      : [...numbers].sort((a, b) => a - b)

  assert(
    result.every(
      (value, index, arr) =>
        index === 0 || arr[index - 1] <= value
    ),
    'sortNumbers: postcondition failed - result is not sorted'
  )

  return result
}
```

The assertion catches cases where the function claims to return a sorted array but does not. This demonstrates that postconditions are useful for verifying that a function fulfills its contract and for detecting implementation bugs immediately after computation.

---

# Explore 3

| React Feature                                | Fail Fast / Fail Slow | Reason                                                          |
| -------------------------------------------- | --------------------- | --------------------------------------------------------------- |
| TypeScript prop type errors                  | Fail Fast             | Compile-time errors prevent invalid code from running.          |
| Invalid Hook calls                           | Fail Fast             | React throws an error immediately.                              |
| Missing `key` warning                        | Fail Slow             | React renders the UI but displays a warning.                    |
| PropTypes warnings                           | Fail Slow             | The application continues running while warning in development. |
| `setState` on an unmounted component warning | Fail Slow             | React warns but does not stop execution.                        |

---

# Explore 4

The `Result<T, E>` (also called `Either`) pattern returns either a success value or an error value instead of throwing an exception.

Example:

```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }
```

Instead of throwing:

```ts
throw new Error('Invalid score')
```

the function returns:

```ts
return {
  ok: false,
  error: 'Invalid score',
}
```

The caller must explicitly handle both outcomes:

```ts
const result = validateInternForm(name, score)

if (!result.ok) {
  console.error(result.error)
  return
}
```

The `Result<T, E>` pattern is not fail silent because failures are represented explicitly and cannot be ignored without deliberate handling. It is generally not considered fail fast either, because it propagates errors as values rather than immediately stopping execution. It is a better choice than throwing when failures are expected and recoverable, such as user input validation, parsing, or API responses.

```
