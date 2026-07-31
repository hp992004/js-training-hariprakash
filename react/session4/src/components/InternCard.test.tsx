import { render,screen} from '../test/test-utils'
import InternCard from './InternCard'

test('renders the intern name', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('renders the score', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Score: 92')).toBeInTheDocument()
})

test('shows Present when isPresent is true', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Present')).toBeInTheDocument()
})

test('shows Absent when isPresent is false', () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />)

  expect(screen.getByText('Absent')).toBeInTheDocument()
})

/*
We import `render` and `screen` from `../test/test-utils`
instead of `@testing-library/react` because our test setup
is already included there. This lets every test use the
same providers and configuration without repeating the
setup code in each file.
*/

test('does not show Absent when intern is present', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.queryByText('Absent')).not.toBeInTheDocument()
})

test('does not show Present when intern is absent', () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />)

  expect(screen.queryByText('Present')).not.toBeInTheDocument()
})

/*
Use `getBy` with `toBeInTheDocument()` when you expect an
element to exist. Use `queryBy` with `not.toBeInTheDocument()`
when you expect an element to be absent, because `queryBy`
returns `null` instead of throwing an error if nothing is found.
*/

test('renders score of 0 correctly', () => {
  render(<InternCard name="Neha" score={0} isPresent={false} />)

  expect(screen.getByText('Score: 0')).toBeInTheDocument()
  expect(screen.getByText('Absent')).toBeInTheDocument()
})

test('renders score of 100 correctly', () => {
  render(<InternCard name="Neha" score={100} isPresent={true} />)

  expect(screen.getByText('Score: 100')).toBeInTheDocument()
  expect(screen.getByText('Present')).toBeInTheDocument()
})

test('renders a different name and score without mixing up values', () => {
  render(<InternCard name="Priya" score={75} isPresent={true} />)

  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Score: 75')).toBeInTheDocument()
})

/*
Testing `0` and `100` checks that the component works
correctly at the minimum and maximum score values.
These edge cases can catch bugs that normal values may miss.
*/