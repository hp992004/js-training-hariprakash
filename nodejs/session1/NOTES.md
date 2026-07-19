
## name
The name of the project. It helps identify your application.

## version
Shows the current version of the project. It is updated when new changes are released.

## description
A short explanation of what the project does.

## main
The main file that starts the application, like `index.js`.

## scripts
Commands that make common tasks easier, such as starting the app or running tests.

## keywords
Words that describe the project so it is easier to find.

## author
The name of the person or team who created the project.

## license
Tells others how they are allowed to use the project.

## dependencies
Lists the packages the project needs to run properly.

## devDependencies
Lists packages that are only needed while developing the project, such as testing or formatting tools.

## Why npm scripts are useful

npm scripts give simple names to commands, so everyone on the team runs the project the same way.
Even if the command becomes long or changes later, only `package.json` needs to be updated.


## dependencies & devDependencies

dependencies are packages the app needs to run.
devDependencies  are only needed while developing the app.

`nodemon` is a devDependency because it helps restart the app during development, but it is not needed when the app is running for users.

## package.json & package-lock.json

`package.json` lists the packages our project needs.

`package-lock.json` stores the exact versions that were installed, so everyone gets the same packages when they install the project.

#Self Learning:

## __dirname and __filename

`__dirname` gives the path of the current folder.
`__filename` gives the full path of the current file.

They are not available in ES Modules because ES Modules do not provide these variables by default.
Instead, we use `import.meta.url` along with the `url` module to get the current file and folder path.

## npm install vs npm ci

Use `npm install` when adding new packages or working on a project.

Use `npm ci` when you want a clean install with the exact package versions, such as in CI/CD or automated builds.