
function multiply(a: number, b: number): number {
  return a * b;
}

function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

function getFirstElement(arr: string[]): string | undefined {
  return arr[0];
}

/*Wrong Arguments

multiply("2", 3);
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

formatName("Alice", 10);
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.


isAdult("18");
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

getFirstElement([1, 2, 3]);
error TS2322: Type 'number' is not assignable to type 'string'.
*/