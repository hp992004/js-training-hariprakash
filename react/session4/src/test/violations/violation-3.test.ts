test('calculates average score', () => {
  const scores = [92, 78, 45, 95]
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  console.log('Average:', avg)
})

/*
This test has no assertions, so it never checks whether the result is correct.
It will pass even if the average is calculated incorrectly.
That makes it dangerous because bugs can go unnoticed.
A good test should always verify the expected output using assertions.
This ensures the test actually validates the application's behavior.
*/