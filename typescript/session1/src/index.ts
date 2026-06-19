//Task 1.1
console.log("TypeScript is running");

//Task 1.2

/* 
const age: number = "thirty";
src/index.ts:3:7 - error TS2322: Type 'string' is not assignable to type 'number'.

3 const age: number = "thirty";
        ~~~
Found 1 error in src/index.ts:3
*/

const age: number = 30;
// No errors

/*
You will run tsc --noEmit when you wish to do error-checking with TypeScript but not have any generated files output.

Running checks in CI/CD pipeline and you want to ensure your code is correct.

You are doing development on your own machine and you just want to verify the types without outputting build files.
*/

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

/* The type annotations are stripped out when TypeScript is compiled to JavaScript.
The generated .js file contains only standard JavaScript code.
This means TypeScript provides type safety before the code runs, through its
compiler, rather than at runtime.
*/