# Separation of Concerns
## Section 1
### Task 1.1

useInternForm.ts
Job: "This file manages the intern form state, validation, and submission logic through a custom React hook."
Concerns mixed (if any): Manages form state and performs validation/submission logic within the same hook.

useInternForm.ts
Job: "This file manages the intern form state, validation, and submission logic using a custom React hook."
Concerns mixed (if any): None.

useInternSearch.ts
Job: "This file filters the intern list based on the search term using a custom React hook."
Concerns mixed (if any): None.

SummaryBar.tsx
Job: "This file displays summary statistics about interns and retrieves the required data from the intern context."
Concerns mixed (if any): Contains both presentation logic (SummaryBar) and data-fetching/container logic (SummaryBarContainer).

AddInternForm.tsx
Job: "This file renders the Add Intern form and connects user interactions to the form hook."
Concerns mixed (if any): None.

File that mixes the most concerns

I think `intern-context.tsx` mixes the most concerns because it is responsible for several different tasks instead of just one.

It handles:

* Managing the shared intern state with React Context.
* Providing functions to add and remove interns.
* Loading the default intern data.
* Simulating data loading using `useEffect` and `setTimeout`.
* Tracking the loading state while the data is being initialized.

Because these responsibilities are combined in one file, it becomes harder to test and maintain than if each responsibility were separated.


### Task 1.2

Snippet A

- `if (!form.name.trim()) return` → **Validation layer** (should be in a validation utility or form hook).
- `const id = Date.now()` → **Business logic/Service layer** (or injected dependency for easier testing).
- `const score = Math.round(form.score)` → **Business logic layer** (data transformation before storing).
- `setInterns(...)` → **Context/State Management layer** (this is the correct place).

---

Snippet B

- `useState(...)` → **UI layer** (component state is appropriate here).
- `useEffect(...)` → **Data layer** (data fetching should be moved to a custom hook or service).
- `fetch(...)` → **Data/Service layer** (API calls belong in a service or custom hook).
- `setIntern(...)` → **Data layer** (updating fetched data should happen in the hook managing the request).

---

Snippet C

- `getScoreBadge(...)` → **UI layer** (returns a React component, so it should be a component instead of a utility).
- `const label = ...` → **Business logic layer** (determining pass/fail is business logic).
- `const color = ...` → **UI layer** (choosing display styles belongs with the UI).
- `return <span ...>` → **UI layer** (JSX should be in a React component, not a utility file).

---
Snippet D

- `searchTerm ? ... : interns` → **Business logic layer** (filtering logic).
- `interns.filter(...)` → **Business logic layer** (search/filter functionality).
- `i.name.toLowerCase().includes(...)` → **Business logic layer** (search comparison logic).
- `const filteredInterns = ...` → **Custom hook/Business logic layer** (should live in something like `useInternSearch`, not in the context).

Comment:

Snippet A contains **four distinct concerns**: validation, ID generation, data transformation, and state management. The concern that requires the most setup when testing is **ID generation**, because it depends on `Date.now()`. Without injecting or mocking this dependency, tests can become less predictable and require additional setup to produce consistent results.

## Section 2

### Task 2.1

Each test only needs a small amount of Arrange code, usually just creating a simple object or array to use as input. Since the service functions are pure functions, there is very little setup required.

None of the tests need vi.mock, renderHook, or render because they don't depend on React components, hooks, or external services. The functions can be called directly, making the tests simple, fast, and easy to understand.

### Task 2.2

Comment

Keeping the service layer free of React imports is important because it contains only business logic and is independent of the UI. This makes the functions easy to test by calling them directly with different inputs.

If the service layer imported React (such as useState, useEffect, or JSX), the tests would become more complicated. They would require React-specific tools like render, renderHook, or mocking, making the tests slower, harder to write, and more dependent on the React environment.

## Section 3

### Task 3.1

Comment:

No, none of the tests in intern-repository.test.ts use vi.mock. The repository manages its own state and doesn't depend on external APIs, services, or modules that need to be mocked. The tests interact with the repository directly using renderHook and act.

The service tests focus on pure business logic, such as validation, filtering, and calculations. The repository tests focus on state management, checking that adding, updating, and removing interns changes the state correctly. The service is simpler to test because its functions can be called directly without any React setup, while the repository requires renderHook and act since it is a React hook.

### Task 3.2

Does useInternRepository validate anything?
No. It does not perform any validation. The add() function accepts any valid Intern object that is passed to it.
Does useInternRepository generate any IDs?
No. It does not generate IDs. It simply stores the Intern object received by the add() function.
Does useInternRepository calculate any averages?
No. It only manages the intern list. Any calculations, such as average scores, belong in the service layer.

## Section 4

### Task 4.1

Comment:

The new InternProvider is much smaller than before. It is around 35–40 lines, while the original InternProvider was about 60–70 lines because it also handled state initialization, ID generation, and other business logic. After the refactor, the provider mainly connects the repository and service layers.

