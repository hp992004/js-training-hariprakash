const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)


/*
writeFileSync() creates a new file or replaces all the existing content.
appendFileSync() adds new content to the end of the file without removing
what is already there. Use writeFileSync() to start fresh and appendFileSync()
when you want to keep adding more data.
*/


const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
If the file doesn't exist, readFileSync() will throw an error and stop the program.
A better approach is to check if the file exists first or use try...catch
to handle the error without crashing the application.
*/