// task A
const userRecord: [string, number, boolean] = ["Alice", 30, true];

// task B

console.log(userRecord[0].toUpperCase());
console.log(userRecord[1].toFixed(2));
console.log(userRecord[2].toString());

/* Task C
const wrongOrder: [string, number, boolean] = [30, "Alice", true];

error TS2322: Type 'string' is not assignable to type 'number'.
*/

// Task D

const coordinates: [number, number] = [19.076, 72.877];

/*
A tuple has a fixed number of positions and predefined types.
Since this tuple only defines indexes 0, 1, and 2,
adding an element at index 3 causes a TypeScript error.
*/