/*
noImplicitAny - Prevents TypeScript from automatically assigning the any type
to variables, parameters, or expressions whose type cannot be inferred.

strictNullChecks - Treats null and undefined as separate types and prevents assigning them 
to variables unless they are explicitly allowed.
*/


/*
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet("Hari"));

In non-strict mode, TypeScript automatically treats 'name' as type 'any'.
Since 'any' can accept any value, no error is shown.

In strict mode , TypeScript throws an error
because the parameter 'name' has no explicit type annotation.
*/

//Corrected script
function greet1(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet1("Hari"));