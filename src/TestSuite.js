
/**
 * @type {() => void}
 */
let beforeEachValue;

/**
 * @param {string} name
 * @param {() => void} suiteExecutor
 */
export function describe(name, suiteExecutor) {
  suiteExecutor();
}

/**
 * @param {string} name
 * @param {() => void} testExecutor
 */
export function test(name, testExecutor) {
  beforeEachValue?.()
  testExecutor();
}

/**
 * @param {() => void} before
 */
export function beforeEach(before) {
  beforeEachValue = before
}
