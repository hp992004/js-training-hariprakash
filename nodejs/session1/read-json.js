const fs = require('fs')

const raw = fs.readFileSync('nodejs/session1/data.json', 'utf8')
const data = JSON.parse(raw)

console.log("All users:", data.users)
console.log("First user:", data.users[0].name)

const interns = data.users.filter(u => u.role === 'intern')
console.log("Interns:", interns.map(u => u.name))

/*
PS D:\task1\js\js-training-hariprakash> node .\nodejs\session1\read-json.js
<anonymous_script>:5
    { "id": 3 "name": "Amit", "role": "intern" }
              ^

SyntaxError: Expected ',' or '}' after property value in JSON at position 137 (line 5 column 15)
*/

/*
JSON.parse() converts JSON data into a JavaScript object.
If the JSON file has a syntax error, like a missing comma or an unclosed bracket,
it throws an error because the JSON format is not valid.
*/