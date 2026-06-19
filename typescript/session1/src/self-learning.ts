// 1) union types

// Ex 1
let age: number | string = 21;
age = "Unknown";

// Ex 2
function displayItems(items: string | string[]): void {
  console.log(items);
}

displayItems("Pen");
displayItems(["Pen", "Pencil", "Eraser"]);

// Ex 3
let paymentStatus: boolean | null = null;
paymentStatus = false;

// 2) Literal Types

function makeRequest(requestType: "GET" | "POST"): void {
  console.log(`Sending ${requestType} request`);
}

makeRequest("GET");
makeRequest("POST");

/*
makeRequest("DELETE");
error TS2345: Argument of type '"DELETE"' is not assignable to parameter of type '"GET" | "POST"'.
*/

// 3) 
const weekDays: readonly string[] = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

/*
weekDays.push("Saturday");

error TS2339: Property 'push' does not exist on type 'readonly string[]'.

weekDays[0] = s"Sunday"; 

error TS2542: Index signature in type 'readonly string[]' only permits reading.
*/


let city: string | null = "Chennai";

/*
console.log(city.toUpperCase());
error TS18047: 'city' is possibly 'null'.
*/

if (city !== null) {
  console.log(city.toUpperCase());
}
/*
With strictNullChecks enabled, TypeScript does not allow
calling .toUpperCase() on a value that could be null.
We must check that the value is not null first.
*/