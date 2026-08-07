/*
Pattern Recognition Audit

File reviewed: useInternForm.ts

1. Is there any object that is created more than once but should be shared?
   → Possible Singleton? No — The hook manages its own state, so each component should have its own instance.

2. Is there any conditional block (if/else or switch) that creates different objects
   based on a type or string value?
   → Possible Factory? No — The conditions only process form input and do not create different objects.

3. If a pattern applies: what would the refactored structure look like in one sentence?
   → No pattern applies.

4. If no pattern applies: what is missing that would make the pattern unnecessary
   complexity here?
   → There is no shared object or object creation logic, so Singleton and Factory would add unnecessary complexity.
*/

/*
The report generators are different objects, but they all share the same Logger instance.
Without a Singleton, a Logger object would need to be created and passed to each generator.
This means every generator would need to receive the same Logger through its constructor or method parameters.
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

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    )

    if (data.length === 0) return ""

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((row) => Object.values(row).join(","))

    return [headers, ...rows].join("\n")
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    )

    return JSON.stringify(data, null, 2)
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    )

    if (data.length === 0) return "<table></table>"

    const headers = Object.keys(data[0])
      .map((header) => `<th>${header}</th>`)
      .join("")

    const rows = data
      .map((row) => {
        const cells = Object.values(row)
          .map((value) => `<td>${value}</td>`)
          .join("")
        return `<tr>${cells}</tr>`
      })
      .join("")

    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
  }
}

function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator()
    case "json":
      return new JSONReportGenerator()
    case "html":
      return new HTMLReportGenerator()
    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      )
  }
}

const data = [
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
]

const csv = createReportGenerator("csv")
const json = createReportGenerator("json")
const html = createReportGenerator("html")

csv.generate(data)
json.generate(data)
html.generate(data)

console.log(Logger.getInstance().getLogs())

//Explore:

/*
1. In a multi-threaded environment, two threads could create separate instances if they call
getInstance() at the same time. Double-checked locking prevents this race condition.
This is generally not a problem in Node.js because JavaScript runs on a single-threaded
event loop, so only one piece of JavaScript executes at a time.
*/

/*
2. A Factory class can store configuration or dependencies as instance fields, while a
factory function is usually stateless. A factory class is useful when creation logic
needs configuration or can change at runtime. For simple object creation, a factory
function is shorter and easier to maintain.
*/

/*
3. A NoOpNotifier is useful when notifications are optional and the application should
continue without failing. Throwing is safer when an unknown notifier indicates a
configuration or programming error that should be detected immediately.
*/

/*
4. A module-based Singleton relies on Node.js module caching and is simple to implement.
A class-based Singleton can implement interfaces, hide state with private members,
and support inheritance or additional methods. It is useful when the Singleton
needs more structure or object-oriented behavior.
*/