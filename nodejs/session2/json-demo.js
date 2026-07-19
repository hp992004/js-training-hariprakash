const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const raw   = fs.readFileSync(filePath, 'utf8')
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length
console.log('Average score:', avg.toFixed(1))


/*
JSON.parse() changes JSON text into a JavaScript object.
Without it, the data stays as a normal string.
This makes it easier to access and use the data in the program.
*/

// Add a new user
const newUser = { id: 5, name: 'Vikram', role: 'intern', score: 88 }
users.push(newUser)

// Write back to file
const updated = JSON.stringify(users, null, 2)
fs.writeFileSync(filePath, updated)
console.log('User added and file updated')

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)

/*
The null, 2 option formats the JSON with proper indentation, making it easy to read.
Without it, the entire JSON would be written on a single line.
It doesn't change the data, only how it looks in the file.
*/

const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const index = currentData.findIndex(u => u.name === 'Amit')
if (index !== -1) {
  currentData[index].score = 90
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  console.log('Amit score updated to 90')
}

/*
find() gives you the item that matches the condition.
findIndex() gives you the position of that item in the array.
findIndex() is useful when you want to update or delete the item.
*/