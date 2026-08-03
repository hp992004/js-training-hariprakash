import { memo } from 'react'
import type { ReactElement } from 'react'

import InternCard from './InternCard'

export interface InternItem {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternListProps {
  interns?: InternItem[]
  onRemove?: (id: number) => void
}

const defaultInterns: InternItem[] = [
  { id: 1, name: 'Hari', score: 95, role: 'Frontend', isPresent: true },
  { id: 2, name: 'Sara', score: 80, role: 'Backend', isPresent: true },
]

const InternList = memo(function InternList({
  interns,
  onRemove: _onRemove,
}: InternListProps): ReactElement {
  const list = interns ?? defaultInterns

  return (
    <div>
      {list.map((i) => (
        <article key={i.id}>
          <div>
            <InternCard name={i.name} score={i.score} isPresent={i.isPresent} />
            <button aria-label="Remove" type="button">
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  )
})

export default InternList


