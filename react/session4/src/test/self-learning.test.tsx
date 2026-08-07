import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '../test/test-utils'
import InternList from '../components/InternList'
import AddInternForm from '../components/AddInternForm'
import userEvent from '@testing-library/user-event'

describe('Fake timers', () => {
  it('fast-forwards a loading delay', () => {
    vi.useFakeTimers()

    const callback = vi.fn()

    setTimeout(() => {
      callback()
    }, 2000)

    expect(callback).not.toHaveBeenCalled()

    vi.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})

/*
`vi.useFakeTimers()` replaces the real timer functions
with fake timers controlled by Vitest.
This lets you fast-forward `setTimeout` and `setInterval`
without waiting for real time to pass.
After the test, call `vi.useRealTimers()`
to restore the normal timer behavior.
*/

describe('within helper', () => {
  it('finds a score inside a specific intern card', () => {
    render(<InternList />)

    // Find the card for a specific intern
    const hariCard = screen.getByText('Hari').closest('article')!

    // Search only inside this card
    expect(within(hariCard).getByText('Score: 95')).toBeInTheDocument()

    // Ensure another score is not inside this card
    expect(within(hariCard).queryByText('Score: 80')).not.toBeInTheDocument()
  })
})

/*
`within` limits queries to a specific element instead of the whole page.
It is useful when the same text appears in multiple places.
This lets you check only one component or card.
The test becomes more accurate and avoids matching the wrong element.
*/

describe('Keyboard navigation', () => {
  it('moves focus between form inputs using Tab', async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const nameInput = screen.getByLabelText(/name/i)
    const roleInput = screen.getByLabelText(/role/i)
    const scoreInput = screen.getByLabelText(/score/i)

    await user.tab()
    expect(nameInput).toHaveFocus()

    await user.tab()
    expect(roleInput).toHaveFocus()

    await user.tab()
    expect(scoreInput).toHaveFocus()
  })
})

/*
`user.tab()` simulates pressing the Tab key during a test.
It moves focus between interactive elements in the same order as a user.
This helps verify that keyboard navigation works correctly.
You can use `toHaveFocus()` to check which element is focused.
Testing focus improves the accessibility of your application.
It also ensures users who rely on the keyboard can use the form properly.
*/

/*
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
  useInternForm.tsx  |     100 |    94.73 |     100 |     100 | 31 


Line coverage measures whether each line of code was executed by the tests.
Branch coverage checks whether every possible path, such as both `if` and `else`,
has been tested.
A test can achieve high line coverage while still missing some branches.
Branch coverage provides a more complete check of your application's logic.
Using both metrics helps create stronger and more reliable tests.
*/