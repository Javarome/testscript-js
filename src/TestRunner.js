import {promise as glob} from "glob-promise"
import path from "path"
import {DefaultLogger, Logger} from "./log/index.js"
import {AnsiColor} from "./AnsiColor.js"

export class TestRunnerResult {
  /**
   * @member {SuiteResult[]}
   */
  suites

  /**
   * @member {number}
   */
  duration
}

export class SuiteResult {
  /**
   * @member {string}
   */
  file

  /**
   * @member {Error | undefined}
   */
  error

  /**
   * @member {number}
   */
  duration
}

export class TestRunner {
  /**
   * @member {string}
   */
  #includePattern

  /**
   * @member {string}
   */
  #excludePattern

  /**
   * @member {Logger}
   */
  logger

  /**
   * @member {Intl.NumberFormat}
   */
  #numberFormat

  /**
   *
   * @param {string} includePattern
   * @param {string} excludePattern
   * @param {Logger} logger
   * @param {Intl.NumberFormat} numberFormat
   */
  constructor(
    includePattern = "**/*Test.js",
    excludePattern = "node_modules/**/*.*",
    logger = new DefaultLogger("testscript"),
    numberFormat = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2})
  ) {
    this.#includePattern = includePattern
    this.#excludePattern = excludePattern
    this.logger = logger
    this.#numberFormat = numberFormat
  }

  /**
   * @return {Promise<TestRunnerResult>}
   */
  async run() {
    const runStart = performance.now()
    const files = await glob(this.#includePattern, {ignore: this.#excludePattern})
    const suites = []
    let success = true
    for (const filePath of files) {
      let suiteResult = await this.runSuite(filePath)
      success = success && !suiteResult.error
      suites.push(suiteResult)
    }
    const runEnd = performance.now()
    const duration = runEnd - runStart
    return {suites, duration}
  }

  /**
   * @param {string} file
   * @return Promise<SuiteResult>
   */
  async runSuite(file) {
    const testStart = performance.now()
    let testEnd
    let error
    try {
      this.logger.debug("Executing", file)
      const test = path.join(process.cwd(), file)
      await import(test)
    } catch (e) {
      error = e
    } finally {
      testEnd = performance.now()
    }
    const duration = testEnd - testStart
    let status
    let details
    if (error) {
      status = AnsiColor.str("FAIL", AnsiColor.fgRed)
      let stack = error.stack
      if (stack) {
        let filePattern = file.replaceAll("/", "\/")
        const errorRegExp = new RegExp(`.*(Error: (.+)\\n)[\\s\\S]*?${filePattern}:\\d+:\\d+\\)\n([\\s\\S]*)`,
          "gm")
        let items = errorRegExp.exec(stack)
        if (items && items.length > 0) {
          details = AnsiColor.str(items[2] + "\n" + items[3], AnsiColor.fgRed)
        }
      }
    } else {
      status = AnsiColor.str("PASS", AnsiColor.fgGreen)
      details = AnsiColor.str(`(${this.durationStr(duration)})`, AnsiColor.fgWhite)
    }
    this.logger.log(status, file, details || "")
    return {file, duration, error}
  }

  /**
   * @param {number} value
   * @return {string}
   */
  durationStr(value) {
    return this.#numberFormat.format(value) + " ms"
  }

  /**
   *
   * @param {TestRunnerResult} result
   * @return {boolean}
   */
  allSucceeded(result) {
    const successCount = this.successCount(result)
    const total = result.suites.length
    return successCount === total
  }

  /**
   *
   * @param {TestRunnerResult} result
   * @return {number}
   */
  successCount(result) {
    return result.suites.reduce((count, suite) => {
      count += suite.error ? 0 : 1
      return count
    }, 0)
  }
}
