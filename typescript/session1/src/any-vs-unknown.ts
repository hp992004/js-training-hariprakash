// Part A — any
let dangerousValue: any = "hello";
dangerousValue = 42;
dangerousValue = { name: "Alice" };
console.log(dangerousValue.foo.bar);

// Part B — unknown

let safeValue: unknown = "hello";
/*
console.log(safeValue.toUpperCase());

src/any-vs-unknown.ts:9:13 - error TS18046: 'safeValue' is of type 'unknown'.

9 console.log(safeValue.toUpperCase());
*/

//Corrected
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase()); 
}
/*
Type narrowing is the process of identifying a value's specific type at runtime,
allowing TypeScript to provide better type safety and error checking.
*/