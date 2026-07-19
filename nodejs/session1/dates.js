const dayjs = require('dayjs')

console.log("Today:", dayjs().format('YYYY,MM,DD'))
console.log("Day of week:", dayjs().format('dddd'))
console.log("Next week:", dayjs().add(7, 'day').format('DD MMM YYYY'))
console.log("Is before 2030?", dayjs().isBefore('2030-01-01'))

/* require('dayjs') loads the Day.js package into our program.
Node.js looks for it inside the node_modules folder and then uses it in the code. */