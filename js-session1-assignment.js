console.log("hello");

//Section 1 - Variables & Types

const name="Hariprakash I A";
let age=21;
let role="AI Engineer";
let isAvailable =true;

//name = "robin"
/* Uncaught TypeError: Assignment to constant variable.
    at js-session1-assignment.js:7:6*/

console.log("name is a "+typeof(name));
console.log("age is a "+typeof(age));
console.log("role is a "+typeof(role));
console.log("isAvailable is a "+typeof(isAvailable));

// Section 2 — Template Literals

console.log(`Hi, I'm ${name} and I'm a ${role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${name.length} characters`);

//Section 3 — Arrow Functions

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Alice", "Johnson"));

const isAdult = (age) => age >= 18;
console.log(isAdult(14));
console.log(isAdult(30));

const format_user = {
    name: "Alice",
    role: "dev"
};
const formatUser = (format_user) => `${format_user.name} — ${format_user.role}`;
console.log(formatUser(format_user));

//Section 4

const user = {
  id: 1,
  name: "Alice",
  role: "dev",
  active: true,
  address: {
    city: "Mumbai",
    country: "India"
  }
};

const { name: userName, role: userRole, active } = user;

console.log(userName);
console.log(userRole);
console.log(active);

const {address: { city }} = user;

console.log(city);

const updatedUser = {...user,active: false};

console.log(updatedUser);

//Section 5

const devs = ["Alice", "Carol"]
const designers = ["Bob", "Dan"]

const team =[...devs,...designers];
console.log(team);

const team1 = [...team, "Eve"];
console.log(team);

const [first, second] = team1;

console.log(first);
console.log(second);

//Section 6

const users = [
  { id: 1, name: "Alice", role: "dev",    active: true  },
  { id: 2, name: "Bob",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Dan",   role: "design", active: true  },
  { id: 5, name: "Eve",   role: "dev",    active: false },
]

const activeUsers = users.filter(user => user.active).map(user => user.name);

console.log(activeUsers);

const devUsers = users.filter(user => user.role === "dev");
console.log(devUsers);

const userDescriptions = users.map(user => `${user.name} is a ${user.role}`);

console.log(userDescriptions);

const activeDevs = users.filter(user => user.active && user.role === "dev").map(user => user.name);

console.log(activeDevs);

//Section 7

const roleCount = users.reduce((acc, user) => {acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

console.log(roleCount);

const ActiveDesigner = users.find(user => user.role === "design" && user.active);

console.log(ActiveDesigner);

const InactiveUser = users.some(user => !user.active);

console.log(InactiveUser);

const allHaveRole = users.every(user => user.role);

console.log(allHaveRole);

//Section 8

const input = "5";
const score = 5;

if (input === score) {
  console.log("match");
}

/* Wrong: == performs type coercion.
"5" == 5 is true because JavaScript converts the string "5" to the number 5.
Use === to compare both value and type.
 */

const doubled = [1, 2, 3].map(n => {
  return n * 2;
});

console.log(doubled);

/*
Wrong: Using {} creates a function body, so you must explicitly return a value.
Without return, each callback returns undefined.
*/

const original = [1, 2, 3];
const updated = [...original, 4];

console.log(original); 
console.log(updated);  

/*
Wrong: push() mutates the existing array.
The spread operator creates a new array, keeping the original unchanged.
*/

const userInfo = {
  name: "Alice",
  active: true
};

/*
const prevents the variable from being
reassigned to a new object.

However, the properties inside the object
can still be modified.

Therefore, changing userInfo.active does
not produce any error and updates the
existing object successfully.
*/

userInfo.active = false;

console.log(userInfo);

//Section 9

const Username = "Alice";
const username = "Bob";

console.log(Username); 
console.log(username); 

/*
JavaScript is case-sensitive.
'Username' and 'username' are two different variables.
*/

const a = null;
const b = undefined;

console.log(typeof a); 
console.log(typeof b); 

/*
null: Represents an intentional absence of a value.
undefined: Means a variable has not been assigned a value.

Note: typeof null returns "object" due to a historical bug in JavaScript.
It is not actually an object.
 */


const greet = (name) => `Hello, ${name}`;

console.log(greet("Alice"));

/*
Arrow functions are stored in variables and
cannot be used before they are declared.

Trying to call them earlier causes a
ReferenceError.

For this reason, define the arrow function
first and then invoke it.
*/


const p = 10;
const q = 20;

console.log(p + q); 

/*
JavaScript supports writing statements
with or without semicolons.

Neither approach is wrong, but using a
single style throughout the file makes
the code easier to read and maintain.
*/