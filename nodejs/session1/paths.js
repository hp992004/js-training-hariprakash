const path = require('path')

console.log("Directory name:", __dirname)
console.log("File name:", __filename)

const joined = path.join(__dirname, 'data', 'users.json')
console.log("Joined path:", joined)

console.log("Extension:", path.extname('index.html'))
console.log("Basename:", path.basename('/users/rahul/notes.txt'))
console.log("Dirname:", path.dirname('/users/rahul/notes.txt'))

/* path.join() is an easier and safer way to build file paths.
It automatically uses the correct path format for any operating system.
Joining strings by hand can sometimes lead to mistakes or broken paths. */