function Greeting() {
  return (
    <div>
      <h2>Welcome to React</h2>
      <p>This is a separate component.</p>
    </div>
  )
}

export default Greeting

/*
A React component is a function that creates a part of the user interface.
It returns the content that React should display on the screen.
Components make the application easier to organize and reuse.
*/

/*
Reusing components avoids writing the same code multiple times.
If a change is needed, we only update the component once.
This keeps the code cleaner and easier to maintain.
*/

/*
A <div> creates an extra HTML element in the DOM.
A Fragment groups elements without adding a new HTML element.
We can use a Fragment when I don't need an extra wrapper and want a cleaner DOM.
*/