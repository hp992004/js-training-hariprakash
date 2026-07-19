const path = require('path')

console.log('Current directory:', __dirname) 
// Shows the full path of the folder where this file is located; useful for creating file paths that work from any location.
console.log('Current file:     ', __filename) 
// Shows the full path of the current file; useful for debugging or identifying the file being executed.
const filePath = path.join(__dirname, 'data', 'users.json')
console.log('Joined path:', filePath) 
// Joins folder names into a valid path for any operating system; useful for building file paths safely.
console.log('Basename:', path.basename('/home/user/notes.txt')) 
// Returns only the file name from a complete path; useful when you only need the file name.
console.log('Extension:', path.extname('index.html'))
// Returns the file extension, including the dot; useful for checking the file type.
console.log('Dirname:  ', path.dirname('/home/user/notes.txt')) 
// Returns the folder path without the file name; useful for accessing the parent directory.

// Manual string concatenation — fragile
const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() — safe across all operating systems
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() — always returns an absolute path
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

/*
Difference between path.join() and path.resolve():
path.join() simply joins the given path segments into one path.
path.resolve() returns an absolute path and resolves relative paths from the current working directory.
*/