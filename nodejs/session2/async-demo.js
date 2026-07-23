const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

console.log('1 — before sync read')
const data = fs.readFileSync(filePath, 'utf8')
console.log('2 — sync read done:', data.split('\n').length, 'lines')
console.log('3 — after sync read')

console.log('---')

console.log('4 — before async read')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err
  console.log('6 — async read done:', data.split('\n').length, 'lines')
})
console.log('5 — after async read (does not wait)')

/*
Async operations let the server do other work while waiting for a task to finish.
This helps the app stay fast and handle multiple users at the same time.
Sync operations make the server wait until the current task is completed.
*/

