
interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}


const User1: User = {
  id: 1,
  name: "Hari",
  email: "hari@example.com",
  age: 21,
  role: "admin",
};

const User2: User = {
  id: 2,
  name: "Ram",
  email: "ram@example.com",
  role: "editor",
};

const User3: User = {
  id: 3,
  name: "Arun",
  email: "arun@example.com",
  role: "viewer",
};

/*
const User4: User = {
  id: "4",
  name: "jimmy",
  email: "jimmy@example.com",
  role: "superuser"
};
error TS2322: Type '"superuser"' is not assignable to type '"admin" | "editor" | "viewer"'.

User1.id = "78";
error TS2540: Cannot assign to 'id' because it is a read-only property.
*/

/*
Using readonly on 'id' lets TypeScript enforce immutability at compile time.
It prevents accidental or intentional changes to the identifier and catches
*/