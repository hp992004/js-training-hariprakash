interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

// 1. Partial<T>
// Partial makes all properties optional.
function updateUser(
  user: User,
  updates: Partial<User>
): User {
  return { ...user, ...updates };
}
const currentUser: User = {
  id: "U101",
  name: "Hari",
  email: "hari@example.com",
  role: "viewer",
};
const updatedUser = updateUser(currentUser, {
  name: "Hariprakash",
});

// 2. Pick<T, K>
// Pick creates a type with only the selected properties.
type UserContact = Pick<User, "name" | "email">;
function sendWelcomeEmail(user: UserContact): void {
  console.log(`Welcome ${user.name}!`);
  console.log(`Email sent to ${user.email}`);
}
sendWelcomeEmail({
  name: "Ram",
  email: "ram@example.com",
});


// 3. Omit<T, K>
// Omit creates a type without the specified property.
type NewUser = Omit<User, "id">;

function createUser(user: NewUser): User {
  return {
    id: Math.random().toString(),
    ...user,
  };
}
const newUser = createUser({
  name: "Meera",
  email: "meera@example.com",
  role: "editor",
});

// 4. Record<K, V>
// Record creates an object type with fixed keys and value types.
type RolePermissions = Record<
  "admin" | "editor" | "viewer",
  string[]
>;
const permissions: RolePermissions = {
  admin: ["create", "update", "delete"],
  editor: ["create", "update"],
  viewer: ["read"],
};
function getPermissions(
  role: keyof RolePermissions
): string[] {
  return permissions[role];
}
console.log(getPermissions("admin"));
console.log(getPermissions("viewer"));