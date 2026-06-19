//task A
const fruits = ["apple", "banana", "cherry"];
const temperatures = [22.5, 19.0, 30.1];
const flags = [true, false, true];

/*task B
fruits.push(42);  
 error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.


temperatures.push("hot");
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
*/

//task C
const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];
/*
mixed.push(true);

error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

string[] and Array<string> both represent an array of strings.
They are interchangeable and compile to the same type in TypeScript.
*/