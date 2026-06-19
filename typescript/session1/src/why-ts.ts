/*
type User = { fullName: string };

function getUserLabel(user: User): string {
  return user.fullNme.toUpperCase(); // keep the typo for now
}

Error:

src/why-ts.ts:4:15 - error TS2551: Property 'fullNme' does not exist on type 'User'. Did you mean 'fullName'?

4   return user.fullNme.toUpperCase(); // keep the typo for now
                ~~~~~~~

  src/why-ts.ts:1:15
    1 type User = { fullName: string };
                    ~~~~~~~~
    'fullName' is declared here.
*/

type User = {
  fullName: string;
};

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase();
}
/*
In JavaScript, we didn't notice the typo until the application was running.
In TypeScript, the compiler caught the typo before the application even started.
*/