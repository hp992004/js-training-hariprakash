```md
# Silent Failure Priority List

1. Error return value in `src/utils/intern-validation.ts` — risk: `validateInternForm` returns an error string instead of throwing. If a caller forgets to check the return value, invalid data may continue through the application.

2. Validation failure return in `src/hooks/useInternForm.ts` — risk: `handleSubmit()` returns `false` when validation fails. If the caller ignores the return value, the failure is silent and it can be difficult to determine why the submission did not succeed.

3. Default ID generation in `src/hooks/useInternForm.ts` — risk: `generateId` silently falls back to `Date.now()`. If a custom ID generator is expected but not provided, IDs may be generated differently than intended, leading to inconsistent behavior or testing issues.

## Guard Clause Order — validateInternForm

Before:
1. Range/format check (name is not empty)
2. Range check (score between 0 and 100)

After:
1. Null/undefined check (not required because inputs are strongly typed)
2. Type check (not required because TypeScript guarantees the input types)
3. Range/format check (name must not be empty)
4. Range check (score must be between 0 and 100)
5. Duplicate check (not applicable — no business rule requires it)

Reason for reordering:
The validation already performs the available checks in an efficient order. Since the inputs come from a strongly typed form, explicit null and type checks are unnecessary. There are no expensive business rule checks, so no code changes were required.


## Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|-----------------|--------------------------|------------------|
| src/utils/intern-validation.ts | `Name is required` | No | `validateInternForm: name is required, got: "${name}"` |
| src/utils/intern-validation.ts | `Score must be 0–100` | No | `validateInternForm: score must be between 0 and 100, got: ${score}` |
| src/services/intern-service.ts | `createIntern: name is required` | Partially | `createIntern: expected a non-empty name, got: "${form.name}"` |
| src/services/intern-service.ts | `createIntern: score must be between 0 and 100` | Partially | `createIntern: expected score between 0 and 100, got: ${form.score}` |
| src/services/intern-service.ts | `createIntern: role is required` | Partially | `createIntern: expected a non-empty role, got: "${form.role}"` |
| src/contexts/intern-context.tsx | `useInterns must be used inside InternProvider` | Partially | `useInterns: expected to be called inside <InternProvider>, but no provider was found.` |



## 2am Test — validateInternForm

Error message:
"validateInternForm: expected score between 0 and 100, got: -5"

What I know from this message alone:
- Which function failed: `validateInternForm`
- What the rule is: the score must be between 0 and 100
- What was actually passed: `-5`

What I would do next without reading any code:
- Find the caller that passed `-5` to `validateInternForm`.
- Check whether the value came from the form input, an API response, or another part of the application.
- Verify why the invalid value was not corrected or rejected before reaching the validation function.

Would the original message "Invalid score" have been enough? Why not?

No. The original message does not identify which function failed or what value caused the error. Without that information, debugging would require searching through the codebase to find every place that could produce the message. The improved error message immediately identifies the function, the expected rule, and the actual value, making it much easier to diagnose the problem.

