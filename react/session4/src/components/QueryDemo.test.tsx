import { render, screen } from '../test/test-utils'
import InternCard from './InternCard'

test('getByText throws when element is missing', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)


  expect(screen.getByText('Rahul')).toBeInTheDocument()

})

test('queryBy returns null when element is missing', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)


  expect(screen.queryByText('Absent')).not.toBeInTheDocument()
})

test('getAllBy finds multiple elements', () => {
  render(
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
    </div>
  )


  const presentBadges = screen.getAllByText('Present')
  expect(presentBadges).toHaveLength(2)
})
/*
Use `getByRole` when you expect only one matching element.
Use `getAllByRole` when there should be multiple matching elements
and you want to check all of them.
*/