/*
If the private constructor were removed, anyone could create new Logger()
instances directly, breaking the Singleton pattern. Different instances
would maintain separate log buffers, so a === b might be false and logs
would no longer be shared. This breakage would be detected by tests that
verify Logger.getInstance() always returns the same object and that all
log messages are stored in a single shared buffer.
 */
class Logger {
  private static instance: Logger | null = null
  private logs: string[] = []

  private constructor() {}

  static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger()
    }

    return Logger.instance
  }

  log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`
    this.logs.push(entry)
    console.log(entry)
  }

  getLogs(): string[] {
    return [...this.logs]
  }
}

const a = Logger.getInstance()
const b = Logger.getInstance()

a.log('system started')
b.log('request received')

console.log(a === b)
console.log(a.getLogs().length) 

function testLoggerStartsEmpty() {
  const logger = Logger.getInstance()
  logger.log('left over from a previous operation')
  const fresh = Logger.getInstance()
  console.log('Logs should be empty:', fresh.getLogs())  // will NOT be empty
}

function testLoggerCountsCorrectly() {
  const logger = Logger.getInstance()
  logger.log('entry one')
  console.log('Expected 1 log, got:', logger.getLogs().length)  // may be wrong
}

testLoggerStartsEmpty()
testLoggerCountsCorrectly()