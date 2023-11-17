import { describe, expect } from '../src/index.js'

describe('expect(toBeTested).toBeUndefined()', () => {
  expect(undefined).toBeUndefined()
  expect(1).not.toBeUndefined()
})
