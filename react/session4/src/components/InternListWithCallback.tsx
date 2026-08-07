import { memo, useCallback } from 'react'
import { useInterns } from '../contexts/intern-context'
import { useTheme } from '../contexts/theme-context'

interface InternRowProps {
  id: number
  name: string
  score: number
  onRemove: (id: number) => void
}

const InternRow = memo(function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme()

  console.log(`InternRow rendered: ${name}`)

  const badge = score >= 50 ? 'Pass' : 'Fail'

  return (
    <div role="row"
      style={{
        background: theme === 'light' ? '#fff' : '#2a2a2a',
        color: theme === 'light' ? '#000' : '#eee',
        padding: '8px',
        margin: '4px 0',
      }}
    >
      <span>
        {name} — {score}
      </span>
      <span> {badge}</span>
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  )
})

function InternListWithCallback() {
  const { interns, removeIntern } = useInterns()

  const handleRemove = useCallback((id: number): void => {
    removeIntern(id)
  }, [removeIntern])

  return (
    <div role="rowgroup">
      {interns.map((i) => (
        <InternRow
          key={i.id}
          id={i.id}
          name={i.name}
          score={i.score}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default InternListWithCallback

/*
`useCallback` memoizes a function so it isn't recreated on every render.
This helps prevent unnecessary re-renders when passing functions as props.
It improves performance by keeping the same function reference when dependencies don't change.
*/

