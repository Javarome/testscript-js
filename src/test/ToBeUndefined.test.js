import { describe } from '../TestSuite.js';
import { expect } from '../Expression.js';

describe('expect(toBeTested).toBeUndefined()', () => {
  expect(undefined).toBeUndefined()
  expect(1).not.toBeUndefined()
})
