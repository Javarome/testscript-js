import { ExecutionExpression } from './ExecutionExpression.js'
import { ValueExpression } from './ValueExpression.js'

/**
 * @param {any} result
 * @return {ExecutionExpression|ValueExpression}
 */
export function expect (result) {
  return typeof result === 'function' ? new ExecutionExpression(result) : new ValueExpression(result)
}
