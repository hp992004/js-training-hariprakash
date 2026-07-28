import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  )
}

export default TogglePanel

/*
  Both `setIsOpen(!isOpen)` and `setIsOpen(prev => !prev)` work
  in this example. The functional form is safer because it always
  uses the latest state value, even if multiple updates happen
  quickly or asynchronously, helping avoid stale state issues.
*/