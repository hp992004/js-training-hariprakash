let username = "Alice";
let score = 42;
let isLoggedIn = true;
let middleName = null;
let lastSeen = undefined;
/*
username = 100;      
score = "ninety";    
isLoggedIn = 1;

Error:

src/primitives.ts:7:1 - error TS2322: Type 'number' is not assignable to type 'string'.

7 username = 100;
  ~~~~~~~~

src/primitives.ts:8:1 - error TS2322: Type 'string' is not assignable to type 'number'.

8 score = "ninety";
  ~~~~~

src/primitives.ts:9:1 - error TS2322: Type 'number' is not assignable to type 'boolean'.

9 isLoggedIn = 1;
*/