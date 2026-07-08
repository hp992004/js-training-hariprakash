/*
React.StrictMode helps identify potential problems while developing the app.
It checks the code and shows warnings for unsafe or outdated practices.
It only runs in development and does not affect the production build.
This helps catch bugs early before the app is deployed.
*/

/*
A controlled component stores its value in React state.
An uncontrolled component lets the DOM manage its own value.
Controlled components are preferred when React needs to track or update the input.

Controlled: <input value={name} onChange={...} />
Uncontrolled: <input ref={inputRef} />

*/

/*
The key prop helps React identify each item when a list is updated.
Using the array index as a key can cause issues if items are added, removed, or reordered.
It's better to use a unique and stable value like an id as the key.

items.map(item => <li key={item.id}>{item.name}</li>)
*/

/*
The short Fragment syntax (<>...</>) can't be given a key.
If we need to add a key, we have to use <React.Fragment key={...}>.
This is helpful when rendering a list without adding extra div elements.
It allows React to keep track of each item correctly.

<React.Fragment key={item.id}>
  <h3>{item.name}</h3>
  <p>{item.score}</p>
</React.Fragment>
*/
