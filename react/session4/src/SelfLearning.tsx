/*
`React.memo` prevents a component from re-rendering if its props haven't changed.
When a function prop is wrapped with `useCallback`, its reference stays the same,
allowing `React.memo` to skip unnecessary re-renders.

const InternRow = memo(function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme()
  console.log(`InternRow rendered: ${name}`)
*/


/*
`useMemo` is not useful for simple calculations like `count + 1` or string concatenation,
because remembering the value can cost more than recalculating it.

`useCallback` should not be used for every function. If the function isn't passed to a
memoized child component or used as a dependency, it only adds extra code and complexity
without improving performance.
*/


/*
`useReducer` is useful when state has multiple related updates or complex logic.
It keeps all state changes organized in one place.
This makes the code easier to read and maintain.
For simple state updates, `useState` is usually a better choice.
*/


/*
`useContext` with `useState` works well for small to medium applications where
only a few components need to share state. Libraries like Zustand or Redux Toolkit
are a better choice for large applications with complex shared state and frequent
updates across many components. They provide better organization, easier debugging,
and more scalable state management. While Context is simple and built into React,
state management libraries offer more features for handling complex application logic.
*/