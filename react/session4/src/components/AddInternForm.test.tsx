/*
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'

test('updates name when user types', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
})

test('updates score when user types', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)

  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '92')

  expect(screen.getByDisplayValue('92')).toBeInTheDocument()
})

/*
`userEvent` simulates user actions more realistically.
It triggers events in the same order a real user would.
This makes tests more reliable and closer to real usage.


test('resets name input when Reset is clicked', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
  await user.click(screen.getByRole('button', { name: 'Reset' }))

  expect(screen.getByPlaceholderText('Name')).toHaveValue('')
})

test('calls onAdd with intern data when form is submitted', async () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()   // tracked mock function
  render(<AddInternForm onAdd={onAdd} count={0} />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '92')
  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(onAdd).toHaveBeenCalledTimes(1)
  expect(onAdd).toHaveBeenCalledWith(
    expect.objectContaining({ name: 'Rahul', score: 92 })
  )
})

/*
`expect.objectContaining()` checks only the properties you care about.
It ignores any extra properties, making the test more flexible
and easier to maintain when the object changes.


test('shows error when name is empty on submit', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
})

test('shows error when score is above 100', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '150')
  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(screen.getByText('Score must be between 0 and 100')).toBeInTheDocument()
})

test('does not call onAdd when form is invalid', async () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()
  render(<AddInternForm onAdd={onAdd} count={0} />)


  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(onAdd).not.toHaveBeenCalled()
})

/*
`toHaveBeenCalledTimes(0)` checks that the function was called zero times.
`not.toHaveBeenCalled()` means the function was never called at all.
Both work the same, but `not.toHaveBeenCalled()` is easier to read and understand.


import { waitFor } from '../test/test-utils'

test('error clears when valid name is entered after failed submit', async () => {
  const user = userEvent.setup()
  render(<AddInternForm onAdd={() => {}} count={0} />)


  await user.click(screen.getByRole('button', { name: 'Add Intern' }))
  expect(screen.getByText('Name is required')).toBeInTheDocument()

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  await waitFor(() => {
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
  })
})


Use `queryBy` when checking that an element should not exist.
Unlike `getBy`, it returns `null` instead of throwing an error,
making it the right choice for absence checks.
*/


import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'

describe('AddInternForm', () => {

  describe('initial state', () => {
    test('name input is empty', () => {
      render(<AddInternForm onAdd={() => {}} count={0} />)
      expect(screen.getByPlaceholderText('Name')).toHaveValue('')
    })

    test('score input starts at 0', () => {
      render(<AddInternForm onAdd={() => {}} count={0} />)
      expect(screen.getByPlaceholderText('Score')).toHaveValue(0)
    })

    test('role defaults to Frontend', () => {
      render(<AddInternForm onAdd={() => {}} count={0} />)
      expect(screen.getByRole('combobox', { name: 'Role' })).toHaveValue('Frontend')
    })
  })

  describe('validation', () => {
    test('shows error when name is empty on submit', async () => {
      const user = userEvent.setup()
      render(<AddInternForm onAdd={() => {}} count={0} />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(
  screen.getByText(
    'validateInternForm: expected a non-empty name, got: ""'
  )
).toBeInTheDocument()
    })

    test('shows error when score is above 100', async () => {
      const user = userEvent.setup()
      render(<AddInternForm onAdd={() => {}} count={0} />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '150')
      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

expect(
  screen.getByText(
    'validateInternForm: expected score between 0 and 100, got: 150'
  )
).toBeInTheDocument()
    })

    test('clears error when valid name is entered', async () => {
      const user = userEvent.setup()
      render(<AddInternForm onAdd={() => {}} count={0} />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))
      expect(
  screen.getByText(
    'validateInternForm: expected a non-empty name, got: ""'
  )
).toBeInTheDocument()

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

      await waitFor(() => {
        expect(
  screen.queryByText(
    'validateInternForm: expected a non-empty name, got: ""'
  )
).not.toBeInTheDocument()
      })
    })
  })

  describe('on successful submit', () => {
    test('form inputs clear after submission', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      render(<AddInternForm onAdd={onAdd} count={0} />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '92')
      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Name')).toHaveValue('')
      })
    })
  })
})

/*
Keep `describe` blocks to two levels so tests stay easy to read and navigate.
Deep nesting makes it harder to understand the test structure
and can make failures more difficult to trace.
*/