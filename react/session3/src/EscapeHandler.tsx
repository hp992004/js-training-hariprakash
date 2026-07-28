import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false)
        console.log('keydown fired')
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Panel</button>

      {isOpen && (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '8px' }}>
          <p>Panel is open. Press Escape to close.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default EscapeHandler

/*
  Without the cleanup, a new event listener is added every time the panel opens.
  After opening and closing it multiple times, pressing Escape logs the message multiple times because the old listeners are still attached.
*/