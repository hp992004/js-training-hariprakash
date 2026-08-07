/*
Returning an empty string is a silent failure because the error is hidden.
Throwing an error is fail-fast and makes the problem obvious immediately.
Throwing is safer since missing configuration is detected early.
 */
class ConfigManager {
  private static instance: ConfigManager | null = null
  private config: Record<string, string> = {}

  private constructor() {
    this.config["env"] = "development"
    this.config["version"] = "1.0.0"
    this.config["appName"] = "MyApp"
  }

  static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  set(key: string, value: string): void {
    this.config[key] = value
  }

  get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Configuration key "${key}" not found`)
    }
    return this.config[key]
  }
}

const config = ConfigManager.getInstance()
config.set("apiUrl", "http://localhost:3001")

const sameConfig = ConfigManager.getInstance()

console.log(sameConfig.get("apiUrl"))
console.log(config === sameConfig)    

/*
The second test reused the same Logger instance, so logs from the first test remained.
This shows that Singletons share state and can break test isolation.
In a real test suite, add a clearLogs() or reset() method to reset the Logger before each test.
 */