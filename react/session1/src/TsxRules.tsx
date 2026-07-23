function TsxRules() {
  return (
    <div>
      <input type="text"/>
      {/* Input elements must be self-closing in TSX. */}
      <p className="highlight">Styled paragraph</p>
      {/* TSX uses className because class is a JavaScript keyword. */}
      <label htmlFor="email">Email</label>
      {/* htmlFor replaces for because for is used in JavaScript. */}
      <input id="email" type="email"/>
      {/* Self-closing tag is required for input elements. */}
      <p style={{color: "red", fontSize: "16px"}}>Red text</p>
      {/* The style prop takes a JavaScript object with camelCase property names. */}

      {/* This is a comment */}
      {/* TSX comments must be written inside curly braces instead of HTML comment syntax. */}
    </div>
  )
}

export default TsxRules