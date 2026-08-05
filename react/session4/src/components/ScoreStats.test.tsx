import { render, screen } from '../test/test-utils'
import ScoreStats from './ScoreStats'

test('shows empty statistics when there are no interns', () => {
  render(<ScoreStats />)

  expect(screen.getByText(/Highest: 0/)).toBeInTheDocument()
  expect(screen.getByText(/Lowest: 0/)).toBeInTheDocument()
  expect(screen.getByText(/Avg: 0/)).toBeInTheDocument()
})

test('does not show a loading message', () => {
  render(<ScoreStats />)

  expect(
    screen.queryByText('Loading interns...')
  ).not.toBeInTheDocument()
})

/*
`findByText` waits for an element to appear before continuing.
It retries automatically until the element is found or times out,
so you usually don't need `waitFor` for simple cases.
*/


/*
Use `findBy` when you're waiting for a specific element to appear.
Use `waitFor` when you're waiting for any condition or assertion to become true.
`findBy` is simpler for elements, while `waitFor` is more flexible.
*/