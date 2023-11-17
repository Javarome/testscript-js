import { describe, expect } from '../src/index.js'

describe('expect(toBeTested).toEqual(expected)', () => {
  expect({}).toEqual({})
  expect({a: 'b'}).toEqual({a: 'b'})
  expect(['a', 1]).toEqual(['a', 1])
  expect(['a', 2]).not.toEqual(['a', 1])
})
