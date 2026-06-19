// task A

function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

greetUser("Alice");
greetUser("Alice", "Dr.");

// task B

function createAccount(email: string, role: string = "user"): object {
  return { email, role };
}

createAccount("alice@example.com");
createAccount("bob@example.com", "admin");
/*
1. Optional parameter (name?: string) can be undefined.
2. Default parameter (name: string = "Guest") always has a value.
3. Use an optional parameter when the value is truly optional.
4. Use a default parameter when you want a fallback value automatically.
*/