import { render, screen } from '../test/test-utils'
import InternList from './InternList'
import InternCard from './InternCard'

// Replace only the hook while keeping other exports like InternProvider
vi.mock('../contexts/intern-context', async () => {
  const actual = await vi.importActual<any>('../contexts/intern-context')

  return {
    ...actual,
    useInterns: () => ({
      interns: [
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
        { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
        { id: 3, name: 'Amit', score: 45, role: 'Fullstack', isPresent: false },
      ],
      isLoading: false,
      addIntern: vi.fn(),
      removeIntern: vi.fn(),
    }),
  }
})

test('renders all interns from context', () => {
  render(
    <InternList
      interns={[
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
        { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
        { id: 3, name: 'Amit', score: 45, role: 'Fullstack', isPresent: false },
      ]}
      onRemove={() => {}}
    />
  )

  expect(screen.getByText('Rahul')).toBeInTheDocument()
  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Amit')).toBeInTheDocument()
})

test('renders correct number of intern cards', () => {
  render(
    <InternList
      interns={[
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
        { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
      ]}
      onRemove={() => {}}
    />
  )

  
  const removeButtons = screen.getAllByRole('button', { name: 'Remove' })
  expect(removeButtons).toHaveLength(2)
})

/*
Mock only external dependencies like APIs or timers to keep tests reliable.
Let your own application code run whenever possible so you're testing
the real behavior instead of a fake implementation.
*/

test('no console errors during InternCard render', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(spy).not.toHaveBeenCalled()
  spy.mockRestore()
})

/*
`vi.fn()` creates a standalone mock function that you can track and control.
`vi.mock()` replaces an entire module with mocked versions for testing.
`vi.spyOn()` watches an existing function and can mock or verify its calls.
*/

