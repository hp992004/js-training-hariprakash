type UserId = string;
type ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

function getUserById(id: UserId): void {
  console.log(`Getting user: ${id}`);
}

function updateStatus(id: UserId, status: Status): void {
  console.log(`Updating ${id} to ${status}`);
}

function move(direction: Direction, steps: number): void {
  console.log(`Moving ${steps} steps towards ${direction}`);
}

getUserById("USR101");
updateStatus("USR101", "active");
move("east", 5);

const randomString = "ABC123";
getUserById(randomString);

/*
TypeScript does not give an error here because UserId is just
an alias for string. A plain string and a UserId are treated as
the same type, so any string value can be passed where UserId is expected.
*/

/*
TypeScript looks at what a type is made of instead of its name. Since both
UserId and ProductId are just strings, TypeScript treats them the same.
This can be a problem because we could accidentally use a ProductId where
a UserId is expected, and TypeScript would not catch the mistake.
*/