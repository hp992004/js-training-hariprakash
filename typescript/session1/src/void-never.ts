// A

function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}

const result = logEvent("user_login");

console.log(result);

//Result will be undefined since void function returns nothing.

// B

function fail(message: string): never {
  throw new Error(message);
}

// C
function doSomething(): void {
  //return "hello";
}
//error TS2322: Type 'string' is not assignable to type 'void'.

//Another never function 
function keepRunning(): never {
  while (true) {
    console.log("Running...");
  }
}

/*
This function has a return type of 'never' because it never finishes executing.
The infinite loop prevents the function from reaching an end or returning a value.
*/