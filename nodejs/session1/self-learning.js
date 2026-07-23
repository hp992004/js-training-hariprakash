const fs = require("fs").promises;

async function main() {
  try {
    await fs.writeFile("output.txt","Hello from Node.js file system!");

    const content = await fs.readFile("output.txt","utf8");

    console.log("File content:", content);

    await fs.appendFile("output.txt","\nThis line was appended.");

    const updated = await fs.readFile("output.txt","utf8");

    console.log("Updated content:", updated);

  } catch (err) {
    console.log(err);
  }
}

main();

/* The fs.promises API lets us work with files using async/await.
It makes file operations asynchronous and keeps the code clean and easy to read. */



const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", function (name) {
  console.log("Hello, " + name + "!");
  rl.close();
});

/* The readline module lets us take input from the user through the terminal.
It is useful for asking questions and reading the user's answers. */