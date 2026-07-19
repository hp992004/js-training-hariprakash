import { render, screen } from '../test/test-utils'
import InternRow from './InternRow'
import userEvent from '@testing-library/user-event'

test('finds the Remove button by role', () => {
  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={() => {}} />
  )

  const removeButton = screen.getByRole('button', { name: 'Remove' })
  expect(removeButton).toBeInTheDocument()
})

test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  await user.click(screen.getByRole('button', { name: 'Remove' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  expect(onRemove).not.toHaveBeenCalled()
})

/*
`screen.debug()` prints the rendered HTML in the test output.
It helps you see what was actually rendered so you can choose
the correct query or fix a failing test.
*/

/*
`vi.fn()` creates a mock function that records how it is used.
Unlike a real function, you can check how many times it was called
and what arguments it received without running real logic.
*/