/*
// Snippet A
function generateInternId(): string {
  return `intern-${Date.now()}-${Math.random()}`
}

Pattern: Hard-coded dependency
FIRST violated: Repeatable
Fix: Pass the time or ID generator into the function so tests can control the output.


// Snippet B
import { analyticsClient } from '../services/analytics'
function trackPageView(page: string): void {
  analyticsClient.log(page)
}

Pattern: Hard-coded dependency
FIRST violated: Independent
Fix: Pass the analytics client into the function instead of using a fixed import.


// Snippet C
async function saveAndRedirect(data: InternFormState): Promise<void> {
  await fetch('/api/interns', { method: 'POST', body: JSON.stringify(data) })
  window.location.href = '/dashboard'
  localStorage.setItem('lastSaved', new Date().toISOString())
  console.log('Saved successfully')
}

Pattern: Does too many things
FIRST violated: Independent
Fix: Split it into smaller functions so each one has a single responsibility and is easier to test.


// Snippet D
let errorLog: string[] = []
function logError(message: string): void {
  errorLog.push(message)        // writes to module-level variable
  console.error(message)
}
function getErrors(): string[] {
  return errorLog               // reads from module-level variable
}


Pattern: Global state
FIRST violated: Independent
Fix: Avoid using a shared global array. Pass the error log into the function or return a new one instead.
*/
