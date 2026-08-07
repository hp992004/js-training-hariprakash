/*
The factory hides the concrete report generator classes from the caller.
The caller only depends on the ReportGenerator interface and the factory function.
Without the factory, the caller would need to import and choose between all report classes.
With many formats, the code becomes harder to maintain and extend.
*/

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) return ""

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((row) => Object.values(row).join(","))

    return [headers, ...rows].join("\n")
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2)
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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

console.log(csv.generate(data))
console.log(json.generate(data))
console.log(html.generate(data))