const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

async function manageFile() {
  await fsp.writeFile(filePath, 'Line 1 — written by Node.js');
  console.log('File written');

  const content = await fsp.readFile(filePath, 'utf8');
  console.log('Content:', content);

  await fsp.appendFile(filePath, '\nLine 2 — appended');
  await fsp.appendFile(filePath, '\nLine 3 — appended again');

  const updated = await fsp.readFile(filePath, 'utf8');
  console.log('Updated:\n', updated);
}

manageFile();

/*
fs.promises provides promise-based file operations that work well with async/await.
It helps write asynchronous code that is easier to read and maintain.
Unlike synchronous methods, it does not block the program while waiting for file operations.
*/

const folderPath = __dirname;

const files = fs.readdirSync(folderPath);

files.forEach(file => {
  if (path.extname(file) === '.js') {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`${file} - ${sizeKB} KB`);
  }
});

/*
fs.readdirSync() reads all files and folders inside a directory.
It returns an array containing their names.
It is useful when you want to list or process files in a folder.
*/