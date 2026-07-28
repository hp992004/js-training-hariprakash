const message = "Hello from Node.js"
console.log(message)

const fruits = ["apple", "banana", "mango"]
const upper = fruits.map(f => f.toUpperCase())
console.log(upper)

/*
Output:
Hello from Node.js
[ 'APPLE', 'BANANA', 'MANGO' ]
*/

/*
Browser JavaScript runs inside a web page and can access HTML and CSS.
Node.js runs JavaScript directly from the terminal without needing a browser.
In Node.js, the output is shown in the terminal instead of the browser console.
*/

/*
> 10*5
50
> "hello".toUpperCase()
'HELLO'
>  [1, 2, 3].filter(n => n > 1)
[ 2, 3 ]
> typeof "hello"
'string'
> typeof 42
'number'
> .exit
*/

/*
REPL stands for Read, Eval, Print, and Loop.
It lets us write and test JavaScript code interactively in the Node.js terminal.
It is useful for quickly trying out code without creating a separate file.
*/