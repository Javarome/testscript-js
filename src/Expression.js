import {TestError} from "./TestError.js"
import {AnsiColor} from "./AnsiColor.js"

export class Expression {
  /**
   * @member {boolean}
   */
  #negated = false

  /**
   * @member {any}
   */
  #value

  /**
   * @param {any} value
   */
  constructor(value) {
    this.#value = value
  }

  get not() {
    this.#negated = true
    return this
  }

  /**
   *
   * @param {string} valueStr
   * @param {string} expectedStr
   * @return {string}
   */
  ansiDiff(valueStr, expectedStr) {
    let diffStr = ""
    let color = AnsiColor.bgGreen
    let colorStart = 0
    for (let i = 0; i < expectedStr.length; ++i) {
      const newColor = valueStr.charAt(i) === expectedStr.charAt(i) ? AnsiColor.bgGreen : AnsiColor.bgRed
      if (color !== newColor) {
        diffStr += AnsiColor.str(valueStr.substring(colorStart, i), AnsiColor.fgBlack, color)
        colorStart = i
        color = newColor
      }
    }
    diffStr += AnsiColor.str(valueStr.substring(colorStart, valueStr.length), AnsiColor.fgBlack, color)
    return diffStr
  }

  /**
   *
   * @param {boolean} comparison
   * @param {any} expected
   * @param {any} value
   */
  check(comparison, expected, value = this.#value) {
    const result = this.#negated ? !comparison : comparison
    if (!result) {
      const valueStr = this.valueStr(value)
      const expectedStr = this.valueStr(expected)
      throw new TestError(
        `Got ${this.ansiDiff(valueStr, expectedStr)} ${AnsiColor.str(`instead of ${(this.negated ? "not " : "") +
        expectedStr}`, AnsiColor.fgRed)}`)
    }
  }

  /**
   * @param {any} expected
   */
  toBe(expected) {
    this.check(this.#value === expected, expected)
  }

  toBeUndefined() {
    this.check(this.#value === void 0, "undefined")
  }

  toBeDefined() {
    this.check(this.#value !== void 0, "defined")
  }

  toBeNull() {
    return this.#value === null
  }

  /**
   * @param {any} expected
   */
  toEqual(expected) {
    let expectedExpr = JSON.stringify(expected)
    let valueExp = JSON.stringify(this.#value)
    this.check(valueExp === expectedExpr, expected, this.#value)
  }

  /**
   * @param {any} value
   * @return {string|"undefined"}
   */
  valueStr(value) {
    let type = typeof value
    switch (type) {
      case "undefined":
        return type
      case "object":
        return JSON.stringify(value)
      case "string":
        return `"${value}"`
      default:
        return value ? value.toString() : "null"
    }
  }
}

/**
 * @param {any} result
 * @return {Expression}
 */
export function expect(result) {
  return new Expression(result)
}
