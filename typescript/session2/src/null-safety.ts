// Function 1
function getFirstWord(sentence: string | null): string {
  if (sentence === null) {
    return "";
  }
  const words = sentence.split(" ");
  if (words.length === 0) {
    return "";
  }
  return words[0] ?? "";
}
/*
If sentence is null, calling split() would cause
"Cannot read properties of null" at runtime.
*/

function getUserAge(user: { name: string; age?: number }): string {
  const age = user.age ?? "unknown";
  return `${user.name} is ${age} years old`;
}
/*
If age is undefined, calling toString() would cause
"Cannot read properties of undefined" at runtime.
*/

const config = {
  database: {
    host: "localhost",
    port: 5432,
  },
};

function getDbPort(): number {

  return config.database.port;
}
/* 
This is already safe because database and port
always exist in the config object. 
*/

const users = ["Alice", "Bob", "Charlie"];

function findUser(name: string): string {
  const found = users.find((u) => u === name);
  if (found === undefined) {
    return "USER NOT FOUND";
  }
  return found.toUpperCase();
}
/*If no user is found, found will be undefined.
  Calling toUpperCase() on undefined would cause
  "Cannot read properties of undefined" at runtime.*/