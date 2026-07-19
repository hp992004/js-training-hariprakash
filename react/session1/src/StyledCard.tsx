function StyledCard() {
  return (
    <div className="card">
      <h3 className="card-title">Styled with className</h3>
      <p style={{ color: 'steelblue', fontSize: '14px' }}>
        This paragraph uses inline styles in TSX.
      </p>
      <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
        Bold and uppercase text.
      </p>
    </div>
  )
}

export default StyledCard

/*
Inline styles in TSX use a JavaScript object instead of a CSS string.
CSS property names are written in camelCase to match JavaScript naming rules.
This lets React work with styles as regular JavaScript values.
*/