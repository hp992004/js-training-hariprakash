import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryBar } from '../components/SummaryBar'
import type { Intern } from '../types/intern'

const sortedInterns: Intern[] = [
  {
    id: 1,
    name: 'Rahul',
    score: 92,
    role: 'Frontend',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Priya',
    score: 78,
    role: 'Backend',
    isPresent: false,
  },
]

describe('SummaryBar', () => {
  test('shows correct total', () => {
    render(
      <SummaryBar
        total={3}
        presentCount={2}
        averageScore={80}
        sortedInterns={sortedInterns}
      />
    )

    expect(screen.getByText(/Total: 3/)).toBeInTheDocument()
  })

  test('shows correct present count', () => {
    render(
      <SummaryBar
        total={3}
        presentCount={2}
        averageScore={80}
        sortedInterns={sortedInterns}
      />
    )

    expect(screen.getByText(/Present: 2/)).toBeInTheDocument()
  })

  test('shows averageScore 0 correctly when no interns', () => {
    render(
      <SummaryBar
        total={0}
        presentCount={0}
        averageScore={0}
        sortedInterns={[]}
      />
    )

    expect(screen.getByText(/Avg Score: 0/)).toBeInTheDocument()
  })

  test('updates all values when props change', () => {
    const { rerender } = render(
      <SummaryBar
        total={3}
        presentCount={2}
        averageScore={80}
        sortedInterns={sortedInterns}
      />
    )

    rerender(
      <SummaryBar
        total={5}
        presentCount={4}
        averageScore={90}
        sortedInterns={sortedInterns}
      />
    )

    expect(screen.getByText(/Total: 5/)).toBeInTheDocument()
    expect(screen.getByText(/Present: 4/)).toBeInTheDocument()
    expect(screen.getByText(/Avg Score: 90/)).toBeInTheDocument()
  })
})

/*
None of these tests use vi.mock or need a Provider because SummaryBar
gets all its data through props. This makes the presentational component
simple and easy to test.

The container is harder to test because it depends on context and needs
a Provider or mocking to supply the data.
*/
/*
None of these tests use vi.mock or need a Provider because SummaryBar
gets all its data through props. This makes the presentational component
simple and easy to test.

The container is harder to test because it depends on context and needs
a Provider or mocking to supply the data.
*/