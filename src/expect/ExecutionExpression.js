import { Expression } from './Expression.js'
import { TestError } from '../TestError.js'

export class ExecutionExpression extends Expression {
  /**
   * @member {any}
   */
  #function

  get not() {
    super.not
    return this
  }

  /**
   * @param {any} func
   */
  constructor (func) {
    super()
    this.#function = func
  }

  /**
   * @param {Error | string} expected error instance or error message
   */
  toThrow (expected) {
    try {
      this.#function()
      if (!this.isNegated) {
        throw new TestError('Expected to throw ' + expected)
      }
    } catch (thrown) {
      if (thrown instanceof TestError) {
        throw thrown
      } else {
        const expectedType = expected.constructor.name
        const isString = expectedType === 'String'
        const matchType = isString ? true : thrown.constructor.name === expectedType
        const checkType = matchType || (this.isNegated && !matchType)
        const matchMessage = thrown.message === (isString ? expected : expected.message)
        const checkMessage = matchMessage || (this.isNegated && !matchMessage)
        if (!checkType || !checkMessage) {
          throw new TestError('Expected not to throw ' + expected)
        }
      }
    }
  }
}

