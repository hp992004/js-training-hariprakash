# Encapulation

## Section 1

```typescript
export class InternTracker {
  interns: Intern[] = [];              // Violation: Public mutable state. Make `private` and expose through a getter or dedicated methods.
  apiUrl: string = '/api/interns';     // Violation: Internal configuration. Should be `private`.
  lastFetchedAt: Date = new Date(0);   // Violation: Should not be directly modifiable. Make `private` and expose a read-only getter if needed.
  _localCache: Map<number, Intern> = new Map(); // Violation: Internal cache. Should be `private`.

  async loadAll(): Promise<void> {
    const res = await fetch(this.apiUrl);
    this.interns = await res.json();
    this.lastFetchedAt = new Date();
  }

  _buildUrl(id: number): string {      // Violation: Internal helper. Should be `private`.
    return `${this.apiUrl}/${id}`;
  }

  _updateCache(intern: Intern): void { // Violation: Internal helper. Should be `private`.
    this._localCache.set(intern.id, intern);
  }
}

export const API_KEY = 'intern-tracker-v1'; // Violation: Internal implementation detail. Should not be exported.
export const DEFAULT_LIMIT = 50;            // Violation: Internal configuration unless other modules genuinely need it. Keep private to the module.
```
### Questions

#### 1. Which fields would a caller legitimately need to read? Which should never be visible?

**Legitimately readable (preferably through getters):**
- `interns`
- `lastFetchedAt`

**Should never be visible:**
- `apiUrl`
- `_localCache`

---

#### 2. Which methods are internal helpers that callers should never call directly?

- `_buildUrl()`
- `_updateCache()`

These methods are implementation details and should be marked `private`.

---

#### 3. Which module-level exports are implementation details that should not be exported?

- `API_KEY`
- `DEFAULT_LIMIT` (unless it is intentionally shared with other modules)

If they are only used within this file, they should not be exported.

---

#### 4. If you moved from a REST API to a local JSON file — which lines would change, and would any callers break?

The following implementation details would change:
- `apiUrl`
- `fetch(this.apiUrl)` inside `loadAll()`
- `_buildUrl()` (or it could be removed)

If callers only use the public API (such as `loadAll()` and public getters), no caller code would break because the implementation is encapsulated.

## Section 2

### Check

After the refactoring:

- `tracker.interns`  You can't access it because it's a private field.
- `tracker.apiUrl = '/fake'` You can't change it from outside the class since it's private.
- `tracker.getAll()`  This is the correct way to get the list of interns.
- `tracker.getById(1)`  This lets you retrieve a specific intern.
- `tracker.loadAll()` This is the public method used to load or refresh the data.

Since the internal fields and helper methods are private, the class controls its own data. Callers can only interact with it through the public methods, which is exactly what encapsulation is meant to achieve.

## Section 5

### Questions

#### 1. Could you switch from `Set<number>` to `Map<number, Date>` without changing the public interface?

Yes. The public interface only exposes methods like `recordAttendance()`, `hasAttended()`, `getAttendeeCount()`, and `getAttendeeIds()`. Since callers do not know how the data is stored internally, the implementation can be changed from `Set<number>` to `Map<number, Date>` without affecting any caller code.

---

#### 2. What would happen if you exposed the raw `Set`?

If the raw `Set` were exposed, callers could modify it directly by calling methods like `add()`, `delete()`, or `clear()`. This would bypass the `SessionLogger` interface, allowing external code to change the internal state without any validation or control. Keeping the `Set` private ensures that all changes go through the public methods.