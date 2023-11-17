import { expect } from '../Expression.js';
import { describe } from '../TestSuite.js';

describe('expect(toBeTested).toBeNull()', () => {
  expect(null).toBeNull()
  expect('').not.toBeNull()
  expect(1).not.toBeNull()
  expect('str').not.toBeNull()
  expect(undefined).not.toBeNull()
})
