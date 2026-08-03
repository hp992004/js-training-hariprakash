import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

test('renders the dashboard title', () => {
  render(<Navbar />)

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

test('theme toggle button is visible', () => {
  render(<Navbar />)

  expect(
    screen.getByRole('button', { name: /switch to dark mode/i })
  ).toBeInTheDocument()
})

test('theme toggle button label changes after click', async () => {
  const user = userEvent.setup()
  render(<Navbar />)

  await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))

  expect(
    screen.getByRole('button', { name: /switch to light mode/i })
  ).toBeInTheDocument()
})

/*
If you import `render` directly from `@testing-library/react`,
the component will be rendered without the custom test setup.
This means providers like `InternProvider` will not be included.
As a result, hooks such as `useInterns` cannot access their context.
The test will fail with an error like
`useInterns must be used inside InternProvider`.
Using `../test/test-utils` automatically adds the required providers.
*/

import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '../contexts/theme-context'

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

/*
This test is equivalent to the first three because they all render the component with the required providers.
`customRender` moves the setup into one reusable helper instead of repeating it.
This keeps tests shorter, cleaner, and easier to maintain.
*/