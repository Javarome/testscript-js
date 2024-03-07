/**
 * @abstract
 */
export class Expression {
  /**
   * @member {boolean}
   */
  #negated = false

  /**
   * @protected
   */
  constructor() {
  }

  get not() {
    this.#negated = true
    return this
  }

  /**
   * @protected
   * @return {boolean}
   */
  get isNegated() {
    return this.#negated
  }
}

