function StatusBadge() {
  const isAdmin:    boolean  = true
  const hasWarning: boolean  = true
  const isVerified: boolean  = true
  const messages:   string[] = ['Assignment submitted', 'PR created']

  return (
    <div>
      {/* Show only if admin */}
      {isAdmin && <span>Admin</span>}

      {/* Show only if warning */}
      {hasWarning && <p style={{ color: 'orange' }}>Warning: incomplete tasks</p>}

      {/* Show only if verified */}
      {isVerified && <span>Verified</span>}

      {/* Show empty state only when no messages */}
      {messages.length === 0 && <p>No messages yet</p>}

      {/* Show list only when messages exist */}
      {messages.length > 0 && (
        <ul>
          {messages.map((msg: string, i: number) => <li key={i}>{msg}</li>)}
        </ul>
      )}
    </div>
  )
}

export default StatusBadge

/*
When messages is empty, React displays 0 because the expression returns 0.
Using messages.length > 0 avoids this and only renders the list when it has items.
*/