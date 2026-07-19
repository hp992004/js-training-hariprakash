console.log("Node version:", process.version)
/*
Shows the version of Node.js that is currently running.
This is useful to check if the project is using the correct Node.js version.
*/

console.log("Platform:", process.platform)
/*
Shows the operating system where the program is running.
This helps when the app behaves differently on Windows, Linux, or macOS.
*/

console.log("Current directory:", process.cwd())
/*
Shows the current folder from which the program is being executed.
This is helpful when working with files and folders.
*/

console.log("Memory usage:", process.memoryUsage())
/*
Shows how much memory the Node.js program is using.
This can help when checking the app's performance or memory usage.
*/

const args = process.argv
console.log("All arguments:", args)
console.log("Your input:", args[2])
/*
Command line arguments let us pass values while running the program.
This is useful for tools where the user provides input, like a file name,
a search keyword, or a command, without changing the code each time.
*/

console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("HOME:", process.env.HOME || process.env.USERPROFILE)

/*
Environment variables keep sensitive information like API keys and database URLs out of the code.
They also make it easy to use different settings for development and production.
*/