import { describe, expect } from '../src/index.js'

describe('expect(toBeTested).toBeNull()', () => {
  expect(null).toBeNull()
  expect('').not.toBeNull()
  expect(1).not.toBeNull()
  expect('str').not.toBeNull()
  expect(undefined).not.toBeNull()
})
