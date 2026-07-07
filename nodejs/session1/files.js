const fs = require('fs')

fs.writeFileSync('output.txt', 'Hello from Node.js file system!')

const content = fs.readFileSync('output.txt', 'utf8')
console.log("File content:", content)

fs.appendFileSync('output.txt', '\nThis line was appended.')
const updated = fs.readFileSync('output.txt', 'utf8')
console.log("Updated content:", updated)

/*
writeFileSync creates a new file or replaces the existing content.
appendFileSync adds new content to the end of the file without removing what is already there.
*/