Yes. I can now change how intern IDs are generated without modifying intern-context.tsx. I would only need to update the intern-service.ts file, specifically the createIntern() function where the ID is generated. The context simply calls the service, so it doesn't need to know how IDs are created.

### Task 4.2

Comment: 

A presentational component should **not** import directly from the service layer. The container component should call the service, prepare the data, and pass the result to the presentational component through props. This keeps the presentational component focused only on rendering the UI.

If the presentational component imports the service directly, its tests become more tightly coupled to the business logic and may require additional setup or mocking. If the container calls the service and passes the result as props, the presentational component can be tested by simply providing different prop values. This approach is easier to test because the UI and business logic are tested independently.

## Section 5

### Task 5.1

| File                                    | Expected layer      | Actual concerns                                                                                                                                                    | Correct?                                                                             |
| --------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `src/components/SummaryBar.tsx`         | UI                  | Renders the summary UI, gets intern data from the context, and calls the service to calculate the average score before passing it to the presentational component. | Yes                                                                                  |
| `src/components/AddInternForm.tsx`      | UI                  | Renders the form, gets `addIntern` from the context, connects the form to `useInternForm`, and handles submit/reset events.                                        | Yes                                                                                  |
| `src/components/InternCard.tsx`         | UI                  | Displays an intern's name, score, and attendance status.                                                                                                           | Yes                                                                                  |
| `src/hooks/useInternForm.ts`            | Service + UI (hook) | Manages form state, handles input changes and reset, validates the form, generates IDs, and submits interns.                                                       | Partially (still contains business logic like validation and ID generation)          |
| `src/hooks/useInternSearch.ts`          | Service + UI (hook) | Uses `useMemo` to optimize filtering and delegates filtering logic to `filterInterns`.                                                                             | Yes (update the import to `intern-service.ts` if you've moved `filterInterns` there) |
| `src/contexts/intern-context.tsx`       | Wiring (context)    | Wires together the repository and service layers, exposes context values, and delegates business logic to the service.                                             | Yes                                                                                  |
| `src/services/intern-service.ts`        | Service             | Creates interns, validates form data, calculates averages, determines pass/fail labels, and filters interns.                                                       | Yes                                                                                  |
| `src/repositories/intern-repository.ts` | Repository          | Stores the intern list and provides add, remove, and update operations.                                                                                            | Yes                                                                                  |


Comment:

After the refactor, useInternForm.ts does not belong entirely to the service layer or the UI layer. It acts as a bridge between them. The hook manages the React form state and user interactions while calling the service for validation and the context for adding interns. I would describe it as a wiring or orchestration layer because its main responsibility is coordinating different parts of the application rather than containing business logic or rendering the UI.

### Task 5.2

Comment:

useInternForm is not a service or a repository. It is best described as a coordination hook because it sits between the UI and the service layer. Its responsibility is to manage the form state, respond to user interactions, call the service for validation, and delegate adding interns through the injected addIntern function. It coordinates these layers without containing the core business logic or directly managing the intern data.

## Section 6

### Task 6.1

Dependency Diagram

AddInternForm.tsx
  └─ calls useInternForm (coordination hook)
      ├─ calls validateInternForm (service)
      └─ calls addIntern (injected)
          └─ InternProvider
              ├─ calls createIntern (service)
              └─ calls repo.add (repository)
                  └─ updates interns state

SummaryBarContainer
  ├─ calls useInterns (context)
  ├─ calls calculateAverageScore (service)
  └─ passes props to SummaryBar
      └─ renders the summary UI

InternProvider
  ├─ calls useInternRepository (repository)
  │   ├─ manages interns state
  │   ├─ add()
  │   ├─ remove()
  │   └─ update()
  ├─ calls createIntern (service)
  ├─ calls calculateAverageScore (service)
  └─ provides context values to components

useInternForm
  ├─ manages form state
  ├─ calls validateInternForm (service)
  └─ calls injected addIntern()
      └─ handled by InternProvider

Comment:

No. All the dependencies flow in one direction, from the UI layer down to the coordination hook, service, repository, and state. There are no arrows pointing back to a higher layer, so there are no circular dependencies. This keeps the architecture clean, easier to maintain, and simpler to test.

### Task 6.2

intern-context.tsx
Job: "This file wires the service and repository layers together and provides the intern context to the UI."

useInternForm.ts
Job: "This file coordinates the intern form state, validation, and submission by connecting the UI with the service and context."

useInternSearch.ts
Job: "This file coordinates searching by calling the filtering service and memoizing the result for the UI."

SummaryBar.tsx
Job: "This file displays the intern summary and uses a container component to obtain data before passing it to the UI."

AddInternForm.tsx
Job: "This file renders the Add Intern form and delegates form behavior to the useInternForm coordination hook."

