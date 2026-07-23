const fs = require("fs");
const dayjs = require("dayjs");

const role = process.argv[2];

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

const users = data.users.filter(function (user) {
  return user.role === role;
});

console.log("Report generated on:", dayjs().format("DD MMM YYYY"));
console.log("Role:", role);
console.log("---");

for (let i = 0; i < users.length; i++) {
  console.log((i + 1) + ". " + users[i].name + " (ID: " + users[i].id + ")");
}

console.log("---");
console.log("Total:", users.length + " user(s) found");