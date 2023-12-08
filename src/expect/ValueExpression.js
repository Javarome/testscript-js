import { TestError } from '../TestError.js'
import { AnsiColor } from '../AnsiColor.js'
import assert from 'node:assert'
import { Expression } from './Expression.js'

export class ValueExpression extends Expression {
  /**
   * @member {any}
   */
  #value

  /**
   * @param {any} value
   */
  constructor(value) {
    super()
    this.#value = value
  }

  /**
   *
   * @param {string} valueStr
   * @param {string} expectedStr
   * @return {string}
   */
  #ansiDiff(valueStr, expectedStr) {
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
   * @param {function} cb
   * @param {any} expected
   * @param {any} value
   */
  #check(cb, expected, value = this.#value) {
    let comparison
    try {
      cb(value, expected)
      comparison = true
    } catch (e) {
      if (e.name === 'AssertionError') {
        comparison = false
      } else {
        throw e
      }
    }
    const result = this.isNegated ? !comparison : comparison
    if (!result) {
      const valueStr = this.#valueStr(value)
      const expectedStr = this.#valueStr(expected)
      throw new TestError(
        `Got ${this.#ansiDiff(valueStr, expectedStr)} ${AnsiColor.str(`instead of ${(this.negated ? "not " : "") +
        expectedStr}`, AnsiColor.fgRed)}`)
    }
  }

  /**
   * @param {any} expected
   */
  toBe(expected) {
    this.#check(assert.strictEqual, expected)
  }

  toBeUndefined() {
    this.#check(assert.strictEqual, void 0)
  }

  toBeDefined() {
    this.#check(assert.notStrictEqual, void 0)
  }

  toBeNull() {
    this.#check(assert.strictEqual, null)
  }

  /**
   * @param {any} expected
   */
  toEqual(expected) {
    this.#check(assert.deepStrictEqual, expected)
  }

  /**
   * @param {any} value
   * @return {string|"undefined"}
   */
  #valueStr(value) {
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

