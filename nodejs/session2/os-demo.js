const os = require('os')

console.log('Platform:     ', os.platform())
//It used to return operating system platform
console.log('Architecture: ', os.arch())
//It return the CPU architecture
console.log('Hostname:     ', os.hostname())
//Used to return the computer's hostname
console.log('Home dir:     ', os.homedir())
//Returns the current user's home directory
console.log('CPU cores:    ', os.cpus().length)
//Returns the number of CPU cores

const totalMB = Math.round(os.totalmem() / 1024 / 1024)
const freeMB  = Math.round(os.freemem()  / 1024 / 1024)
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)
//Displays the available and total system memory.

const platform = os.platform()

if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)
if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}
/*
Real-world example:
A Node.js app may check the platform to use different file paths or run OS-specific commands.
For example, it can use "dir" on Windows and "ls" on Linux or macOS.
*/