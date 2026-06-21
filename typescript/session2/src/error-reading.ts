/* Error 1: Property 'username' does not exist on type 'User'.
You are trying to access a property that is not defined in the User type.

Error Code:
interface User {
  name: string;
}

const user: User = { name: "Hari" };
console.log(user.username);
*/
//Correct code:
interface User {
  name: string;
}

const user: User = { name: "Hari" };
console.log(user.name);

/* Error 2: Argument of type 'string' is not assignable to parameter of type 'number'.
A function expects a number, but a string is being passed instead.

Error Code:
function square(num: number): number {
  return num * num;
}
square("5");
*/
//Correct code:
function square(num: number): number {
  return num * num;
}

square(5);

/* Error 3: Parameter 'data' implicitly has an 'any' type.
A function parameter has no type annotation, and TypeScript cannot determine its type.

Error Code:
function printData(data) {
  console.log(data);
}
*/
//Correct code:
function printData(data: string): void {
  console.log(data);
}


/* Error 4: Object is possibly 'undefined'.
A value might be undefined, so using it directly could cause a runtime error.

Error Code:
const names = ["Hari", "Ram"];
const found = names.find((name) => name === "Sam");
console.log(found.toUpperCase());
*/
//Correct code:
const names = ["Hari", "Ram"];

const found = names.find((name) => name === "Sam");

if (found !== undefined) {
  console.log(found.toUpperCase());
} else {
  console.log("User not found");
}

/* Error 5: Type 'string | undefined' is not assignable to type 'string'.
A value can be either a string or undefined, but it is being assigned to a variable that only accepts strings.

Error Code:
interface Profile {
  bio?: string;
}
const profile: Profile = {};
const bio: string = profile.bio;
*/
interface Profile {
  bio?: string;
}
const profile: Profile = {};
if (profile.bio !== undefined) {
  const bio: string = profile.bio;
  console.log(bio);
}